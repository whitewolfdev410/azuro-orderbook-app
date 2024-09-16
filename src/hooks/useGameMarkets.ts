import { useActiveMarkets as useMarkets } from '@azuro-org/sdk';
import { useMemo } from 'react';

type Props = { gameId: string; gameStatus: any };

export const useGameMarkets = ({ gameId, gameStatus }: Props) => {
  const { loading, markets } = useMarkets({
    gameId,
    gameStatus
  });

  const filteredMarkets = useMemo(() => {
    if (!markets?.length) {
      return [];
    }

    return markets.filter((market) => {
      const [marketId] = market.marketKey.split('-');
      return market.outcomeRows[0].length === 2 && marketId !== '3';
    });
  }, [markets]);

  return {
    markets: filteredMarkets,
    loading
  };
};
