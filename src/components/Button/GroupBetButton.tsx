'use client'
import { BETS_AMOUNT_DECIMALS } from '@/constants'
import { ExploreContext } from '@/contexts'
import { compareOutcome, formatOdds } from '@/utils'
import { BetslipItem, useBaseBetslip, useDetailedBetslip } from '@azuro-org/sdk'
import type { MarketOutcome } from '@azuro-org/toolkit'
import { useContext } from 'react'
import SelectBetButton from './SelectBetButton'

export type GroupBetButtonProps = {
  onClick?: () => void
  outcomeId?: string
  outcomeRowSelected?: MarketOutcome[]
  betsData?: BetslipItem
}

const GroupBetButton = (props: Readonly<GroupBetButtonProps>) => {
  const { setOutcomeSelected, allBets } = useContext(ExploreContext)
  const { outcomeId = 0, outcomeRowSelected } = props
  const { items, addItem } = useBaseBetslip()
  const { changeBatchBetAmount } = useDetailedBetslip()
  const handleClick = (item: MarketOutcome) => {
    if (!items.some((i) => compareOutcome(i, item))) {
      addItem(item)
      changeBatchBetAmount(item, BETS_AMOUNT_DECIMALS)
    }
    setOutcomeSelected(item)
  }

  return (
    <div className="flex flex-col gap-2 font-bold text-md">
      {outcomeRowSelected?.map((item, index) => (
        <SelectBetButton
          key={`${item.outcomeId}-${item.conditionId}`}
          text={item.selectionName}
          price={`${formatOdds(item.odds!).toFixed(2)}¢`}
          index={index}
          isSelected={outcomeId === item.outcomeId}
          onClick={() => handleClick(item)}
          totalBetsPlaced={allBets[item.outcomeId]?.length || 0}
        />
      ))}
    </div>
  )
}

export default GroupBetButton
