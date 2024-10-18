'use client'
import Button, { BetButton } from '@/components/Button'
import { ExploreContext } from '@/contexts'
import Icons, { ReceiptItemIcon, SportIcon } from '@/icons'
import { BetOutcome, useBaseBetslip, useDetailedBetslip } from '@azuro-org/sdk'
import type { MarketOutcome } from '@azuro-org/toolkit'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import SmallBetCard from './SmallBetCard'
import Bet from '@/components/BetslipButton/Bet'
import BatchBetButton from '@/components/Button/BatchBetButton'

export default function Betslip() {
  const { items, clear } = useBaseBetslip()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null)

  const { betAmount, batchBetAmounts, odds } = useDetailedBetslip()

  let totalReturn = 0
  for (const key in odds) {
    totalReturn += odds[key] * Number(batchBetAmounts[key])
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* <div className="flex items-center justify-between">
        <p className="font-bold">All Betslip</p>
        {Boolean(items.length) && (
          <Button
            size="sm"
            onClick={() => {
              clear()
            }}
          >
            <Icons name="closeCircleOutline" className="mr-2" />
            Remove all
          </Button>
        )}
      </div> */}
      <div className="flex flex-1 flex-col overflow-auto">
        {items.length ? (
          items.map((item) => {
            const key = `${item.game.gameId}-${item.outcomeId}-${item.conditionId}`
            const isSelected = selectedIndex === key
            return <Bet
              key={key}
              item={item}
              conditionId={item.conditionId}
              outcomeId={item.outcomeId}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setSelectedIndex={setSelectedIndex}
              isSelected={isSelected}
            />
          })
        ) : (
          <div className="mt-40 flex items-center justify-center flex-col gap-1">
            <ReceiptItemIcon />
            <div className="text-center mt-2 font-bold">No bets added</div>
          </div>
        )}
      </div>
      <p>
        Total bet amount: {betAmount}
      </p>
      <p>
        Total to win: {totalReturn}
      </p>
      <BatchBetButton setIsLoading={setIsLoading} totalBetAmount={Number(betAmount)} />
    </div>
  )
}
