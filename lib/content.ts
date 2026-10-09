/**
 * CONTENT — the single source of truth for every word on the site.
 * ─────────────────────────────────────────────────────────────────
 * Pages never hard-code copy; they read from here (same rule as the
 * OS's lib/content.ts). Every user-facing string is { en, ar }.
 *
 * NDA NOTE: client work (HungerStation, Spinneys) is described at a
 * summary level on purpose. Do not add client-specific figures,
 * account names, or platform names that are not already here.
 */

export type L = { en: string; ar: string };
export type Lang = keyof L;

export const l = (en: string, ar: string): L => ({ en, ar });

/* ═════════ IDENTITY ═════════ */
export const SITE = {
  name: "Ahmed Mohamed Ramadan Kamar",
  short: "Ahmed Kamar",
  initials: "AK",
  role: l("Data Analyst", "محلل بيانات"),
  location: l("Egypt", "مصر"),
  email: "ahmedkamer073@gmail.com",
  linkedin: "https://www.linkedin.com/in/ahmed00kamar",
  linkedinLabel: "linkedin.com/in/ahmed00kamar",
  github: "https://github.com/ahmedkamer073",
  githubLabel: "github.com/ahmedkamer073",
  /** NEXT_PUBLIC_SITE_URL wins; on Vercel the production domain is used automatically. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:4300"),
  /** Printable CV page. Swap for a real PDF path (e.g. "/Ahmed-Kamar-CV.pdf") once uploaded to /public. */
  cv: "/cv",
} as const;

/* ═════════ NAVIGATION ═════════ */
export const NAV_LINKS: readonly { id: string; label: L }[] = [
  { id: "work", label: l("WORK", "الأعمال") },
  { id: "why", label: l("WHY", "لماذا") },
  { id: "method", label: l("METHOD", "المنهج") },
  { id: "background", label: l("BACKGROUND", "الخلفية") },
  { id: "faq", label: l("FAQ", "أسئلة") },
];

/* ═════════ HERO ═════════ */
export const HERO = {
  status: l("OPEN TO ROLES · EGYPT / GULF / REMOTE", "متاح لفرص عمل · مصر / الخليج / عن بُعد"),
  lines: {
    en: ["Data your team", "can act on."],
    ar: ["بيانات تتحول", "إلى قرارات واضحة."],
  },
  /** Index of the line that gets the marker highlight. */
  markLine: 1,
  lead: l(
    "I turn restaurant, retail, and delivery-platform data into clear answers teams can act on.",
    "أحوّل بيانات المطاعم والتجزئة ومنصات التوصيل إلى إجابات واضحة تقدر الفِرق تتحرك بناءً عليها.",
  ),
  ctaCv: l("Download CV", "تحميل السيرة الذاتية"),
  ctaContact: l("Contact", "تواصل"),
  ctaGithub: l("GitHub", "جيت هب"),
  hiring: l("For hiring teams", "للشركات والتوظيف"),
  query: "SELECT answers FROM data WHERE teams_can_act = TRUE;",
};

export const METRICS_HEADING = l("ROLE SCOPE & CORE SKILL", "نطاق العمل والمهارة الأساسية");
export const METRICS_NOTE = l("Summary-level figures — client details stay under NDA", "أرقام على مستوى الملخص — تفاصيل العملاء تحت اتفاقية السرية");

