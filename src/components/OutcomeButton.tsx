'use client';
import {
  useSelection,
  useBaseBetslip,
  useDetailedBetslip
} from '@azuro-org/sdk';
import { type MarketOutcome } from '@azuro-org/toolkit';
import cx, { clsx } from 'clsx';
import { useMemo } from 'react';
import compareOutcome from '@/utils/compareOutcome';
import { formatOdds } from '@/helpers/formatOdds';
import Icons from './Icons';
import { BETS_AMOUNT_DECIMALS } from '@/hooks/useOrderBook.v2';
type OutcomeProps = {
  className?: string;
  text: string;
  outcome: MarketOutcome;
  index: number;
  totalBetsPlaced: number;
  onSelectOutcome: () => void;
  isPlaced?: boolean;
};

export function OutcomeButton(props: OutcomeProps) {
  const {
    className = '',
    text,
    outcome,
    index,
    onSelectOutcome,
    totalBetsPlaced = 0,
    isPlaced = true
  } = props;

  const { addItem, items } = useBaseBetslip();
  const { changeBatchBetAmount } = useDetailedBetslip();
  const { odds, isLocked, isOddsFetching } = useSelection({
    selection: outcome,
    initialOdds: outcome.odds,
    initialStatus: outcome.status
  });

  const formattedOdds = useMemo(() => {
    return odds ? formatOdds(odds) : odds;
  }, [odds]);

  const buttonClassName = cx(
    `flex flex-col p-4 transition rounded-3xl cursor-pointer w-full disabled:cursor-not-allowed disabled:opacity-50 ${className}`,
    {
      // "bg-[#176448]": index === 0,
      // "bg-[#A34325]": index === 1,
      'bg-appGray-100': true
    }
  );
  const priceClassName = cx('font-medium rounded-full font-bold text-xl', {
    'text-button-LightGreen': index === 0,
    'text-button-red': index === 1
  });
  const handleClick = () => {
    if (!items.some((i) => compareOutcome(i, outcome))) {
      addItem(outcome);
      changeBatchBetAmount(outcome, BETS_AMOUNT_DECIMALS);
    }
    onSelectOutcome();
  };

  return (
    <div className="group p-[1px] rounded-3xl flex-1 relative">
      {/* <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-3xl z-[-1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
      <button
        className={clsx(
          [isPlaced && 'border-pink border h-full'],
          buttonClassName,
          {
            'gradient-border-mask': !isPlaced
          }
        )}
        onClick={handleClick}
        disabled={isLocked}
      >
        {isPlaced && (
          <div className="absolute right-5 -top-4 rounded-full px-2 py-1 flex items-center bg-pink gap-1">
            <Icons name="judgeOutline" />
            <div>Bet placed</div>
          </div>
        )}
        <div className="flex justify-between w-full">
          <div>
            <div className="font-semibold text-base">{text}</div>
          </div>
          <p className={priceClassName}>
            {isOddsFetching ? '--' : `${formattedOdds.toFixed(2)}¢`}
          </p>
        </div>
        <p className="text-appGray-500">Total Bets Placed: {totalBetsPlaced}</p>
      </button>
    </div>
  );
}
