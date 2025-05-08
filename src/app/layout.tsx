import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import localFont from "next/font/local";
import { Toaster } from "sonner";
const SeventyFont = localFont({
  src: [
    {
      path: "../fonts/SeventyFont.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  preload: false,
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Seventy cola",
  description: "test project in next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${SeventyFont.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
          disableTransitionOnChange
        >
          {/* <ModeToggle /> */}
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
