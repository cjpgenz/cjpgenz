import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Oswald, Bowlby_One } from "next/font/google";
import "./globals.css";
import { SITE_INFO } from "@/constants/data";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const oswald = Oswald({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bowlbyOne = Bowlby_One({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const siteUrl = process.env.NEXT_CJP_PUBLIC_SITE_URL || "https://cjpgenz.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${SITE_INFO.SITE_FULL_NAME} — Voice of the Lazy & Unemployed`,
    template: `%s — ${SITE_INFO.SITE_FULL_NAME}`,
  },
  description:
    "A political party for the people the system forgot to count. Five demands. Zero sponsors. One large, stubborn swarm.",

  applicationName: SITE_INFO.SITE_FULL_NAME,
  keywords: [
    "Cockroach Janta Party",
    "CJP GenZ",
    "CJP",
    "Cockroach Party",
    "cockroachjantaparty",
    "Janta Party",
    "Youth political party India",
    "unemployed youth India",
    "lazy and unemployed party",
    "satire political party",
    "education reform India",
    "sack education minister",
    "student movement India",
    "Gen Z politics India",
    "protest party India",
    "five demands CJP",
  ],
  authors: [{ name: "Cockroach Janta Party" }],
  creator: "Cockroach Janta Party",
  publisher: "Cockroach Janta Party",
  category: "Politics & Satire",

  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.ico'],
  },

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SITE_INFO.SITE_FULL_NAME,
    title: `${SITE_INFO.SITE_FULL_NAME} — Voice of the Lazy & Unemployed`,
    description:
      "A political party for the people the system forgot to count. Five demands. Zero sponsors. One large, stubborn swarm.",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: `${SITE_INFO.SITE_FULL_NAME} — Stronger Together`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_INFO.SITE_FULL_NAME} — Voice of the Lazy & Unemployed`,
    description:
      "A political party for the people the system forgot to count. Five demands. Zero sponsors. One large, stubborn swarm.",
    images: ["/banner.webp"],
  },

  other: {
    "og:locale:alternate": "hi_IN",
    "article:tag": "CJP, Cockroach Party, Janta Party, Youth Movement",
  },
};

export const viewport = {
  themeColor: "#F4EBD7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${oswald.variable} ${bowlbyOne.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <head>
        {/* JSON-LD: Organization + WebSite with alternate names */}
        <script
          type="application/ld+json"
          id="schema-organization"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: SITE_INFO.SITE_FULL_NAME,
                  alternateName: [
                    "CJP GenZ",
                    "CJP",
                    "Cockroach Party",
                    "Janta Party",
                    "cockroachjantaparty",
                    "Cockroach Janta Party India",
                    "The Cockroach Party",
                    "CJP India",
                    "कॉकरोच जनता पार्टी",
                    "cockroachjanata",
                    "cockroachesjantaparty",
                    "cjparty"
                  ],
                  url: siteUrl,
                  logo: `${siteUrl}/icon.svg`,
                  description:
                    "A political party for the people the system forgot to count. Five demands. Zero sponsors. One large, stubborn swarm.",
                  foundingDate: "2026",
                  slogan: "Voice of the Lazy & Unemployed",
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: SITE_INFO.SITE_FULL_NAME,
                  alternateName: [
                    "CJP GenZ",
                    "CJP",
                    "Cockroach Party",
                    "cockroachjantaparty",
                    "cockroachjanata",
                    "cockroachesjantaparty",
                    "cjpart",
                    "Cockroach Party Official",
                  ],
                  publisher: {
                    "@id": `${siteUrl}/#organization`,
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
