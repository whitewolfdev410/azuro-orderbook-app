'use client'
import { IconButton } from '@/components'
import BetslipButton from '@/components/BetslipButton'
import { Dialog as ExploreDialog } from '@/components/Dialog'
import Input from '@/components/Input'
import { ExploreContext } from '@/contexts'
import { useBreakpoints, useDialog } from '@/hooks'
import Icons from '@/icons'
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
  const { searchGame } = use(ExploreContext)

  const { onOpen, Component: dialogContent } = useDialog({
    children: RenderExploreDialog,
  })

  useEffect(() => {
    ;(async () => {
      try {
        await reconnect(config)
      } catch {}
    })()
  }, [config])

  return (
    <header className="flex flex-col items-center py-3.5 gap-2">
      <div className="flex gap-3 items-center w-full">
        <Link href="/" className="text-xl font-semibold">
          <Icons name="logo" className="mr-2" />
        </Link>
        {!breakpoints.isXs && (
          <IconButton
            text="Explore"
            trailingIcon="dropdown"
            prefixIcon="explorePrefix"
            onClick={onOpen}
            className={clsx({
              hidden: !breakpoints.isLg,
            })}
          />
        )}
        {!breakpoints.isXs && (
          <div className="flex-1 mx-2">
            <Input
              onChange={(e) => searchGame(e.target.value)}
              startIcon={<Icons name="search" />}
              placeholder="Search..."
              containerClass="flex-1"
            />
          </div>
        )}
        <div className="ml-auto flex items-center gap-2">
          <SelectAppChain />
          <CustomConnectButton />
          <BetslipButton />
        </div>
      </div>
      {breakpoints.isXs && (
        <div className="w-full mt-2">
          <Input
            onChange={(e) => searchGame(e.target.value)}
            startIcon={<Icons name="search" />}
            placeholder="Search..."
            containerClass="flex-1"
          />
        </div>
      )}
      {dialogContent}
    </header>
  )
}
