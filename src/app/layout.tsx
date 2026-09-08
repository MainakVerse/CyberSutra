import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ChatWidget } from "@/components/layout/chat-widget";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyberSutra — AI-Native SecOps Platform for India",
  description:
    "CyberSutra is an AI-native cybersecurity operations platform built for Indian SMEs, MSSPs, and enterprise security teams — DPDP, CERT-In, ISO 27001, RBI and SEBI ready.",
};

const themeInitScript = `
(function() {
  try {
    var stored = window.localStorage.getItem('cybersutra-theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className="min-h-full flex flex-col bg-surface-0 text-text-primary"
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
