import type { Metadata, Viewport } from "next";
import { clashDisplay, geistSans, jetbrainsMono } from "./fonts";
import { AmbientBackground } from "@/components/ambient-background";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const SITE_TITLE = "Decrypt │ AI Software Studio for Custom Apps, Automation & Business Systems";
const SITE_DESC =
  "Decrypt builds AI-ready custom software, web apps, mobile apps, ERP systems, dashboards, SharePoint workflows, automation, integrations and maintenance for real business operations.";

export const metadata: Metadata = {
  metadataBase: new URL("https://decrypt-studio.vercel.app"),
  title: SITE_TITLE,
  description: SITE_DESC,
  applicationName: "Decrypt",
  keywords: [
    "AI software studio",
    "custom software development",
    "AI workflow automation",
    "web app development",
    "mobile app development",
    "ERP development",
    "SharePoint Power Automate services",
    "WordPress development and maintenance",
  ],
  authors: [{ name: "Decrypt" }],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    type: "website",
    siteName: "Decrypt",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#070809",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${jetbrainsMono.variable} ${clashDisplay.variable}`}
    >
      <body>
        <SmoothScroll />
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
