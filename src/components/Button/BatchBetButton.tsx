'use client'
import {
  dispatchEvent,
  openBetSuccessNoti,
  showNotification,
} from '@/components/Noti'
import { ExploreContext } from '@/contexts'
import { EVENT, compareOutcome } from '@/utils'
import {
  BetslipItem,
  useBaseBetslip,
  useBetTokenBalance,
  useChain,
  useDetailedBetslip,
  useOdds,
  usePrepareBet,
} from '@azuro-org/sdk'
import clsx from 'clsx'
import { useContext, useEffect, useMemo } from 'react'
import type { Address } from 'viem'
import classes from './styles/BetButton.module.css'
import { useTheme } from '@/app/ThemeContext'

export type BetButtonProps = {
  totalBetAmount: number
  setIsLoading?: (isLoading: boolean) => void,
}

const BatchBetButton = (props: Readonly<BetButtonProps>) => {
  const { setIsLoading, totalBetAmount } = props
  const { appChain, isRightNetwork, betToken } = useChain()
  const { items, removeItem } = useBaseBetslip()

  // const { outcomeSelected, setOutcomeSelected } = useContext(ExploreContext)
  const { setOutcomeSelected } = useContext(ExploreContext)

  const {
    batchBetAmounts,
    odds,
    totalOdds,
    maxBet,
    minBet,
    selectedFreeBet,
    freeBets,
    statuses,
    disableReason,
    changeBetAmount,
    changeBatchBetAmount,
    changeBatch,
    selectFreeBet,
    isLiveBet,
    isBatch,
    isStatusesFetching,
    isOddsFetching,
    isFreeBetsFetching,
    isBetAllowed,
  } = useDetailedBetslip()

  const finalOdds = useMemo(() => {
    const newOdds: Record<string, number> = {};
    Object.keys(odds).forEach((key) => {
      newOdds[key] = odds[key] || 0;
    });
    return newOdds;
  }, [odds]);

  const { loading: isBalanceFetching, balance } = useBetTokenBalance()

  const betAmounts = useMemo(() => {
    const entries = items.map(item => {
      const key = `${item.conditionId}-${item.outcomeId}`
      return [key, batchBetAmounts[key]]
    })
    return Object.fromEntries(entries)
  }, [batchBetAmounts])

  const data = useMemo(
    () => ({
      betAmount: betAmounts,
      slippage: 10,
      affiliate: process.env.NEXT_PUBLIC_AFFILIATE_ADDRESS as Address,
      selections: items.map((item) => ({
        conditionId: item.conditionId,
        outcomeId: item.outcomeId,
        coreAddress: item.coreAddress,
      })),
      odds: finalOdds,
      totalOdds,
      onSuccess: () => {
        if (!items) return
        openBetSuccessNoti({
          sportId: 1,
          title1: "hi",
          title2: "sigh",
          title3: "bye",
          betNumber: "why"
        })
        dispatchEvent(EVENT.apolloBetslip, {})
        dispatchEvent(EVENT.apolloGameMarkets, {})
        setOutcomeSelected(null)
        items.map((item) => removeItem(item))
      },
      onError: () => {
        showNotification({
          status: 'error',
          title: 'Bet Failed',
          description:
            'Your bet has not been placed successfully. Please try again.',
        })
      },
    }),
    [batchBetAmounts, totalOdds, removeItem]
  )

  const {
    submit,
    approveTx,
    betTx,
    isRelayerFeeLoading,
    isAllowanceLoading,
    isApproveRequired,
  } = usePrepareBet(data)

  const isPending = useMemo(
    () => approveTx.isPending || betTx.isPending,
    [approveTx, betTx]
  )
  const isProcessing = useMemo(
    () => approveTx.isProcessing || betTx.isProcessing,
    [approveTx, betTx]
  )

  useEffect(() => {
    setIsLoading?.(isProcessing || isPending)
  }, [isProcessing, isPending, setIsLoading])

  const isEnoughBalance = useMemo(() => {
    if (isBalanceFetching || !+totalBetAmount) return true
    return +balance! > +totalBetAmount
  }, [isBalanceFetching, balance, totalBetAmount])

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
  )

  const isDisabled = useMemo(
    () =>
      isLoading || !isBetAllowed || !isEnoughBalance || Number(totalBetAmount) <= 0,
    [isLoading, isBetAllowed, isEnoughBalance, totalBetAmount]
  )

  const title = useMemo(() => {
    if (isPending) return 'Waiting for approval'
    if (isProcessing) return 'Processing...'
    if (isLoading) return 'Loading...'
    if (isApproveRequired) return 'Approve'
    return (Object.keys(batchBetAmounts).length > 1 ? 'Place Bets' : 'Place Bet')
  }, [isPending, isProcessing, isLoading, isApproveRequired])

  const {theme} = useTheme()

  if (!isRightNetwork) {
    return (
      <div className={clsx("mt-6 py-3.5 text-center rounded-2xl",
        "bg-gradient-to-r from-red-600 to-red-800"
      )}>
        Switch network to <b>{appChain.name}</b>
      </div>
    )
  }

  return (
    <div className="my-1">
      {!isEnoughBalance && (
        <div className="text-red-500 text-center font-semibold">
          Insufficient {betToken.symbol} balance
        </div>
      )}
      <button
        className={clsx(
          'w-full py-5 text-white font-semibold text-center rounded-xl transition',
          {
            [classes['bet-button-gradient']]: theme === 'dark',
            'opacity-50 cursor-not-allowed': isDisabled,
            'bg-gradient-to-l from-blue-500 to-blue-700 text-white': theme === 'light'
          }
        )}
        disabled={isDisabled}
        onClick={submit}
      >
        {title}
      </button>
    </div>
  )
}

export default BatchBetButton