export const METRICS: readonly {
  value: string;
  suffix?: string;
  label: L;
  context: L;
  detail: L;
}[] = [
  {
    // TODO(verify with Ahmed): 350+ is the combined count of menu + catalog entries.
    value: "350",
    suffix: "+",
    label: l("Menu & catalog items", "منتجات المنيو والكتالوج"),
    context: l("HUNGERSTATION · 2025 — NOW", "هنجرستيشن · 2025 — الآن"),
    detail: l(
      "Managed across restaurant and retail accounts on a delivery platform.",
      "تمت إدارتها عبر حسابات مطاعم وتجزئة على منصة توصيل.",
    ),
  },
  {
    value: "3",
    label: l("Organizations", "جهات عمل"),
    context: l("2025 — NOW", "2025 — الآن"),
    detail: l(
      "HungerStation, Spinneys, and Outlier AI — delivery, retail, and AI training.",
      "هنجرستيشن وسبينيس وOutlier AI — توصيل وتجزئة وتدريب نماذج ذكاء اصطناعي.",
    ),
  },
  {
    value: "ADVANCED",
    label: l("SQL & database modeling", "SQL ونمذجة قواعد البيانات"),
    context: l("CORE SKILL", "المهارة الأساسية"),
    detail: l(
      "Backed by database design on a graduation project, not just queries.",
      "مدعومة بتصميم قاعدة بيانات في مشروع التخرج، مش مجرد استعلامات.",
    ),
  },
];

/* ═════════ 01 · SELECTED WORK ═════════ */
export const WORK_HEADING = {
  kicker: l("Selected work", "أعمال مختارة"),
  title: {
    en: ["Real platforms, real data: ", "work that ships."],
    ar: ["منصات حقيقية وبيانات حقيقية: ", "شغل بيتنفّذ."],
  },
  sub: l(
    "Context, what I did, and the tools behind it — across delivery, retail, and a full-stack graduation project.",
    "السياق، وما نفّذته، والأدوات وراءه — عبر التوصيل والتجزئة ومشروع تخرج متكامل.",
  ),
  index: l("Full experience ledger", "سجل الخبرة كاملًا"),
};

export type Case = {
  id: string;
  n: string;
  name: L;
  category: L;
  period: L;
  accent: "sky" | "mint" | "violet";
  challenge: L;
  did: { en: string[]; ar: string[] };
  tags: string[];
  note?: L;
  link?: { href: string; label: L };
};

export const CASES: readonly Case[] = [
  {
    id: "hungerstation",
    n: "01",
    name: l("HungerStation", "هنجرستيشن"),
    category: l("Menu, catalog & commission analysis", "المنيو والكتالوج وتحليل العمولات"),
    period: l("Nov 2025 — Present", "نوفمبر 2025 — الآن"),
    accent: "sky",
    challenge: l(
      "Delivery-platform partners depend on clean menus and catalogs, prices that hold up against platform commission, and campaigns that can be tracked.",
      "شركاء منصات التوصيل بيعتمدوا على منيوهات وكتالوجات نظيفة، وأسعار تتحمّل عمولة المنصة، وحملات يمكن تتبعها.",
    ),
    did: {
      en: [
        "Managed 350+ menu and catalog items for restaurant and retail accounts",
        "Analyzed pricing against platform commission",
        "Compared commission structures across client accounts",
        "Supported the National Day campaign",
      ],
      ar: [
        "إدارة أكثر من 350 منتجًا في المنيو والكتالوج لحسابات مطاعم وتجزئة",
        "تحليل التسعير مقابل عمولة المنصة",
        "مقارنة هياكل العمولات بين حسابات العملاء",
        "دعم حملة اليوم الوطني",
      ],
    },
    tags: ["Menu & catalog", "Pricing vs commission", "Campaigns"],
    note: l("Summary level — client details are under NDA.", "على مستوى الملخص — تفاصيل العملاء تحت اتفاقية السرية."),
  },
  {
    id: "spinneys",
    n: "02",
    name: l("Spinneys", "سبينيس"),
    category: l("Sales reporting & customer feedback", "تقارير المبيعات وآراء العملاء"),
    period: l("Jun — Sep 2025", "يونيو — سبتمبر 2025"),
    accent: "mint",
    challenge: l(
      "A retail team needs daily sales in a shape it can read quickly, and customer feedback that goes beyond anecdotes.",
      "فريق تجزئة محتاج مبيعات يومية بشكل يتقري بسرعة، وآراء عملاء تتخطى الانطباعات الشخصية.",
    ),
    did: {
      en: [
        "Organized daily sales and best-selling products",
        "Collected customer ratings through forms: fresh-food quality, delivery speed, and delivery quality",
      ],
      ar: [
        "تنظيم المبيعات اليومية والمنتجات الأكثر مبيعًا",
        "جمع تقييمات العملاء عبر نماذج: جودة الطازج، وسرعة التوصيل، وجودة التوصيل",
      ],
    },
    tags: ["Daily sales", "Best sellers", "Customer ratings"],
    note: l("Summary level — client details are under NDA.", "على مستوى الملخص — تفاصيل العملاء تحت اتفاقية السرية."),
  },
  {
    id: "sign-language",
    n: "03",
    name: l("Sign Language Interpreter", "مترجم لغة الإشارة"),
    category: l("Graduation project · database & backend", "مشروع التخرج · قاعدة بيانات وباك إند"),
    period: l("Benha University · 2025", "جامعة بنها · 2025"),
    accent: "violet",
    challenge: l(
      "An app and website that teach communication with deaf and mute communities, built as a team.",
      "تطبيق وموقع بيعلّموا التواصل مع الصم والبكم، اتبنى بشكل جماعي.",
    ),
    did: {
      en: [
        "Designed the database models",
        "Connected the database to the server",
        "Built on Node.js with controllers, models, routes, and middlewares",
      ],
      ar: [
        "تصميم نماذج قاعدة البيانات",
        "ربط قاعدة البيانات بالسيرفر",
        "بُني على Node.js بتقسيم controllers وmodels وroutes وmiddlewares",
      ],
    },
    tags: ["Database modeling", "Node.js", "Team project"],
    note: l(
      "Team project — the repository lives on a teammate's GitHub account.",
      "مشروع جماعي — الريبو على حساب GitHub لأحد أعضاء الفريق.",
    ),
    link: {
      href: "https://github.com/Elshami203/Sign-Language-Interpreter",
      label: l("View repository", "عرض الريبو"),
    },
  },
];

