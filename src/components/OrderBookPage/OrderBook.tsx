/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { Skeleton } from '@/components';
import { formatOdds } from '@/helpers/formatOdds';
import { BETS_AMOUNT_DECIMALS } from '@/hooks/useOrderBook.v2';
import { ExploreContext } from '@/providers/ExploreProvider';
import compareOutcome from '@/utils/compareOutcome';
import { useBaseBetslip, useDetailedBetslip } from '@azuro-org/sdk';
import { type MarketOutcome } from '@azuro-org/toolkit';
import cx from 'clsx';
import React, { useContext, useMemo } from 'react';

type Props = {
  outcomeRowSelected: MarketOutcome[];
  isFetching: boolean;
  bets: any;
};

const OrderBook: React.FC<Props> = ({
  bets,
  outcomeRowSelected,
  isFetching
}) => {
  const { addItem, items } = useBaseBetslip();
  const { setOutcomeSelected, outcomeSelected } = useContext(ExploreContext);
  if (!outcomeSelected || !outcomeRowSelected.length) return null;
  const selectedOutcome = outcomeSelected;
  const firstSelectionName = outcomeRowSelected[0].selectionName;
  const secondSelectionName = outcomeRowSelected[1].selectionName;
  const { changeBatchBetAmount } = useDetailedBetslip();
  const outcomeClick = (item: MarketOutcome) => {
    if (!items.some((i) => compareOutcome(i, item))) {
      addItem(item);
      changeBatchBetAmount(item, BETS_AMOUNT_DECIMALS);
    }
    setOutcomeSelected(item);
  };

  const totalAmount = useMemo(
    () => bets?.reduce((acc: number, curr: any) => acc + +curr.betAmount, 0),
    [bets]
  );

  const OrderBookTable = (
    <table className={cx('min-w-full text-white border-none ')}>
      <thead className="border-b border-white border-opacity-10 sticky top-0 bg-[#242931] z-10">
        <tr className="text-sm font-semibold text-white uppercase">
          <th className="pl-6 text-[10px] py-2 text-left">Price</th>
          {/* <th className="pl-6 text-[10px] py-2 text-left">Price</th> */}
          <th className="text-[10px] py-2 text-left">
            {/* {betRange === 'Single' ? 'Amount' : 'Total'} */}
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {bets && !!bets?.length ? (
          // @ts-ignore
          bets.map(({ betAmount, odds }: any, index) => {
            return (
              <tr
                key={index}
                className="cursor-pointer hover:bg-white hover:bg-opacity-10"
                onClick={() => {
                  changeBatchBetAmount(selectedOutcome, betAmount);
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
            );
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
  );

  return (
    <div className="rounded-lg mt-4">
      {/* Group Button */}
      <div className="mb-10 flex rounded-full bg-[#FFFFFF0D] mx-auto w-fit">
        <button
          className={cx('px-4 py-2 rounded-full text-14px font-semibold', {
            'bg-white text-black':
              selectedOutcome.selectionName ===
              outcomeRowSelected[0].selectionName,
            'bg-transparent text-[#868C98]':
              selectedOutcome.selectionName ===
              outcomeRowSelected[1].selectionName
          })}
          onClick={() => {
            outcomeClick(outcomeRowSelected[0]);
          }}
        >
          {firstSelectionName}
        </button>
        <button
          className={cx('px-4 py-2 rounded-full ml-2 text-14px font-semibold', {
            'bg-white text-black':
              selectedOutcome.selectionName ===
              outcomeRowSelected[1].selectionName,
            'bg-transparent text-[#868C98]':
              selectedOutcome.selectionName ===
              outcomeRowSelected[0].selectionName
          })}
          onClick={() => {
            outcomeClick(outcomeRowSelected[1]);
          }}
        >
          {secondSelectionName}
        </button>
      </div>
      {isFetching ? (
        <div className="grid grid-cols-1 gap-4 px-4">
          {[1, 2, 3].map((index) => (
            <Skeleton className="w-full !h-10" key={index} />
          ))}
        </div>
      ) : (
        <div className="overflow-auto flex-1">{OrderBookTable}</div>
      )}
    </div>
  );
};

export default OrderBook;
