import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Github } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrabalhoFinalCryptoDev",
  description:
    "A demo of payments powered by x402 using Next.js and the Coinbase CDP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <div className="size-full flex flex-col">
          <header className={`${geistSans.className} border-b border-black pt-8`}>
            <div className="flex flex-col gap-2 min-w-9/12">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  x402 Dev Tool Playground
                </h1>
                <h2 className="text-lg font-semibold text-muted-foreground">
                  powered by:{" "}
                  <Link href="https://nextjs.org" className="underline hover:text-blue-600 transition-colors">
                    Next.js
                  </Link>
                  ,{" "}
                   <Link
                    href="https://x402.org/"
                    className="underline hover:text-blue-600 transition-colors"
                  >
                    x402 Org
                  </Link>
                  , and the{" "}
                  <Link
                    href="https://docs.cdp.coinbase.com/"
                    className="underline hover:text-blue-600 transition-colors"
                  >
                    Coinbase CDP
                  </Link>
                </h2>
              </div>
              <div className="w-full flex flex-row items-center justify-center py-1">
                <div className="flex flex-row gap-5 items-center">

                  <Link href="/playground" className="underline">
                    Paid API playground
                  </Link>
                  <Link href="/blog?bot=true" className="underline">
                    Test paid blocked resource
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-black py-4">
            <div className="container mx-auto px-6 flex justify-center items-center">
              <Link
                href="https://pedrojoaorp.github.io/final-project-bitcoin/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span>View on GitHub</span>
              </Link>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