/** The reserved slot for the first dashboard case study. */
export const CASE_SLOT = {
  n: "04",
  tag: l("NEXT CASE STUDY", "دراسة الحالة القادمة"),
  title: l("Power BI dashboard + SQL analysis", "لوحة Power BI وتحليل SQL"),
  body: l(
    "A full case study: problem → tools → insights → impact. Reserved for the next addition.",
    "دراسة حالة كاملة: المشكلة ← الأدوات ← الاستنتاجات ← الأثر. محجوزة للإضافة القادمة.",
  ),
  steps: [l("Problem", "المشكلة"), l("Tools", "الأدوات"), l("Insights", "الاستنتاجات"), l("Impact", "الأثر")],
};

/* ═════════ EXPERIENCE LEDGER ═════════ */
export const LEDGER_HEADERS = {
  n: "№",
  role: l("ROLE", "الدور"),
  org: l("ORGANIZATION", "الجهة"),
  focus: l("FOCUS", "التركيز"),
  period: l("PERIOD", "الفترة"),
};

export const LEDGER: readonly {
  n: string;
  role: L;
  org: string;
  focus: L;
  period: L;
  caseId?: string;
}[] = [
  {
    n: "01",
    role: l("Data Analyst", "محلل بيانات"),
    org: "HungerStation",
    focus: l("Menus, catalogs, pricing & commission", "المنيو والكتالوج والتسعير والعمولات"),
    period: l("Nov 2025 — Present", "نوفمبر 2025 — الآن"),
    caseId: "hungerstation",
  },
  {
    n: "02",
    role: l("Data Analyst", "محلل بيانات"),
    org: "Spinneys",
    focus: l("Daily sales & customer ratings", "المبيعات اليومية وتقييمات العملاء"),
    period: l("Jun 2025 — Sep 2025", "يونيو 2025 — سبتمبر 2025"),
    caseId: "spinneys",
  },
  {
    n: "03",
    role: l("AI Trainer · Python Problem Solving", "مدرّب ذكاء اصطناعي · حل مشكلات بـ Python"),
    org: "Outlier AI",
    focus: l("Python problem solving for AI training", "حل مشكلات Python لتدريب النماذج"),
    period: l("Jan 2025 — May 2025", "يناير 2025 — مايو 2025"),
  },
];

