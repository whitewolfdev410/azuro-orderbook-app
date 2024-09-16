import { useChain } from '@azuro-org/sdk';
import { useMemo } from 'react';
import { useConfig, useReadContract, useWatchContractEvent } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { formatUnits } from 'viem';
export const BETS_AMOUNT = [1, 10, 1000, 5000, 10000, 20000, 50000, 100000];
export const BETS_AMOUNT_DECIMALS = '1.00';
//FIXED
export const useOrderBookV2 = (selection: any) => {
  const { conditionId, outcomeId } = selection;

  const { appChain, contracts, betToken } = useChain();
  const config = useConfig();

  const { data: outcomeIndex, isFetching: isOutcomeIndexFetching } =
    useReadContract({
      address: contracts.prematchCore.address,
      abi: contracts.prematchCore.abi,
      functionName: 'getOutcomeIndex',
      chainId: appChain.id,
      args: [BigInt(conditionId), BigInt(outcomeId)],
      query: {
        refetchOnWindowFocus: false
      }
    });

  const {
    data: condition,
    isFetching: isConditionFetching,
    refetch: refetchCondition
  } = useReadContract({
    address: contracts.prematchCore.address,
    abi: contracts.prematchCore.abi,
    functionName: 'getCondition',
    chainId: appChain.id,
    args: [BigInt(conditionId)],
    query: {
      refetchOnWindowFocus: false
    }
  });

  useWatchContractEvent({
    address: contracts.prematchCore.address,
    abi: contracts.prematchCore.abi,
    eventName: 'NewBet',
    chainId: appChain.id,
    onLogs(logs) {
      const log = logs[0]!;

      if (conditionId === String(log.args.conditionId!)) {
        refetchCondition();
      }
    }
  });

  const outcomeLiquidity = useMemo(() => {
    if (
      typeof outcomeIndex === 'undefined' ||
      typeof condition === 'undefined'
    ) {
      return undefined;
    }

    return condition.virtualFunds[Number(outcomeIndex)];
  }, [outcomeIndex, condition]);

  const createOrderBook = async () => {
    const result: any[] = [];
    //use promise.all
    const promise: any = [];
    try {
      for (let step = 0; step < BETS_AMOUNT.length; step++) {
        const rawBetAmount =
          BigInt(BETS_AMOUNT[step]) * BigInt(10 ** betToken.decimals);
        // const rawBetAmount = outcomeLiquidity! / BigInt(step);
        promise.push(
          readContract(config, {
            address: contracts.prematchCore.address,
            abi: contracts.prematchCore.abi,
            chainId: appChain.id,
            functionName: 'calcOdds',
            args: [BigInt(conditionId), rawBetAmount, BigInt(outcomeId)]
          })
        );
      }
      const odds = await Promise.all(promise);
      odds.forEach((odd: any, index: number) => {
        const rawBetAmount =
          BigInt(BETS_AMOUNT[index]) * BigInt(10 ** betToken.decimals);
        result.push({
          betAmount: Number(
            formatUnits(rawBetAmount, betToken.decimals)
          ).toFixed(2),
          odds: formatUnits(odd, 12)
        });
      });
    } catch (e: any) {
      console.log(e);
      return [];
    }
    return result;
  };

  const { data, isFetching } = useQuery({
    queryKey: ['order-book', conditionId, outcomeId, String(outcomeLiquidity)],
    queryFn: createOrderBook,
    refetchOnWindowFocus: false,
    enabled: Boolean(outcomeLiquidity)
  });
  return {
    data,
    isFetching: isFetching || isOutcomeIndexFetching || isConditionFetching
  };
};
