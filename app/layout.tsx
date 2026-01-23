import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "E-Commerce Store",
    template: "%s | E-Commerce Store",
  },
  description:
    "A simple e-commerce Store built with Next.js, ShadcnUI, Tailwind and Prisma",
  openGraph: {
    title: "E-Commerce Store",
    description:
      "A simple e-commerce Store built with Next.js, ShadcnUI, Tailwind and Prisma",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "E-Commerce Store",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex min-h-screen flex-col">
                <header>
                  <Navbar />
                </header>
                <main className="flex-1">{children}</main>
                <footer className="border-t border-dashed py-8">
                  <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:flex-row text-sm text-muted-foreground">
                    {/* Copyright Bereich */}
                    <p>
                      © {new Date().getFullYear()} E-Commerce Store. All rights
                      reserved.
                    </p>

                    {/* Rechtliche Links */}
                    <nav className="flex gap-6">
                      <Link
                        href="/imprint"
                        className="transition-colors hover:text-foreground hover:underline underline-offset-4"
                      >
                        Imprint
                      </Link>
                      <Link
                        href="/privacy"
                        className="transition-colors hover:text-foreground hover:underline underline-offset-4"
                      >
                        Privacy Policy
                      </Link>
                    </nav>
                  </div>
                </footer>
              </div>
            </ThemeProvider>
          </SessionProvider>
        </body>
      </html>
    </Suspense>
  );
}
