"use client";

/**
 * SQL CONSOLE — the data-analyst answer to the OS's Ctrl+` terminal.
 * Visitors can literally query the portfolio: tables for skills,
 * experience, projects, education, languages and contact. Pure
 * client-side, no network, a tiny hand-rolled SELECT parser.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { usePrefs } from "@/components/providers/prefs";
import { SITE, SQL_TABLES } from "@/lib/content";
import { Icon } from "@/components/ui/icon";

type Line = { kind: "in" | "out" | "err" | "sys"; text: string };

const SUGGESTIONS = ["show tables;", "select * from skills;", "select * from experience;", "select * from contact;"];

const HELP = [
  "COMMANDS",
  "  show tables;                          list the tables",
  "  describe <table>;                     show columns",
  "  select * from <table>;                read a table",
  "  select a, b from <table> limit 2;     pick columns / rows",
  "  select * from skills where level = 'Advanced';",
  "  theme dark|light   ·   lang en|ar",
  "  clear   ·   exit",
];

function renderTable(columns: string[], rows: (string | number)[][]): string[] {
  const cells = rows.map((r) => r.map((c) => String(c)));
  const widths = columns.map((c, i) => Math.max(c.length, ...cells.map((r) => (r[i] ?? "").length)));
  const bar = "+" + widths.map((w) => "-".repeat(w + 2)).join("+") + "+";
  const fmt = (r: string[]) => "| " + r.map((c, i) => c.padEnd(widths[i] ?? 0)).join(" | ") + " |";
  return [bar, fmt(columns), bar, ...cells.map(fmt), bar, `${rows.length} row${rows.length === 1 ? "" : "s"} in set`];
}

export function SqlConsole() {
  const { setTheme, setLang } = usePrefs();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const banner = useCallback((): Line[] => [
    { kind: "sys", text: `ahmed_kamar SQL console — connected to ${SITE.short.toLowerCase().replace(" ", "_")}.portfolio` },
    { kind: "sys", text: "type 'help' for commands, or tap a suggestion below." },
  ], []);

  /* open / close */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "`" || e.code === "Backquote")) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-sql-console", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-sql-console", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setLines((cur) => (cur.length ? cur : banner()));
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = prev;
    };
  }, [open, banner]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const run = useCallback(
    (raw: string) => {
      const input = raw.trim();
      if (!input) return;
      history.current.push(input);
      cursor.current = history.current.length;
      const out: Line[] = [{ kind: "in", text: input }];
      const s = input.replace(/;$/, "").replace(/\s+/g, " ").trim();
      const low = s.toLowerCase();

      const err = (text: string) => out.push({ kind: "err", text });
      const text = (arr: string[]) => arr.forEach((t) => out.push({ kind: "out", text: t }));

      if (low === "help" || low === "?") text(HELP);
      else if (low === "clear") {
        setLines(banner());
        setValue("");
        return;
      } else if (low === "exit" || low === "quit" || low === "q") {
        setOpen(false);
        setValue("");
        return;
      } else if (low === "whoami") text(["ahmed_kamar | data_analyst | egypt | open_to_roles"]);
      else if (low === "show tables") text(["Tables_in_portfolio", ...Object.keys(SQL_TABLES).map((t) => "  " + t)]);
      else if (low.startsWith("describe ") || low.startsWith("desc ")) {
        const name = low.split(" ")[1] ?? "";
        const tbl = SQL_TABLES[name];
        if (!tbl) err(`ERROR: table '${name}' doesn't exist. Try: show tables;`);
        else text(renderTable(["column"], tbl.columns.map((c) => [c])));
      } else if (low.startsWith("theme ")) {
        const v = low.split(" ")[1];
        if (v === "dark" || v === "light") {
          setTheme(v);
          text([`theme set to ${v}`]);
        } else err("usage: theme dark|light");
      } else if (low.startsWith("lang ")) {
        const v = low.split(" ")[1];
        if (v === "en" || v === "ar") {
          setLang(v);
          text([`language set to ${v}`]);
        } else err("usage: lang en|ar");
      } else if (low.startsWith("select ")) {
        const m = s.match(/^select\s+(.+?)\s+from\s+(\w+)(?:\s+where\s+(\w+)\s*(=|like)\s*'?([^']*)'?)?(?:\s+limit\s+(\d+))?$/i);
        if (!m) err("ERROR: syntax. Example: select tool, level from skills where level = 'Advanced' limit 2;");
        else {
          const [, colPart = "*", table = "", whereCol, op, whereVal, limit] = m;
          const tbl = SQL_TABLES[table.toLowerCase()];
          if (!tbl) err(`ERROR: table '${table}' doesn't exist. Try: show tables;`);
          else {
            const wanted = colPart.trim() === "*" ? tbl.columns : colPart.split(",").map((c) => c.trim().toLowerCase());
            const bad = wanted.find((c) => !tbl.columns.includes(c));
            if (bad) err(`ERROR: unknown column '${bad}'. Try: describe ${table};`);
            else {
              let rows = tbl.rows;
              if (whereCol) {
                const wi = tbl.columns.indexOf(whereCol.toLowerCase());
                if (wi === -1) {
                  err(`ERROR: unknown column '${whereCol}' in where clause.`);
                  rows = [];
                } else {
                  const needle = (whereVal ?? "").toLowerCase().replace(/%/g, "");
                  rows = rows.filter((r) => {
                    const cell = String(r[wi]).toLowerCase();
                    return op?.toLowerCase() === "like" ? cell.includes(needle) : cell === needle;
                  });
                }
              }
              if (!out.some((o) => o.kind === "err")) {
                if (limit) rows = rows.slice(0, Number(limit));
                const idx = wanted.map((c) => tbl.columns.indexOf(c));
                text(renderTable(wanted, rows.map((r) => idx.map((i) => r[i] ?? ""))));
              }
            }
          }
        }
      } else err(`ERROR: unknown command '${s.split(" ")[0]}'. Type 'help'.`);

      setLines((cur) => [...cur, ...out]);
      setValue("");
    },
    [banner, setLang, setTheme],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") run(value);
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.current.length) return;
      cursor.current = Math.max(0, cursor.current - 1);
      setValue(history.current[cursor.current] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      cursor.current = Math.min(history.current.length, cursor.current + 1);
      setValue(history.current[cursor.current] ?? "");
    }
  };

  if (pathname.startsWith("/cv")) return null;

  return (
    <>
      {/* Discoverability + mobile: a quiet launcher, bottom corner. */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open SQL console"
          className="no-print fixed bottom-4 end-4 z-40 inline-flex items-center gap-2 rounded-card border border-border-default bg-surface-1/90 px-3 py-2 font-mono text-caption uppercase tracking-[0.1em] text-text-secondary shadow-card backdrop-blur transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent-text"
          dir="ltr"
        >
          <Icon name="terminal" size={14} />
          SQL
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="SQL console"
          dir="ltr"
          className="fixed inset-0 z-[80] flex items-end justify-center bg-navy/70 p-3 backdrop-blur-sm sm:items-center"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="flex h-[min(34rem,86svh)] w-full max-w-3xl flex-col overflow-hidden rounded-panel border border-[rgb(160_190_255/0.28)] bg-navy font-mono text-[#ECF2FC] shadow-panel">
            <div className="flex items-center gap-3 border-b border-[rgb(160_190_255/0.16)] px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden>
                <i className="size-2.5 rounded-full bg-rose/80" />
                <i className="size-2.5 rounded-full bg-accent/80" />
                <i className="size-2.5 rounded-full bg-mint/80" />
              </span>
              <span className="text-micro text-[rgb(236_242_252/0.52)]">ahmed_kamar — sql console</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close console"
                className="ms-auto grid size-7 place-items-center rounded-card text-[rgb(236_242_252/0.52)] transition-colors hover:text-[#ECF2FC]"
              >
                <Icon name="x" size={16} />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="console-scroll flex-1 overflow-auto px-4 py-3 text-[0.8rem] leading-[1.55]"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((ln, i) => (
                <pre
                  key={i}
                  className={
                    "m-0 whitespace-pre font-[inherit] " +
                    (ln.kind === "in"
                      ? "text-[#F5B544]"
                      : ln.kind === "err"
                        ? "text-[#FF8CA1]"
                        : ln.kind === "sys"
                          ? "text-[rgb(236_242_252/0.52)]"
                          : "text-[rgb(236_242_252/0.86)]")
                  }
                >
                  {ln.kind === "in" ? "sql> " + ln.text : ln.text}
                </pre>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 border-t border-[rgb(160_190_255/0.16)] px-4 py-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => run(s)}
                  className="rounded-card border border-[rgb(160_190_255/0.16)] px-2 py-1 text-caption text-[rgb(236_242_252/0.72)] transition-colors hover:border-[#F5B544] hover:text-[#F5B544]"
                >
                  {s}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 border-t border-[rgb(160_190_255/0.16)] px-4 py-3 text-[0.85rem]">
              <span className="text-[#F5B544]">sql&gt;</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                aria-label="SQL input"
                placeholder="show tables;"
                className="min-w-0 flex-1 bg-transparent text-[#ECF2FC] caret-[#F5B544] outline-none placeholder:text-[rgb(236_242_252/0.28)]"
              />
            </label>
          </div>
        </div>
      )}
    </>
  );
}
