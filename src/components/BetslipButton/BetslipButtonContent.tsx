'use client'

import { useTheme } from '@/app/ThemeContext'
import Betslip from '@/components/BetslipButton/Betslip'
import MyBets from '@/components/BetslipButton/MyBets'
import { useBreakpoints } from '@/hooks'
import { Icons, IconsProps } from '@/icons'
import { returnTypeOfBet } from '@/utils'
import { BetType, useBaseBetslip, usePrematchBets } from '@azuro-org/sdk'
import clsx from 'clsx'
import React, { useMemo } from 'react'
import { Address } from 'viem'
import { useAccount } from 'wagmi'

const PADDING = 40

type BetTabOption = {
  key: string
  label: string
  icon: IconsProps['name']
}

const betTabOptions = (numItems: number, numBetsPlaced): BetTabOption[] => [
  { key: 'betslip', label: `Betslip (${numItems})`, icon: 'judge' },
  { key: 'mybets', label: `My Bets (${numBetsPlaced})`, icon: 'receipt' },
]

type HeaderProps = {
  type: string
  setType: (type: string) => void
  setIsOpen: (isOpen: boolean) => void
  numItems: number
  numBetsPlaced: number
}

const Header = ({
  type,
  setType,
  setIsOpen,
  numItems,
  numBetsPlaced,
}: Readonly<HeaderProps>) => {
  const options = betTabOptions(numItems, numBetsPlaced)
  const { theme } = useTheme()

  return (
    <div className="flex items-center w-full justify-between">
      <div
        className={clsx(
          'flex items-center gap-2 h-[56px] rounded-full p-2 lg:w-full max-md:w-full md:w-[70%]',
          theme === 'dark' ? 'bg-[#FFFFFF0D]' : 'bg-gray-200'
        )}
      >
        {options.map((item) => (
          <button
            key={item.key}
            className={clsx(
              'flex items-center justify-center px-4 rounded-full h-full w-full cursor-pointer',
              theme === 'dark'
                ? 'hover:bg-[#FFFFFF] hover:text-black'
                : 'hover:bg-gray-600 hover:text-white',
              {
                'text-[#868C98]': type !== item.key,
                'bg-[#FFFFFF] text-black':
                  type === item.key && theme === 'dark',

                'bg-gray-600 text-white':
                  type === item.key && theme === 'light',
              }
            )}
            onClick={() => {
              setType(item.key)
            }}
          >
            <span className="max-sm:hidden lg:hidden xl:inline">
              <Icons name={item.icon} />
            </span>
            {item.label}
          </button>
        ))}
      </div>
      <span className="lg:hidden">
        <Icons
          name="closeCircle"
          className="cursor-pointer"
          onClick={() => {
            setIsOpen(false)
          }}
        />
      </span>
    </div>
  )
}

export default function BetslipButtonContent({
  isOpen,
  setIsOpen,
}: Readonly<{ isOpen: boolean; setIsOpen: (isOpen: boolean) => void }>) {
  const { address } = useAccount()
  const prematchBets = usePrematchBets({
    filter: {
      bettor: address as Address,
    },
  })
  const countBets = useMemo(() => {
    const _bets = prematchBets.bets
    const isActive = _bets.filter(
      (bet) => returnTypeOfBet(bet) === BetType.Accepted
    )
    const isUnredeemed = _bets.filter(
      (bet) => returnTypeOfBet(bet) === BetType.Unredeemed
    )
    const isSettled = _bets.filter(
      (bet) => returnTypeOfBet(bet) === BetType.Settled
    )

    return {
      isActive: isActive.length,
      isUnredeemed: isUnredeemed.length,
      isSettled: isSettled.length,
    }
  }, [prematchBets.bets])

  const tabs = useMemo(
    () => [
      {
        name: 'Active',
        type: BetType.Accepted,
        count: countBets?.isActive || 0,
      },
      {
        name: 'Unredeemed',
        type: BetType.Unredeemed,
        count: countBets?.isUnredeemed || 0,
      },
      {
        name: 'Settled',
        type: BetType.Settled,
        count: countBets?.isSettled || 0,
      },
    ],
    [countBets]
  )

  const numBetsPlaced = tabs.reduce((sum, tab) => sum + tab.count, 0)
  const { items } = useBaseBetslip()
  const [type, setType] = React.useState('betslip')

  const onClose = () => {
    setIsOpen(false)
  }
  const { theme } = useTheme()
  const breakpoints = useBreakpoints()

  return (
    <div
      className={clsx(
        'max-lg:absolute z-[3] right-0 max-lg:max-w-[calc(100vw-2rem)] lg:w-[100%] bg-[#252A31] rounded-lg p-2 xl:p-4 overflow-hidden flex flex-col',
        'max-lg:border max-lg:border-1 max-lg:border-gray-600',
        breakpoints.isXxs && 'w-[100vw]',
        !breakpoints.isXs && 'sm:w-[80vw]',
        (!breakpoints.isXxs || !breakpoints.isXs) && 'max-lg:w-[60vw]',
        {
          hidden: !isOpen,
        },
        'max-lg:mt-2 max-lg:80vh overflow-scroll',
        // 'shadow-[0_0px_300px_24px_rgb(0_0_0_/_80%)]',
        '',
        theme === 'dark'
          ? 'bg-[#252A31]'
          : 'bg-white border border-gray-300 border-1'
      )}
    >
      <Header
        type={type}
        setType={setType}
        setIsOpen={setIsOpen}
        numItems={items.length}
        numBetsPlaced={numBetsPlaced}
      />
      <div className="mt-4 flex-1 overflow-hidden flex flex-col">
        {type === betTabOptions(items.length, numBetsPlaced)[0].key ? (
          <Betslip />
        ) : (
          <MyBets tabs={tabs} prematchBets={prematchBets} />
        )}
      </div>
    </div>
  )
}
