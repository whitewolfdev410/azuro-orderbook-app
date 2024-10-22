'use client'
import { useTheme } from '@/app/ThemeContext'
import { BETS_AMOUNT_DECIMALS } from '@/constants'
import Icons from '@/icons'
import { compareOutcome, formatOdds } from '@/utils'
import {
  useBaseBetslip,
  useDetailedBetslip,
  useSelection,
} from '@azuro-org/sdk'
import { type MarketOutcome } from '@azuro-org/toolkit'
import clsx from 'clsx'
import { useMemo } from 'react'

export type OutcomeProps = {
  className?: string
  text: string
  outcome: MarketOutcome
  index: number
  onSelectOutcome: () => void
  isPlaced?: boolean
}

export default function OutcomeButton(props: Readonly<OutcomeProps>) {
  const {
    className = '',
    text,
    outcome,
    index,
    onSelectOutcome,
    isPlaced = true,
  } = props

  const { addItem, items } = useBaseBetslip()
  const { changeBatchBetAmount } = useDetailedBetslip()
  const { odds, isLocked, isOddsFetching } = useSelection({
    selection: outcome,
    initialOdds: outcome.odds,
    initialStatus: outcome.status,
  })

  const formattedOdds = useMemo(() => {
    return odds ? formatOdds(odds) : odds
  }, [odds])

  const {theme} = useTheme()

  const buttonClassName = clsx(
    `transition rounded-lg cursor-pointer w-full disabled:cursor-not-allowed disabled:opacity-50 ${className}`,
     theme === 'dark' && 'bg-appGray-100',
     theme === 'light' && 'bg-gray-100 bg-white border border-gray-300',
  )
  const priceClassName = clsx('font-medium font-bold', 
    theme === 'dark' && index === 0 && "text-button-LightGreen",
    theme === 'dark' && index === 1 && 'text-button-red',
    theme === 'light' && index === 0 && 'text-[#1f842a]',
    theme === 'light' && index === 1 && 'text-[#fa2929]', 
  )
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!items.some((i) => compareOutcome(i, outcome))) {
      addItem(outcome)
      changeBatchBetAmount(outcome, BETS_AMOUNT_DECIMALS)
    }
    onSelectOutcome()
    e.stopPropagation(); // Prevent card click
  }

  return (
    <div className="group p-1 flex-1 relative">
      {text && (
        <div className="text-center pb-1 font-light">
          {text}
        </div>
      )}
      <button
        className={clsx(isPlaced && 'border-pink border p-2', buttonClassName, {
          'gradient-border-mask': !isPlaced,
        })}
        onClick={handleClick}
        disabled={isLocked}
      >
        {isPlaced && (
          <div className="absolute right-5 -top-4 rounded-full px-2 py-1 flex items-center bg-pink gap-1">
            <Icons name="judgeOutline" />
            <div>Bet placed</div>
          </div>
        )}
        <div className="flex justify-center w-full text-sm items-center">
          {/* {text && (
            <div className="lg:hidden">
              {text}
            </div>
          )} */}
          <p className={priceClassName}>
            {isOddsFetching ? '--' : `${formattedOdds.toFixed(2)}¢`}
          </p>
        </div>
      </button>
    </div>
  )
}