/* ═════════ 02 · WHY / VALUE ═════════ */
export const WHY = {
  kicker: l("WHY THIS APPROACH", "لماذا هذا الأسلوب"),
  title: {
    en: ["Not just a report. ", "A number you can trust."],
    ar: ["مش مجرد تقرير. ", "رقم تقدر تثق فيه."],
  },
  sub: l(
    "Three principles that explain the work before we get into the process.",
    "ثلاثة مبادئ تشرح طريقة الشغل قبل ما ندخل في التفاصيل.",
  ),
  link: l("See the method", "شوف المنهج"),
  items: [
    {
      n: "01",
      title: l("Clean data before clever charts", "بيانات نظيفة قبل رسوم ذكية"),
      body: l(
        "Menus, catalogs, and sales logs are only useful when they are consistent. I fix the structure first so every number after it can be trusted.",
        "المنيوهات والكتالوجات وسجلات المبيعات مفيدة بس لما تكون متسقة. بصلّح البنية الأول عشان كل رقم بعدها يتوثق فيه.",
      ),
    },
    {
      n: "02",
      title: l("Every analysis ends in a decision", "كل تحليل ينتهي بقرار"),
      body: l(
        "Pricing against commission, commission across accounts, ratings against delivery speed — each one ends with something a team can change.",
        "التسعير مقابل العمولة، والعمولة بين الحسابات، والتقييمات مقابل سرعة التوصيل — كل واحد ينتهي بشيء الفريق يقدر يغيّره.",
      ),
    },
    {
      n: "03",
      title: l("Operations context, not just queries", "فهم تشغيلي، مش استعلامات بس"),
      body: l(
        "Working inside delivery-platform operations means I know why a catalog field or a commission tier matters before I write the query.",
        "الشغل جوه عمليات منصات التوصيل معناه إني فاهم ليه حقل في الكتالوج أو شريحة عمولة بتفرق قبل ما أكتب الاستعلام.",
      ),
    },
  ],
};

/* ═════════ 03 · METHOD ═════════ */
export const METHOD = {
  kicker: l("HOW I WORK", "طريقة الشغل"),
  title: {
    en: ["From a question ", "to something usable."],
    ar: ["من سؤال ", "لشيء قابل للاستخدام."],
  },
  sub: l(
    "Four visible stages. Each has an output, so you always know where the analysis stands.",
    "أربع مراحل واضحة. لكل مرحلة مخرج، فتعرف دايمًا وصل لفين التحليل.",
  ),
  link: l("Get in touch", "تواصل معي"),
  gate: l("Gate", "بوابة"),
  steps: [
    {
      n: "01",
      color: "sky",
      name: l("Ask", "اسأل"),
      short: l(
        "Pin down the question, who owns the decision, and what would change if the answer moves.",
        "تحديد السؤال، ومين صاحب القرار، وإيه اللي هيتغيّر لو الإجابة اتحركت.",
      ),
      proof: l("Question + metric definition", "السؤال + تعريف المقياس"),
    },
    {
      n: "02",
      color: "mint",
      name: l("Clean", "نظّف"),
      short: l(
        "Standardize menus, catalogs, and sales tables. Check for duplicates, gaps, and unit mismatches.",
        "توحيد المنيوهات والكتالوجات وجداول المبيعات، وفحص التكرار والفجوات واختلاف الوحدات.",
      ),
      proof: l("SQL + Google Sheets", "SQL + Google Sheets"),
    },
    {
      n: "03",
      color: "violet",
      name: l("Analyze", "حلّل"),
      short: l(
        "Compare prices, commissions, sales, and ratings across accounts, products, and periods.",
        "مقارنة الأسعار والعمولات والمبيعات والتقييمات عبر الحسابات والمنتجات والفترات.",
      ),
      proof: l("SQL + Python + Power BI", "SQL + Python + Power BI"),
    },
    {
      n: "04",
      color: "rose",
      name: l("Share", "شارك"),
      short: l(
        "Deliver a sheet, a dashboard, or a short note a team can use the same day — with the logic documented.",
        "تسليم شيت أو لوحة أو ملاحظة قصيرة الفريق يستخدمها في نفس اليوم — مع توثيق المنطق.",
      ),
      proof: l("Sheets + Power BI", "Sheets + Power BI"),
    },
  ],
} as const;

