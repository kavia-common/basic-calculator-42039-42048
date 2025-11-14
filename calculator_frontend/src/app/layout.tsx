import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ocean Calculator",
  description: "A modern calculator with Ocean Professional theme",
  applicationName: "Basic Calculator",
  keywords: ["calculator", "nextjs", "ocean", "professional", "arithmetic"],
  authors: [{ name: "Ocean Professional UI" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
