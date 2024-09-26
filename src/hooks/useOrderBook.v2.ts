import { BETS_AMOUNT } from '@/constants'
import { useChain } from '@azuro-org/sdk'
import { useQuery } from '@tanstack/react-query'
import { readContract } from '@wagmi/core'
import { useMemo } from 'react'
import { formatUnits } from 'viem'
import { useConfig, useReadContract, useWatchContractEvent } from 'wagmi'

export type Selection = {
  conditionId: string
  outcomeId: string
}

const useOrderBookV2 = (selection: Selection) => {
  const { conditionId, outcomeId } = selection

  const { appChain, contracts, betToken } = useChain()
  const config = useConfig()

  const { data: outcomeIndex, isFetching: isOutcomeIndexFetching } =
    useReadContract({
      address: contracts.prematchCore.address,
      abi: contracts.prematchCore.abi,
      functionName: 'getOutcomeIndex',
      chainId: appChain.id,
      args: [BigInt(conditionId), BigInt(outcomeId)],
      query: {
        refetchOnWindowFocus: false,
      },
    })

  const {
    data: condition,
    isFetching: isConditionFetching,
    refetch: refetchCondition,
  } = useReadContract({
    address: contracts.prematchCore.address,
    abi: contracts.prematchCore.abi,
    functionName: 'getCondition',
    chainId: appChain.id,
    args: [BigInt(conditionId)],
    query: {
      refetchOnWindowFocus: false,
    },
  })

  useWatchContractEvent({
    address: contracts.prematchCore.address,
    abi: contracts.prematchCore.abi,
    eventName: 'NewBet',
    chainId: appChain.id,
    onLogs(logs) {
      const log = logs[0]
      if (conditionId === String(log.args.conditionId!)) {
        refetchCondition()
      }
    },
  })

  const outcomeLiquidity = useMemo(() => {
    if (
      typeof outcomeIndex === 'undefined' ||
      typeof condition === 'undefined'
    ) {
      return undefined
    }

    return condition.virtualFunds[Number(outcomeIndex)]
  }, [outcomeIndex, condition])

  const createOrderBook = async () => {
    type Result = {
      betAmount: string
      odds: string
    }
    const result: Result[] = []
    const promise: Promise<bigint>[] = []
    try {
      for (const element of BETS_AMOUNT) {
        const rawBetAmount = BigInt(element) * BigInt(10 ** betToken.decimals)
        promise.push(
          readContract(config, {
            address: contracts.prematchCore.address,
            abi: contracts.prematchCore.abi,
            chainId: appChain.id,
            functionName: 'calcOdds',
            args: [BigInt(conditionId), rawBetAmount, BigInt(outcomeId)],
          })
        )
      }
      const odds = await Promise.all(promise)
      odds.forEach((odd, index: number) => {
        const rawBetAmount =
          BigInt(BETS_AMOUNT[index]) * BigInt(10 ** betToken.decimals)
        result.push({
          betAmount: Number(
            formatUnits(rawBetAmount, betToken.decimals)
          ).toFixed(2),
          odds: formatUnits(odd, 12),
        })
      })
    } catch (e: unknown) {
      console.log(e)
      return []
    }

    return result
  }

  const { data, isFetching } = useQuery({
    queryKey: ['order-book', conditionId, outcomeId, String(outcomeLiquidity)],
    queryFn: createOrderBook,
    refetchOnWindowFocus: false,
    enabled: Boolean(outcomeLiquidity),
  })
  return {
    data,
    isFetching: isFetching || isOutcomeIndexFetching || isConditionFetching,
  }
}

export default useOrderBookV2
