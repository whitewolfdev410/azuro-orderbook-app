'use client';
import { returnTypeOfBet } from '@/utils/game';
import { TTabItem } from '@/utils/types';
import { BetType, usePrematchBets } from '@azuro-org/sdk';
import { useMemo, useState } from 'react';
import { type Address } from 'viem';
import { useAccount } from 'wagmi';
import Skeleton from '../Loading/Skeleton';
import MyBetFilterNotFound from '../NotFound/MyBetFilterNotFound';
import MyBetNotFound from '../NotFound/MyBetNotFound';
import Tabs from '../Tabs';
import WrapBetCard from './WrapBetCard';

export default function MyBets() {
  const { address } = useAccount();
  const [value, setValue] = useState(0);
  const prematchBets = usePrematchBets({
    filter: {
      bettor: address as Address
      // limit: 100,
      // offset: 0
      // type: BetType.Unredeemed
    }
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
      isSettled: isSettled.length
    };
  }, [prematchBets.bets]);

  const tabs: TTabItem[] = [
    {
      name: 'Active',
      type: BetType.Accepted,
      count: countBets?.isActive || 0
    },
    {
      name: 'Unredeemed',
      type: BetType.Unredeemed,
      count: countBets?.isUnredeemed || 0
    },
    {
      name: 'Settled',
      type: BetType.Settled,
      count: countBets?.isSettled || 0
    }
  ];

  const filterBets = useMemo(() => {
    const _bets = prematchBets.bets;
    const _data = _bets.filter(
      (bet) => returnTypeOfBet(bet) === tabs[value].type
    );
    return {
      bets: _data.sort((prev, curr) => curr.createdAt - prev.createdAt)
    };
  }, [prematchBets.bets, value]);

  return (
    <>
      <div>
        {prematchBets.bets.length > 0 && (
          <Tabs Items={tabs} value={value} onClick={(e) => setValue(e)} />
        )}
      </div>
      <div className="flex-1 overflow-auto">
        {filterBets?.bets?.map((bet) => (
          // <WrapBetCard bet={bet} status={tabs[value].type} />
          <WrapBetCard key={bet.txHash} bet={bet} status={tabs[value].type} />
        ))}
        {prematchBets.loading && (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="mb-5 ">
                <Skeleton className="w-full h-[150px]" />
              </div>
            ))}
          </>
        )}
        {!prematchBets.loading && prematchBets.bets.length === 0 ? (
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
