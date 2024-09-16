'use client';
import { OutcomeButton } from '@/components';
import { useOrderBook } from '@/hooks';
import useAddEvent from '@/hooks/useAddEvent';
import { ExploreContext } from '@/providers/ExploreProvider';
import { EVENT } from '@/utils/eventConstant';
import { BetType, useChain, usePrematchBets } from '@azuro-org/sdk';
import { MarketOutcome, type GameMarkets } from '@azuro-org/toolkit';
import { use, useCallback, useEffect } from 'react';
import { Address } from 'viem';
import { useAccount, useWatchContractEvent } from 'wagmi';
type MarketProps = {
  name: string;
  outcomes: MarketOutcome[];
  onSelectOutcome: (outcome: MarketOutcome) => void;
  checkIsBetPlaced: any;
};

const Market: React.FC<MarketProps> = ({
  name,
  outcomes,
  onSelectOutcome,
  checkIsBetPlaced
}) => {
  const conditionId = outcomes[0].conditionId;
  const { appChain, contracts } = useChain();

  useWatchContractEvent({
    address: contracts.prematchCore.address,
    abi: contracts.prematchCore.abi,
    eventName: 'NewBet',
    chainId: appChain.id,
    onLogs(logs) {
      const log = logs[0]!;
      console.log('logs', logs);
      // need to handle here
      if (conditionId === String(log.args.conditionId!)) {
        //refetch();
      }
    }
  });

  const { filteredBets, totalAmount, refetchBets } = useOrderBook({
    conditionId,
    outcomes
  });
  const { setBets, allBets } = use(ExploreContext);

  useAddEvent(EVENT.apolloGameMarkets, () => {
    refetchBets();
  });

  useEffect(() => {
    setBets((prev: any) => {
      return {
        ...prev,
        ...filteredBets
      };
    });
  }, [filteredBets]);

  return (
    <>
      <div className="bg-[#FFFFFF0D] p-4 rounded-xl">
        <div className="font-semibold text-base mb-4">
          {name}
          <span className="text-[12px] text-appGray-600 font-normal ml-2">
            {totalAmount > 0 && `$${totalAmount.toFixed(2)} Bet`}
          </span>
        </div>
        <div className="flex gap-6 flex-col sm:flex-row">
          {outcomes.map((outcome, index) => (
            <OutcomeButton
              index={index}
              key={outcome.outcomeId}
              text={outcome.selectionName}
              outcome={outcome}
              onSelectOutcome={() => onSelectOutcome(outcome)}
              isPlaced={checkIsBetPlaced(outcome)}
              totalBetsPlaced={
                allBets[outcome.outcomeId]?.length || 0
                // betsData?.bets.filter(
                // (i: any) => i.selections[0]._outcomeId === outcome.outcomeId
                // ).length
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};

type GameMarketsProps = {
  markets: GameMarkets;
  onSelectOutcome: (outcome: MarketOutcome) => void;
};

export function GameMarkets(props: GameMarketsProps) {
  const { address } = useAccount();
  const { bets, loading } = usePrematchBets({
    filter: {
      type: BetType.Accepted,
      bettor: address as Address
    }
  });

  const { markets } = props;

  const checkIsBetPlaced = useCallback(
    (outcome: MarketOutcome) => {
      if (bets.length === 0) return false;
      return bets.some(
        (bet) =>
          bet.outcomes[0].outcomeId === outcome.outcomeId &&
          bet.outcomes[0].conditionId === outcome.conditionId
      );
    },
    [bets]
  );

  return (
    <div className="max-w-[800px] mx-auto mt-12 space-y-6">
      {markets.map(({ name, outcomeRows }) => {
        return outcomeRows.map((outcomes) => (
          <Market
            key={`${name}-${outcomes[0].selectionName}`}
            name={name}
            outcomes={outcomes.map((outcome) => ({
              ...outcome,
              marketName: name
            }))}
            onSelectOutcome={props.onSelectOutcome}
            checkIsBetPlaced={checkIsBetPlaced}
          />
        ));
      })}
    </div>
  );
}
