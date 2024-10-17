import { AppProvider } from '@/providers'
import '@rainbow-me/rainbowkit/styles.css'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import React from 'react'
import { ThemeProvider } from './ThemeContext'
import './globals.css'
import MainContent from './mainContent'
import ClientBetInfo from '@/components/BetInfo/ClientBetInfo'

export const metadata: Metadata = {
  title: 'WhalesBet',
  description: 'The decentralized betting',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies()
  const initialChainId = cookieStore.get('appChainId')?.value
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <ThemeProvider>
        <AppProvider initialChainId={initialChainId}>
          <MainContent children={children} />
        </AppProvider>
      </ThemeProvider>
    </html>
  )
}