/* ═════════ 04 · BACKGROUND ═════════ */
export const ABOUT = {
  kicker: l("ABOUT", "نبذة"),
  title: {
    en: ["Built across ", "restaurants, retail,", " and delivery platforms."],
    ar: ["خبرة بُنيت عبر ", "المطاعم والتجزئة", " ومنصات التوصيل."],
  },
  paragraphs: [
    l(
      "Data Analyst with hands-on experience in restaurant, retail, and delivery-platform data at HungerStation and Spinneys, plus AI training work in Python. Advanced in SQL and Google Sheets, with working knowledge of Power BI, Python, and Excel.",
      "محلل بيانات بخبرة عملية في بيانات المطاعم والتجزئة ومنصات التوصيل في هنجرستيشن وسبينيس، إضافةً إلى تدريب نماذج الذكاء الاصطناعي بلغة Python. متقدم في SQL وGoogle Sheets، ومعرفة عملية بـ Power BI وPython وExcel.",
    ),
    l(
      "Computers and Information graduate (Benha University, 2025) with database design experience. Open to roles in Egypt, the Gulf, or remote.",
      "خريج حاسبات ومعلومات (جامعة بنها، 2025) بخبرة في تصميم قواعد البيانات. متاح لفرص في مصر أو الخليج أو عن بُعد.",
    ),
  ],
  link: l("Download the CV", "حمّل السيرة الذاتية"),
  facts: [
    { k: l("SPECIALTY", "التخصص"), v: l("Restaurant, retail & delivery-platform data", "بيانات المطاعم والتجزئة ومنصات التوصيل") },
    { k: l("CURRENT ROLE", "العمل الحالي"), v: l("Data Analyst, HungerStation", "محلل بيانات، هنجرستيشن") },
    { k: l("AVAILABILITY", "الوضع الحالي"), v: l("Open to roles in Egypt, the Gulf, or remote", "متاح لفرص في مصر أو الخليج أو عن بُعد") },
    { k: l("LANGUAGES", "اللغات"), v: l("Arabic (Native) · English (B1)", "العربية (الأم) · الإنجليزية (B1)") },
    { k: l("EDUCATION", "التعليم"), v: l("B.Sc. Computers & Information, Benha University, 2025", "بكالوريوس حاسبات ومعلومات، جامعة بنها، 2025") },
    { k: l("TRAINING", "تدريب"), v: l("Backend Development Course, Route Academy", "كورس Backend Development، Route Academy") },
    { k: l("BASED", "المقر"), v: l("Egypt", "مصر") },
  ],
};

export const MARQUEE = [
  "SQL",
  "Database Modeling",
  "Google Sheets",
  "Excel",
  "Power BI",
  "Python",
  "Menu & Catalog Management",
  "Pricing & Commission Analysis",
  "Delivery-Platform Operations",
];
export const MARQUEE_AR = [
  "SQL",
  "نمذجة قواعد البيانات",
  "Google Sheets",
  "Excel",
  "Power BI",
  "Python",
  "إدارة المنيو والكتالوج",
  "تحليل التسعير والعمولات",
  "عمليات منصات التوصيل",
];

