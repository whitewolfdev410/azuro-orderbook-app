'use client';
import {
  dispatchEvent,
  openBetSuccessNoti,
  showNotification,
} from '@/components/Noti';
import { ExploreContext } from '@/contexts';
import { EVENT, compareOutcome } from '@/utils';
import {
  useBaseBetslip,
  useBetTokenBalance,
  useChain,
  useDetailedBetslip,
  usePrepareBet,
} from '@azuro-org/sdk';
import clsx from 'clsx';
import { useContext, useEffect, useMemo } from 'react';
import type { Address } from 'viem';
import classes from './styles/BetButton.module.css';

export type BetButtonProps = {
  setIsLoading?: (isLoading: boolean) => void;
};

const BetButton = (props: Readonly<BetButtonProps>) => {
  const { setIsLoading } = props;
  const { appChain, isRightNetwork } = useChain();
  const { items, removeItem } = useBaseBetslip();
  const { outcomeSelected, setOutcomeSelected } = useContext(ExploreContext);
  const {
    batchBetAmounts,
    odds,
    isStatusesFetching,
    isOddsFetching,
    isBetAllowed,
  } = useDetailedBetslip();
  const { loading: isBalanceFetching, balance } = useBetTokenBalance();
  const { conditionId, outcomeId } = outcomeSelected ?? {};

  const key = useMemo(
    () => `${conditionId}-${outcomeId}`,
    [conditionId, outcomeId]
  );

  const betAmount = useMemo(
    () => batchBetAmounts[key] || '0',
    [batchBetAmounts, key]
  );

  const selection = useMemo(
    () =>
      outcomeSelected &&
      items.find((item) => compareOutcome(item, outcomeSelected)),
    [items, outcomeSelected]
  );

  const totalOdds = useMemo(() => odds[key] || 0, [odds, key]);

  const data = useMemo(
    () => ({
      betAmount,
      slippage: 10,
      affiliate: process.env.NEXT_PUBLIC_AFFILIATE_ADDRESS as Address,
      selections: [selection!],
      odds: {
        [key]: totalOdds,
      },
      totalOdds,
      onSuccess: () => {
        if (!selection) return;
        openBetSuccessNoti({
          sportId: selection.game.sportId,
          title1: selection.marketName,
          title2: selection.selectionName,
          title3: selection.game.title,
          betNumber: betAmount,
        });
        dispatchEvent(EVENT.apolloBetslip, {});
        dispatchEvent(EVENT.apolloGameMarkets, {});
        setOutcomeSelected(null);
        removeItem(selection);
      },
      onError: () => {
        showNotification({
          status: 'error',
          title: 'Bet Failed',
          description:
            'Your bet has not been placed successfully. Please try again.',
        });
      },
    }),
    [betAmount, totalOdds, selection, key, removeItem, setOutcomeSelected]
  );

  const {
    submit,
    approveTx,
    betTx,
    isRelayerFeeLoading,
    isAllowanceLoading,
    isApproveRequired,
  } = usePrepareBet(data);

  const isPending = useMemo(
    () => approveTx.isPending || betTx.isPending,
    [approveTx, betTx]
  );
  const isProcessing = useMemo(
    () => approveTx.isProcessing || betTx.isProcessing,
    [approveTx, betTx]
  );

  useEffect(() => {
    setIsLoading?.(isProcessing || isPending);
  }, [isProcessing, isPending, setIsLoading]);

  const isEnoughBalance = useMemo(() => {
    if (isBalanceFetching || !+betAmount) return true;
    return +balance! > +betAmount;
  }, [isBalanceFetching, balance, betAmount]);

  const isLoading = useMemo(
    () =>
      isOddsFetching ||
      isBalanceFetching ||
      isStatusesFetching ||
      isAllowanceLoading ||
      isPending ||
      isProcessing ||
      isRelayerFeeLoading,
    [
      isOddsFetching,
      isBalanceFetching,
      isStatusesFetching,
      isAllowanceLoading,
      isPending,
      isProcessing,
      isRelayerFeeLoading,
    ]
  );

  const isDisabled = useMemo(
    () =>
      isLoading || !isBetAllowed || !isEnoughBalance || Number(betAmount) <= 0,
    [isLoading, isBetAllowed, isEnoughBalance, betAmount]
  );

  const title = useMemo(() => {
    if (isPending) return 'Waiting for approval';
    if (isProcessing) return 'Processing...';
    if (isLoading) return 'Loading...';
    if (isApproveRequired) return 'Approve';
    return 'Place Bet';
  }, [isPending, isProcessing, isLoading, isApproveRequired]);

  if (!isRightNetwork) {
    return (
      <div className="mt-6 py-3.5 text-center bg-red-200 rounded-2xl">
        Switch network to <b>{appChain.name}</b> in your wallet
      </div>
    );
  }

  return (
    <div className="mt-6">
      {!isEnoughBalance && (
        <div className="mb-1 text-red-500 text-center font-semibold">
          Not enough balance.
        </div>
      )}
      <button
        className={clsx(
          'w-full py-5 text-white font-semibold text-center rounded-xl transition',
          {
            [classes['bet-button-gradient']]: true,
            'opacity-50 cursor-not-allowed': isDisabled,
          }
        )}
        disabled={isDisabled}
        onClick={submit}
      >
        {title}
      </button>
    </div>
  );
};

export default BetButton;
