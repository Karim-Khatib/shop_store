import type { Metadata } from "next";
<<<<<<< HEAD:src/app/layout.tsx

import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { ModeToggle } from "@/components/ui/ModeToggle";
const SeventyFont = localFont({
  src: [
    {
      path: "../fonts/SeventyFont.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  preload: false,
=======
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import person from "../assets/person.svg";
import gift from "../assets/gift.svg";
import NavBarComponent from "@/navbar/NavBarComponent";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
>>>>>>> 3b54f21d62a4d3a5ae1f09d685b143f0c7ef776a:src/app/home/layout.tsx
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
          <ModeToggle />
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
