import { useActiveMarkets as useMarkets } from '@azuro-org/sdk'
import { GameStatus } from '@azuro-org/toolkit'
import { useMemo } from 'react'

export type UseGameMarketsProps = { gameId: string; gameStatus: GameStatus }

const useGameMarkets = ({ gameId, gameStatus }: UseGameMarketsProps) => {
  const { loading, markets } = useMarkets({
    gameId,
    gameStatus,
  })

  const filteredMarkets = useMemo(() => {
    if (!markets?.length) {
      return []
    }

    return markets.filter((market) => {
      const [marketId] = market.marketKey.split('-')
      return market.outcomeRows[0].length === 2 && marketId !== '3'
    })
  }, [markets])

  return {
    markets: filteredMarkets,
    loading,
  }
}

export default useGameMarkets
