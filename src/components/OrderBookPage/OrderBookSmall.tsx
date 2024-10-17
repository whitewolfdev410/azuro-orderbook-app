'use client'
import OrderBookTable from '@/components/OrderBookPage/OrderBookTable'
import OrderBookTableSmall from '@/components/OrderBookPage/OrderBookTableSmall'
import { SkeletonArray } from '@/components/Skeleton'
import { BETS_AMOUNT_DECIMALS } from '@/constants'
import { CustomMarketOutcome, ExploreContext } from '@/contexts'
import { compareOutcome, formatOdds } from '@/utils'
import { useBaseBetslip, useDetailedBetslip } from '@azuro-org/sdk'
import { MarketOutcome } from '@azuro-org/toolkit'
import clsx from 'clsx'
import React, { useContext } from 'react'

export type OrderBookProps = {
  outcomeRowSelected: MarketOutcome[]
  isFetching: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bets?: any[]
}

const OrderBook: React.FC<Readonly<OrderBookProps>> = ({
  bets,
  outcomeRowSelected,
  isFetching,
}) => {
  const { addItem, items } = useBaseBetslip()
  const { setOutcomeSelected, outcomeSelected } = useContext(ExploreContext)
  const { changeBatchBetAmount } = useDetailedBetslip()

  if (!outcomeSelected || !outcomeRowSelected.length) {
    return null
  }
  const selectedOutcome = outcomeSelected
  const firstSelectionName = outcomeRowSelected[0].selectionName
  const secondSelectionName = outcomeRowSelected[1].selectionName
  const outcomeClick = (item: MarketOutcome) => {
    if (!items.some((i) => compareOutcome(i, item))) {
      addItem(item)
      changeBatchBetAmount(item, BETS_AMOUNT_DECIMALS)
    }
    let itemFound = false
    for (let count = 0; count < items.length; count++) {
      if (items[count].selectionName === item.selectionName) {
        const newItem = items[count] as unknown as CustomMarketOutcome
        newItem._outcomeSelected = count
        setOutcomeSelected(newItem)
        itemFound = true
      }
    }
    if (!itemFound) {
      throw new Error('Item not found')
    }
  }

  const selectedFirst =
    selectedOutcome.selectionName === outcomeRowSelected[0].selectionName
  const selectedSecond =
    selectedOutcome.selectionName === outcomeRowSelected[1].selectionName

  return (
    <div className="rounded-lg mt-4">
      {isFetching ? (
        <div className="grid grid-cols-1 gap-4 px-4">
          <SkeletonArray length={3} className="w-full !h-10" />
        </div>
      ) : (
        <div className="flex-1">
          <OrderBookTable bets={bets} selectedOutcome={outcomeSelected} />
        </div>
      )}
    </div>
  )
}

export default OrderBook
