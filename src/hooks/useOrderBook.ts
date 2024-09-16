import { useApolloClients, Bet, BetOutcome } from '@azuro-org/sdk';
import { Selection } from '@azuro-org/toolkit';
import { useCallback, useEffect, useState } from 'react';
import { PrematchBetsDocument } from '@azuro-org/toolkit';

import { MarketOutcome } from '@azuro-org/toolkit';

type CustomSelections = Partial<Selection> & {
  outcomes?: MarketOutcome[];
};
export type OutComeData = {
  [key: string]: (Bet & BetOutcome)[];
};

export const useOrderBook = (selection: CustomSelections) => {
  const { conditionId, outcomes } = selection;
  const { prematchClient } = useApolloClients();

  const [allBets, setAllBets] = useState<Bet[] | any>([]),
    [filteredBets, setFilteredBets] = useState<OutComeData>({}),
    [totalAmount, setTotalAmount] = useState<number>(0),
    [gettingBets, setGettingBets] = useState<boolean>(false);

  const refetchBets = useCallback(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getBets(0));
      }, 2000);
    });
  }, []);

  const getBets = useCallback(
    async (_skip = 0) => {
      const first = 1000;
      const res = await prematchClient.query({
        query: PrematchBetsDocument,
        variables: {
          where: {
            and: [{ _conditions_: { conditionId } }]
          },
          first,
          skip: _skip
        },
        fetchPolicy: 'network-only'
      });
      if (res.data.bets?.length > 0) {
        const _allBets =
          _skip === 0 ? res.data.bets : [...allBets, ...res.data.bets];
        setAllBets(_allBets);
        if (res.data.bets?.length < first) {
          filterBets(_allBets);
          setGettingBets(false);
          return;
        }
        await getBets((_skip += first));
        return;
      }
      setGettingBets(false);
    },
    [conditionId]
  );

  useEffect(() => {
    setGettingBets(true);
    getBets();
  }, []);

  const filterBets = useCallback(
    (bets: (Bet & BetOutcome)[] | any) => {
      if (outcomes?.length! >= 2) {
        const firstOutcomes: Bet[] = [],
          secondOutcomes: Bet[] = [];

        let tempAmount = 0;
        for (let i = 0; i < bets.length; i++) {
          const betOId = bets[i].selections[0].outcome.outcomeId;

          // Calculate total amount
          tempAmount += +bets[i].amount;

          if (betOId === outcomes![0].outcomeId) {
            firstOutcomes.push(bets[i]);
          }
          if (betOId === outcomes![1].outcomeId) {
            secondOutcomes.push(bets[i]);
          }
        }

        setFilteredBets({
          [outcomes![0].outcomeId]: firstOutcomes,
          [outcomes![1].outcomeId]: secondOutcomes
        } as OutComeData);
        setTotalAmount(tempAmount);
      }
    },
    [outcomes]
  );

  return {
    filteredBets,
    allBets,
    totalAmount,
    isFetching: gettingBets,
    refetchBets
  };
};
