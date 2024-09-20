'use client';
import { MyBetFilterNotFound, MyBetNotFound } from '@/components/NotFound';
import { returnTypeOfBet } from '@/utils';
import { BetType, usePrematchBets } from '@azuro-org/sdk';
import { useMemo, useState } from 'react';
import { type Address } from 'viem';
import { useAccount } from 'wagmi';
import { SkeletonArray } from '../Skeleton';
import Tabs from '../Tabs';
import WrapBetCard from './WrapBetCard';

export default function MyBets() {
  const { address } = useAccount();
  const [value, setValue] = useState(0);
  const prematchBets = usePrematchBets({
    filter: {
      bettor: address as Address,
    },
  });

  const countBets = useMemo(() => {
    const _bets = prematchBets.bets;
    const isActive = _bets.filter(
      (bet) => returnTypeOfBet(bet) === BetType.Accepted
    );
    const isUnredeemed = _bets.filter(
      (bet) => returnTypeOfBet(bet) === BetType.Unredeemed
    );
    const isSettled = _bets.filter(
      (bet) => returnTypeOfBet(bet) === BetType.Settled
    );

    return {
      isActive: isActive.length,
      isUnredeemed: isUnredeemed.length,
      isSettled: isSettled.length,
    };
  }, [prematchBets.bets]);

  const tabs = useMemo(
    () => [
      {
        name: 'Active',
        type: BetType.Accepted,
        count: countBets?.isActive || 0,
      },
      {
        name: 'Unredeemed',
        type: BetType.Unredeemed,
        count: countBets?.isUnredeemed || 0,
      },
      {
        name: 'Settled',
        type: BetType.Settled,
        count: countBets?.isSettled || 0,
      },
    ],
    [countBets]
  );

  const filterBets = useMemo(() => {
    const _bets = prematchBets.bets;
    const _data = _bets.filter(
      (bet) => returnTypeOfBet(bet) === tabs[value].type
    );
    return {
      bets: _data.toSorted((prev, curr) => curr.createdAt - prev.createdAt),
    };
  }, [prematchBets.bets, tabs, value]);

  const showNoData = useMemo(
    () => !prematchBets.loading && !prematchBets.bets.length,
    [prematchBets.bets.length, prematchBets.loading]
  );

  return (
    <>
      <div>
        {Boolean(prematchBets.bets.length) && (
          <Tabs items={tabs} value={value} onClick={setValue} />
        )}
      </div>
      <div className="flex-1 overflow-auto">
        {filterBets?.bets?.map((bet) => (
          <WrapBetCard key={bet.txHash} bet={bet} status={tabs[value].type} />
        ))}
        {prematchBets.loading && (
          <SkeletonArray length={3} className="mb-5 w-full h-[150px]" />
        )}
        {showNoData ? (
          <MyBetNotFound />
        ) : (
          <>
            {!prematchBets.loading && filterBets.bets.length === 0 && (
              <MyBetFilterNotFound />
            )}
          </>
        )}
      </div>
    </>
  );
}
