/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import {
  useBaseBetslip,
  useBetTokenBalance,
  useChain,
  useDetailedBetslip,
  usePrepareBet
} from '@azuro-org/sdk';
import cx from 'clsx';
import type { Address } from 'viem';
import classes from './BetButton.module.css';
import { useEffect } from 'react';
import { openBetSuccessNoti } from './Noti/BetSuccessNoti';

import { useContext } from 'react';
import { ExploreContext } from '@/providers/ExploreProvider';
import compareOutcome from '@/utils/compareOutcome';
import { dispatchEvent, showNotification } from './Noti/Notification';
import { EVENT } from '@/utils/eventConstant';
type Props = {
  setIsLoading?: any;
};

export const BetButton = (props: Props) => {
  const { setIsLoading } = props;
  const { appChain, isRightNetwork } = useChain();
  const { items, removeItem } = useBaseBetslip();
  const { outcomeSelected, setOutcomeSelected } = useContext(ExploreContext);
  const {
    batchBetAmounts,
    odds,
    isStatusesFetching,
    isOddsFetching,
    isBetAllowed
  } = useDetailedBetslip();
  const { loading: isBalanceFetching, balance } = useBetTokenBalance();
  const { conditionId, outcomeId } = outcomeSelected || {};
  if (!outcomeSelected) return null;
  const key = `${conditionId}-${outcomeId}`;

  const betAmount = batchBetAmounts[key] || '0';
  const selection = items.find((item) => compareOutcome(item, outcomeSelected));
  const totalOdds = odds[key] || 0;
  if (!selection) return null;
  const data = {
    betAmount,
    slippage: 10,
    affiliate: process.env.NEXT_PUBLIC_AFFILIATE_ADDRESS as Address,
    selections: [selection],
    odds: {
      [key]: totalOdds
    },
    totalOdds,
    onSuccess: () => {
      openBetSuccessNoti({
        sportId: selection.game.sportId,
        title1: selection.marketName,
        title2: selection.selectionName,
        title3: selection.game.title,
        betNumber: betAmount
      });
      dispatchEvent(EVENT.apolloBetslip, {});
      dispatchEvent(EVENT.apolloGameMarkets, {});
      setOutcomeSelected(null);
      removeItem(selection);
      // clear();
      // removeItem()
    },
    onError: (err: any) => {
      showNotification({
        status: 'error',
        title: 'Bet Failed',
        description:
          'Your bet has not been placed successfully. Please try again.'
      });
    }
  };
  const {
    submit,
    approveTx,
    betTx,
    isRelayerFeeLoading,
    isAllowanceLoading,
    isApproveRequired
  } = usePrepareBet(data);

  const isPending = approveTx.isPending || betTx.isPending;
  const isProcessing = approveTx.isProcessing || betTx.isProcessing;

  useEffect(() => {
    if (setIsLoading) {
      if (isProcessing || isPending) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    }
  }, [isProcessing, isPending, setIsLoading]);

  if (!isRightNetwork) {
    return (
      <div className="mt-6 py-3.5 text-center bg-red-200 rounded-2xl">
        Switch network to <b>{appChain.name}</b> in your wallet
      </div>
    );
  }

  const isEnoughBalance =
    isBalanceFetching || !Boolean(+betAmount)
      ? true
      : Boolean(+balance! > +betAmount);

  const isLoading =
    isOddsFetching ||
    isBalanceFetching ||
    isStatusesFetching ||
    isAllowanceLoading ||
    isPending ||
    isProcessing ||
    isRelayerFeeLoading;

  const isDisabled =
    isLoading || !isBetAllowed || !isEnoughBalance || Number(betAmount) <= 0;

  let title;

  if (isPending) {
    title = 'Waiting for approval';
  } else if (isProcessing) {
    title = 'Processing...';
  } else if (isLoading) {
    title = 'Loading...';
  } else if (isApproveRequired) {
    title = 'Approve';
  } else {
    title = 'Place Bet';
  }

  return (
    <div className="mt-6">
      {!isEnoughBalance && (
        <div className="mb-1 text-red-500 text-center font-semibold">
          Not enough balance.
        </div>
      )}
      <button
        className={cx(
          'w-full py-5 text-white font-semibold text-center rounded-xl transition',
          {
            [classes['bet-button-gradient']]: true,
            // 'bg-blue-500 hover:bg-blue-600 transition shadow-md': !isDisabled,
            'opacity-50 cursor-not-allowed': isDisabled
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
