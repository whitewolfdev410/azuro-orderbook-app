'use client'
import { BetslipContent } from '@/components/Betslip'
import { useFixDisableReason, useOrderBookV2 } from '@/hooks'
import type { GameMarkets, MarketOutcome } from '@azuro-org/toolkit'
import { useMemo } from 'react'
import OrderBook from './OrderBook'
import BetChart from '@/components/BetChart/BetChart'

export type OrderBookPageProps = {
  markets: GameMarkets
  outcomeSelected: MarketOutcome
}

const OrderBookPage = ({
  markets,
  outcomeSelected,
}: Readonly<OrderBookPageProps>) => {
  useFixDisableReason(outcomeSelected)
  const marketSelected = useMemo(
    () =>
      markets.find((market) => {
        return market.outcomeRows.find(
          (outcomeRow) =>
            outcomeRow[0].outcomeId === outcomeSelected.outcomeId ||
            outcomeRow[1].outcomeId === outcomeSelected.outcomeId
        )
      }),
    [markets, outcomeSelected]
  )

  const outcomeRowSelected = useMemo(
    () =>
      marketSelected?.outcomeRows.find(
        (outcomeRow) =>
          outcomeRow[0].outcomeId === outcomeSelected.outcomeId ||
          outcomeRow[1].outcomeId === outcomeSelected.outcomeId
      ) || [],
    [marketSelected, outcomeSelected]
  )

  const { data: bets, isFetching } = useOrderBookV2({
    conditionId: outcomeSelected.conditionId,
    outcomeId: outcomeSelected.outcomeId,
  })

  const conditionId = outcomeSelected.conditionId
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-4">
        <div>
          <BetChart conditionId={conditionId} outcomeSelected={0} />
        </div>
        <div className="col-span-12 md:col-span-7 pt-6 border-r border-white border-opacity-10">
          <OrderBook
            outcomeRowSelected={outcomeRowSelected}
            isFetching={isFetching}
            bets={bets}
          />
        </div>
        <div className="col-span-12 md:col-span-5 p-4 mb-4 rounded-md w-full max-h-[90vh]">
          <BetslipContent
            outcomeRowSelected={outcomeRowSelected}
            isFetching={isFetching}
          />
        </div>
      </div>
    </div>
  )
}

export default OrderBookPage