export const SKILLS_HEADING = {
  kicker: l("SKILLS", "المهارات"),
  title: { en: ["The toolkit, ", "with honest levels."], ar: ["الأدوات، ", "بمستويات صادقة."] },
  levels: { 3: l("Intermediate", "متوسط"), 4: l("Advanced", "متقدم") } as Record<number, L>,
};

export const SKILLS: readonly {
  area: L;
  tool: string;
  glyph: string;
  level: 3 | 4;
  color: "sky" | "mint" | "violet" | "rose";
  note?: L;
}[] = [
  { area: l("Databases", "قواعد البيانات"), tool: "SQL · Database modeling", glyph: "SQL", level: 4, color: "sky" },
  { area: l("Spreadsheets", "الجداول"), tool: "Google Sheets", glyph: "GS", level: 4, color: "mint" },
  { area: l("Spreadsheets", "الجداول"), tool: "Excel", glyph: "XL", level: 3, color: "mint" },
  { area: l("BI", "ذكاء الأعمال"), tool: "Power BI", glyph: "BI", level: 3, color: "violet" },
  { area: l("Programming", "البرمجة"), tool: "Python", glyph: "PY", level: 3, color: "rose" },
];

export const DOMAIN = {
  k: l("Domain knowledge", "المعرفة القطاعية"),
  chips: [
    l("Menu & catalog management", "إدارة المنيو والكتالوج"),
    l("Pricing & commission analysis", "تحليل التسعير والعمولات"),
    l("Delivery-platform operations", "عمليات منصات التوصيل"),
  ],
};

export const CAPABILITIES = {
  k: l("WHAT I CAN TAKE ON", "ما أقدر أتولاه"),
  items: [
    { t: l("Data cleaning & structure", "تنظيف البيانات وهيكلتها"), d: l("Consistent menus, catalogs, and sales tables.", "منيوهات وكتالوجات وجداول مبيعات متسقة.") },
    { t: l("SQL analysis", "تحليل SQL"), d: l("Questions answered straight from the database.", "إجابات الأسئلة مباشرة من قاعدة البيانات.") },
    { t: l("Sheets reporting", "تقارير Sheets"), d: l("Readable, reusable reports a team can own.", "تقارير مقروءة وقابلة لإعادة الاستخدام يملكها الفريق.") },
    { t: l("Dashboards", "لوحات المتابعة"), d: l("Power BI views built on clean, modeled data.", "لوحات Power BI مبنية على بيانات نظيفة ومنمذجة.") },
  ],
};

/* ═════════ 05 · FAQ ═════════ */
export const FAQ = {
  kicker: l("FAQ", "أسئلة"),
  title: { en: ["Before we ", "start."], ar: ["قبل ما ", "نبدأ."] },
  items: [
    {
      q: l("What kind of data do you work with?", "إيه نوع البيانات اللي بتشتغل عليها؟"),
      a: l(
        "Restaurant, retail, and delivery-platform data: menus, catalogs, pricing and commissions, daily sales, and customer ratings.",
        "بيانات المطاعم والتجزئة ومنصات التوصيل: المنيوهات، الكتالوجات، التسعير والعمولات، المبيعات اليومية، وتقييمات العملاء.",
      ),
    },
    {
      q: l("Which tools are your strongest?", "إيه أقوى أدواتك؟"),
      a: l(
        "SQL and Google Sheets are my strongest. I also work with Power BI, Python, and Excel at a working level.",
        "SQL وGoogle Sheets هما الأقوى عندي. وبشتغل كمان بـ Power BI وPython وExcel على مستوى عملي.",
      ),
    },
    {
      q: l("Where are you open to working?", "فين مستعد تشتغل؟"),
      a: l(
        "Egypt, the Gulf, or fully remote.",
        "مصر أو الخليج أو عن بُعد بالكامل.",
      ),
    },
    {
      q: l("Can I see detailed case studies?", "ممكن أشوف دراسات حالة تفصيلية؟"),
      a: l(
        "Client work from HungerStation and Spinneys is shared at a summary level because of confidentiality. Public dashboard case studies are the next addition, and the Sign Language Interpreter repository is open on GitHub.",
        "شغل العملاء في هنجرستيشن وسبينيس بيتعرض بشكل ملخص بسبب السرية. دراسات حالة اللوحات العامة هي الإضافة القادمة، وريبو مترجم لغة الإشارة مفتوح على GitHub.",
      ),
    },
    {
      q: l("How do we start?", "نبدأ إزاي؟"),
      a: l(
        "Email me the role or the question. I will reply with how I would approach it and what I would need.",
        "ابعتلي إيميل بالدور أو السؤال. هرد عليك بطريقة تناولي له وإيه اللي محتاجه.",
      ),
    },
  ],
};

