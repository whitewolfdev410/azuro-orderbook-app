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
  const { outcomeSelected } = useContext(ExploreContext)

  if (!outcomeSelected || !outcomeRowSelected.length) {
    return null
  }
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
