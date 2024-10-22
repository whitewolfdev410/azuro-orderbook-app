'use client'
import { useTheme } from '@/app/ThemeContext'
import { IconButton } from '@/components'
import BetslipButton from '@/components/BetslipButton'
import { Dialog as ExploreDialog } from '@/components/Dialog'
import Input from '@/components/Input'
import { ExploreContext } from '@/contexts'
import { useBreakpoints, useDialog } from '@/hooks'
import Icons, { ThemeIcon } from '@/icons'
import { reconnect } from '@wagmi/core'
import clsx from 'clsx'
import Link from 'next/link'
import { use, useEffect } from 'react'
import { useConfig } from 'wagmi'
import CustomConnectButton from './CustomConnectButton'
import ExploreDialogContent from './ExploreDialogContent'
import SelectAppChain from './SelectAppChain'

function RenderExploreDialog({ open, onClose, params }) {
  return (
    <ExploreDialog title="Topics" open={open} onClose={onClose} {...params}>
      <ExploreDialogContent onClose={onClose} />
    </ExploreDialog>
  )
}

export default function RootLayoutHeader() {
  const config = useConfig()
  const breakpoints = useBreakpoints()
  const { setSearching } = use(ExploreContext)
  const { onOpen, Component: dialogContent } = useDialog({
    children: RenderExploreDialog,
  })
  const { theme, toggleTheme } = useTheme() // Get theme state

  useEffect(() => {
    ;(async () => {
      try {
        await reconnect(config)
      } catch {}
    })()
  }, [config])
  
  return (
    <header className={clsx("flex flex-col items-center py-3.5 gap-2",
      theme === "light" && "shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] shadow-black/20",
      "px-4 mb-2"
    )}>
      <div className="flex md:gap-3 gap-0 items-center w-full">
        <Link href="/" className="text-xl font-semibold">
          <Icons name="logo" className="mr-2" />
        </Link>
        {/* Theme Toggle Button */}
        <div onClick={toggleTheme}>
          <ThemeIcon/>
        </div>
        {/* <IconButton
          text={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          onClick={toggleTheme}
          className="ml-auto"
          // icon={theme === 'dark' ? 'sun' : 'moon'} // Use appropriate icon
        /> */}
        
        {/* {!breakpoints.isXs && (
          <IconButton
            text="E-Sports"
            trailingIcon="dropdown"
            prefixIcon="explorePrefix"
            onClick={onOpen}
            className={clsx({
              hidden: breakpoints.isMinLg,
            })}
          />
        )} */}
        {!breakpoints.isXs && (
          <div className="flex-1 mx-2">
            <Input
              onChange={(e) => setSearching(e.target.value)}
              startIcon={<Icons name="search" />}
              placeholder="Search..."
              containerClass="flex-1"
            />
          </div>
        )}
        <div className="ml-auto flex items-center gap-2">
          <SelectAppChain />
          <CustomConnectButton />
          <span className="lg:hidden">
            <BetslipButton />
          </span>
        </div>
      </div>
      {breakpoints.isXs && (
        <div className="w-full mt-2">
          <Input
            onChange={(e) => setSearching(e.target.value)}
            startIcon={<Icons name="search" />}
            placeholder="Search..."
            containerClass="flex-1"
            className="bg-red-500"
          />
        </div>
      )}
      {dialogContent}
    </header>
  )
}