/* ═════════ 06 · CONTACT ═════════ */
export const CONTACT = {
  kicker: l("LET'S WORK TOGETHER", "يلّا نشتغل سوا"),
  title: { en: ["Have data that needs ", "an answer?"], ar: ["عندك بيانات محتاجة ", "إجابة؟"] },
  body: l(
    "Open to roles in Egypt, the Gulf, or remote. Email is the fastest way to reach me.",
    "متاح لفرص في مصر أو الخليج أو عن بُعد. الإيميل أسرع وسيلة للتواصل معي.",
  ),
  primary: l("Email Ahmed", "ابعت إيميل"),
  secondary: l("LinkedIn", "لينكدإن"),
  tertiary: l("GitHub", "جيت هب"),
  copy: l("Copy email", "انسخ الإيميل"),
  copied: l("Copied", "تم النسخ"),
  availability: l("AVAILABILITY", "الإتاحة"),
  where: l("Egypt · Gulf · Remote", "مصر · الخليج · عن بُعد"),
};

/* ═════════ FOOTER ═════════ */
export const FOOTER = {
  blurb: l(
    "Data Analyst turning restaurant, retail, and delivery-platform data into answers teams can act on.",
    "محلل بيانات يحوّل بيانات المطاعم والتجزئة ومنصات التوصيل إلى إجابات تقدر الفِرق تتحرك بناءً عليها.",
  ),
  rights: l("ALL RIGHTS RESERVED", "جميع الحقوق محفوظة"),
  surprise: l("PRESS CTRL + ` TO QUERY ME", "دوس Ctrl + ` عشان تسألني بـ SQL"),
  built: l("BUILT WITH NEXT.JS", "مبني بـ NEXT.JS"),
  cols: [
    {
      head: l("EXPLORE", "استكشف"),
      links: [
        { label: l("Selected work", "أعمال مختارة"), href: "#work" },
        { label: l("Why this approach", "لماذا هذا الأسلوب"), href: "#why" },
        { label: l("Method", "المنهج"), href: "#method" },
        { label: l("Background & skills", "الخلفية والمهارات"), href: "#background" },
        { label: l("FAQ", "أسئلة"), href: "#faq" },
      ],
    },
    {
      head: l("REACH", "تواصل"),
      links: [
        { label: l("Email ↗", "إيميل ↗"), href: `mailto:${SITE.email}` },
        { label: l("LinkedIn ↗", "لينكدإن ↗"), href: SITE.linkedin },
        { label: l("GitHub ↗", "جيت هب ↗"), href: SITE.github },
      ],
    },
    {
      head: l("PORTFOLIO", "البورتفوليو"),
      links: [
        { label: l("Download CV ↓", "تحميل السيرة الذاتية ↓"), href: SITE.cv },
        { label: l("Sign Language repo ↗", "ريبو مترجم الإشارة ↗"), href: CASES[2]!.link!.href },
      ],
    },
  ],
};

