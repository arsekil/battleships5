import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from "@/styles/home.module.css";

import Menu from "@/components/Menu/Menu";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BattleShips5",
  description: "A battleship clone game in NextJS",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <div className={styles.naval}>
            <nav className={styles.nav}>
              <Menu />
            </nav>
            <section className={styles.children}>
              {children}
            </section>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
