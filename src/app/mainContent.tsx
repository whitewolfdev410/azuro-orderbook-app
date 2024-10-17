'use client'
import AllSportsTag from '@/components/AllSportsTag'
import ClientBetInfo from '@/components/BetInfo/ClientBetInfo'
import ClientBetSlipButtonContent from '@/components/BetslipButton/ClientBetslipButtonContent'
import { Notification } from '@/components/Noti'
import { RootLayoutHeader } from '@/layouts/root/components'
import { useTheme } from './ThemeContext'

export default function MainContent({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { theme } = useTheme()

  return (
    <body className={`bg-[#1A1F26] text-white text-[14px] ${theme}`}>
      {' '}
      {/* Wrap with ThemeProvider */}
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
            <ClientBetInfo />
            <ClientBetSlipButtonContent />
          </div>
        </div>
      </div>
    </body>
  )
}