/* ═════════ INSIGHT BOARD (hero visual) — SAMPLE DATA ONLY ═════════ */
export const BOARD = {
  file: "insight_board.sample",
  disclaimer: l("SAMPLE DATA — ILLUSTRATIVE ONLY", "بيانات تجريبية — للتوضيح فقط"),
  tabs: [
    { id: "sales", label: l("Sales", "المبيعات") },
    { id: "commission", label: l("Price vs commission", "السعر والعمولة") },
    { id: "ratings", label: l("Ratings", "التقييمات") },
  ] as const,
  sales: {
    unit: l("orders", "طلب"),
    days: [l("Mon", "اثنين"), l("Tue", "ثلاثاء"), l("Wed", "أربعاء"), l("Thu", "خميس"), l("Fri", "جمعة"), l("Sat", "سبت"), l("Sun", "أحد")],
    values: [42, 55, 48, 63, 92, 78, 61],
  },
  commission: {
    months: ["J", "F", "M", "A", "M", "J", "J", "A"],
    price: [62, 66, 64, 71, 74, 73, 79, 83],
    net: [49, 51, 47, 53, 54, 52, 57, 60],
    priceLabel: l("Menu price index", "مؤشر سعر المنيو"),
    netLabel: l("Net after commission", "الصافي بعد العمولة"),
  },
  ratings: {
    items: [
      { label: l("Fresh quality", "جودة الطازج"), value: 4.4 },
      { label: l("Delivery speed", "سرعة التوصيل"), value: 3.9 },
      { label: l("Delivery quality", "جودة التوصيل"), value: 4.2 },
    ],
    scale: 5,
  },
};

/* ═════════ CV (printable) ═════════ */
export const CV = {
  summary: ABOUT.paragraphs.map((p) => p.en).join(" "),
  experience: [
    {
      role: "Data Analyst",
      org: "HungerStation",
      period: "Nov 2025 — Present",
      bullets: CASES[0]!.did.en,
    },
    {
      role: "Data Analyst",
      org: "Spinneys",
      period: "Jun 2025 — Sep 2025",
      bullets: CASES[1]!.did.en,
    },
    {
      role: "AI Trainer (Python Problem Solving)",
      org: "Outlier AI",
      period: "Jan 2025 — May 2025",
      bullets: ["Python problem solving for AI model training."],
    },
  ],
  project: {
    name: "Sign Language Interpreter — Graduation Project",
    bullets: [
      "App and website that teach communication with deaf and mute communities (team project).",
      "Designed the database models and connected the database to the server.",
      "Built on Node.js with controllers, models, routes, and middlewares.",
    ],
    link: CASES[2]!.link!.href,
  },
  education: [
    "B.Sc. Computers and Information, Benha University, 2025",
    "Backend Development Course, Route Academy",
  ],
  languages: ["Arabic (Native)", "English (B1)"],
};

/* ═════════ SQL CONSOLE DATASET ═════════ */
export const SQL_TABLES: Record<string, { columns: string[]; rows: (string | number)[][] }> = {
  skills: {
    columns: ["area", "tool", "level"],
    rows: SKILLS.map((s) => [s.area.en, s.tool, s.level === 4 ? "Advanced" : "Intermediate"]),
  },
  experience: {
    columns: ["role", "org", "from", "to"],
    rows: [
      ["Data Analyst", "HungerStation", "2025-11", "present"],
      ["Data Analyst", "Spinneys", "2025-06", "2025-09"],
      ["AI Trainer (Python)", "Outlier AI", "2025-01", "2025-05"],
    ],
  },
  projects: {
    columns: ["name", "role", "stack"],
    rows: [["Sign Language Interpreter", "Database models + server link", "Node.js"]],
  },
  education: {
    columns: ["credential", "institution", "year"],
    rows: [
      ["B.Sc. Computers and Information", "Benha University", 2025],
      ["Backend Development Course", "Route Academy", "—"],
    ],
  },
  languages: {
    columns: ["language", "level"],
    rows: [
      ["Arabic", "Native"],
      ["English", "B1"],
    ],
  },
  contact: {
    columns: ["channel", "value"],
    rows: [
      ["email", SITE.email],
      ["linkedin", SITE.linkedinLabel],
      ["github", SITE.githubLabel],
      ["location", "Egypt"],
    ],
  },
};
