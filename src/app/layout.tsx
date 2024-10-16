import AllSportsTag from '@/components/AllSportsTag'
import ClientBetSlipButtonContent from '@/components/BetslipButton/ClientBetslipButtonContent'
import { Notification } from '@/components/Noti'
import { RootLayoutHeader } from '@/layouts/root/components'
import { AppProvider } from '@/providers'
import '@rainbow-me/rainbowkit/styles.css'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import React from 'react'
import { ThemeProvider } from './ThemeContext'
import './globals.css'

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
        <body className={`bg-[#1A1F26] text-white text-[14px]`}>
          {' '}
          {/* Wrap with ThemeProvider */}
          <AppProvider initialChainId={initialChainId}>
            <Notification />
            <div className="md:max-w-[100%] mx-auto px-4 sm:px-8 md:px-4 max-h-[100vh]">
              <RootLayoutHeader />
              <div className="flex lg:flex-row lg:gap-2 max-lg:flex-col bg-gray-700 lg:bg-transparent">
                <div className="lg:w-[15vw]">
                  <AllSportsTag />
                </div>
                <main className="max-md:mt-12 flex flex-col gap-4 max-md:transparent">
                  {children}
                </main>
                <div className="lg:w-[20vw]">
                  <ClientBetSlipButtonContent />
                </div>
              </div>
            </div>
          </AppProvider>
        </body>
      </ThemeProvider>
    </html>
  )
}
