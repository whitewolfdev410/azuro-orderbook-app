'use client'
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
    for (let count = 0; count < items.length; count++) {
      if (items[count].selectionName === item.selectionName) {
        const newItem = items[count] as CustomMarketOutcome
        newItem.customId = count
        setOutcomeSelected(newItem)
        return
      }
    }
    throw new Error('Item not found')
  }

  const OrderBookTable = (
    <table className={clsx('min-w-full text-white border-none ')}>
      <thead className="border-b border-white border-opacity-10 sticky top-0 bg-[#242931] z-10">
        <tr className="text-sm font-semibold text-white uppercase">
          <th className="pl-6 text-[10px] py-2 text-left">Price</th>
          <th className="text-[10px] py-2 text-left">Amount</th>
        </tr>
      </thead>
      <tbody>
        {bets && !!bets?.length ? (
          bets.map(({ betAmount, odds }, index) => {
            return (
              <tr
                key={index}
                className="cursor-pointer hover:bg-white hover:bg-opacity-10"
                onClick={() => {
                  changeBatchBetAmount(selectedOutcome, betAmount)
                }}
              >
                <td className="pl-6 pr-3 py-2 text-base text-[#54D09E]">{`${formatOdds(odds).toFixed(2)}¢`}</td>
                <td className="py-2 text-base">
                  $
                  {Number(parseFloat(betAmount).toFixed(2)).toLocaleString(
                    'en'
                  )}
                </td>
              </tr>
            )
          })
        ) : (
          <tr>
            <td colSpan={4} className="text-center py-4">
              No data available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )

  const selectedFirst =
    selectedOutcome.selectionName === outcomeRowSelected[0].selectionName
  const selectedSecond =
    selectedOutcome.selectionName === outcomeRowSelected[1].selectionName

  return (
    <div className="rounded-lg mt-4">
      <div className="mb-10 flex rounded-full bg-[#FFFFFF0D] mx-auto w-fit">
        <button
          className={clsx('px-4 py-2 rounded-full text-14px font-semibold', {
            'bg-white text-black': selectedFirst,
            'bg-transparent text-[#868C98]': selectedSecond,
          })}
          onClick={() => {
            outcomeClick(outcomeRowSelected[0])
          }}
        >
          {firstSelectionName}
        </button>
        <button
          className={clsx(
            'px-4 py-2 rounded-full ml-2 text-14px font-semibold',
            {
              'bg-white text-black': selectedSecond,
              'bg-transparent text-[#868C98]': selectedFirst,
            }
          )}
          onClick={() => {
            outcomeClick(outcomeRowSelected[1])
          }}
        >
          {secondSelectionName}
        </button>
      </div>
      {isFetching ? (
        <div className="grid grid-cols-1 gap-4 px-4">
          <SkeletonArray length={3} className="w-full !h-10" />
        </div>
      ) : (
        <div className="overflow-auto flex-1">{OrderBookTable}</div>
      )}
    </div>
  )
}

export default OrderBook
