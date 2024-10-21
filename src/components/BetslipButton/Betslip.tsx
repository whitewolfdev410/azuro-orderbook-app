'use client'
import { ExploreContext } from '@/contexts'
import { ReceiptItemIcon } from '@/icons'
import { useBaseBetslip, useDetailedBetslip } from '@azuro-org/sdk'
import { use, useState } from 'react'
import Bet from '@/components/BetslipButton/Bet'
import BatchBetButton from '@/components/Button/BatchBetButton'

export default function Betslip() {
  const {betTokenSymbol} = use(ExploreContext)
  const { items, clear } = useBaseBetslip()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null)

  const { batchBetAmounts, odds } = useDetailedBetslip()

  let totalReturn = 0
  for (const key in odds) {
    totalReturn += odds[key] * Number(batchBetAmounts[key])
  }

  let totalBetAmount = 0
  for (const key in batchBetAmounts) {
    totalBetAmount += Number(batchBetAmounts[key])
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
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
      <div className="flex flex-1 flex-col overflow-y-scroll">
        {items.length ? (
          items.map((item) => {
            const key = `${item.outcomeId} ${item.game.gameId} ${item.conditionId}`
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
              selectedIndex={selectedIndex}
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
        Total bet amount: {betTokenSymbol} {Number(totalBetAmount).toLocaleString('en')}
      </p>
      <p>
        Total to win: {betTokenSymbol} {totalReturn? Number(totalReturn).toLocaleString('en'): 0}
      </p>
      <BatchBetButton setIsLoading={setIsLoading} totalBetAmount={Number(totalBetAmount)} />
    </div>
  )
}
