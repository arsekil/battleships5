import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import styles from "@/styles/home.module.css";

import { ClerkProvider } from '@clerk/nextjs'
import ConvexClientProvider from '@/helpers/ConvexClientProvider'

import Menu from "@/components/Menu/Menu";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'BattleShips',
  description: 'A battleship clone game made with React, NextJS, Convex, Clerk',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <ConvexClientProvider>
            <div className={styles.naval}></div>
            <div className={styles.nav}>
              <Menu />
            </div>
            <div className={styles.container}>
              <div className={styles.children}>
                {children}
              </div>
            </div>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}