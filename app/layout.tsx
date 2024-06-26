import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTransitionBar from "next-transition-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication using server and client component.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <NextTransitionBar color="black" showSpinner={false} />
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
