import { DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Read-Ease - Turn any article into an accessible bite-size read",
  description: "Paste any article URL to get a WCAG-AA compliant reading time badge and AI-generated summary.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
