import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/index.css";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-600.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-700.css";
import "./globals.css";
import { PrefsProvider } from "@/components/providers/prefs";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SqlConsole } from "@/components/terminal/sql-console";
import { SITE } from "@/lib/content";

const TITLE = "Ahmed Kamar — Data Analyst";
const DESCRIPTION =
  "Data Analyst turning restaurant, retail, and delivery-platform data into clear answers teams can act on. SQL, Google Sheets, Power BI, Python. Open to roles in Egypt, the Gulf, or remote.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: "%s · Ahmed Kamar" },
  description: DESCRIPTION,
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    siteName: "Ahmed Kamar",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    alternateLocale: "ar_EG",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060D1B" },
    { media: "(prefers-color-scheme: light)", color: "#F4F7FC" },
  ],
  colorScheme: "dark light",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: "Data Analyst",
  email: SITE.email,
  url: SITE.url,
  sameAs: [SITE.linkedin, SITE.github],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Benha University" },
  knowsAbout: ["SQL", "Google Sheets", "Power BI", "Python", "Excel", "Database design"],
  knowsLanguage: ["Arabic", "English"],
};

/* Applies the stored language + theme before first paint (no flash). */
const PRE_HYDRATION = `try{var d=document.documentElement,t=localStorage.getItem("theme"),l=localStorage.getItem("lang");if(t==="light"||(!t&&matchMedia("(prefers-color-scheme: light)").matches))d.setAttribute("data-theme","light");if(l==="ar"){d.lang="ar";d.dir="rtl"}}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRE_HYDRATION }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.hero-line>span,.fade-up{animation:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <PrefsProvider>
          <ScrollProgress />
          <Nav />
          {children}
          <Footer />
          <SqlConsole />
        </PrefsProvider>
      </body>
    </html>
  );
}
