import type { Bet, BetOutcome } from '@azuro-org/sdk';
import { useApolloClients } from '@azuro-org/sdk';
import type { MarketOutcome, Selection } from '@azuro-org/toolkit';
import { PrematchBetsDocument } from '@azuro-org/toolkit';
import { useCallback, useEffect, useState } from 'react';

export type CustomSelections = Partial<Selection> & {
  outcomes?: MarketOutcome[];
};
export type OutComeData = {
  [key: string]: (Bet & BetOutcome)[];
};

const useOrderBook = (selection: CustomSelections) => {
  const { conditionId, outcomes } = selection;
  const { prematchClient } = useApolloClients();

  const [allBets, setAllBets] = useState<Bet[]>([]),
    [filteredBets, setFilteredBets] = useState<OutComeData>({}),
    [totalAmount, setTotalAmount] = useState<number>(0),
    [gettingBets, setGettingBets] = useState<boolean>(false);

  const filterBets = useCallback(
    (
      bets: (Bet &
        BetOutcome & {
          selections: { outcome: { outcomeId: string } };
        })[]
    ) => {
      if (outcomes?.length! >= 2) {
        const firstOutcomes: Bet[] = [],
          secondOutcomes: Bet[] = [];

        let tempAmount = 0;
        for (const element of bets) {
          const betOId = element.selections[0].outcome.outcomeId;

          tempAmount += +element.amount;

          if (betOId === outcomes![0].outcomeId) {
            firstOutcomes.push(element);
          }

          if (betOId === outcomes![1].outcomeId) {
            secondOutcomes.push(element);
          }
        }

        setFilteredBets({
          [outcomes![0].outcomeId]: firstOutcomes,
          [outcomes![1].outcomeId]: secondOutcomes,
        } as OutComeData);
        setTotalAmount(tempAmount);
      }
    },
    [outcomes]
  );

  const getBets = useCallback(
    async (_skip = 0) => {
      const first = 1000;
      const res = await prematchClient.query({
        query: PrematchBetsDocument,
        variables: {
          where: {
            and: [{ _conditions_: { conditionId } }],
          },
          first,
          skip: _skip,
        },
        fetchPolicy: 'network-only',
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
        _skip += first;
        await getBets(_skip);
        return;
      }
      setGettingBets(false);
    },
    [allBets, conditionId, filterBets, prematchClient]
  );

  const refetchBets = useCallback(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getBets(0));
      }, 2000);
    });
  }, [getBets]);

  useEffect(() => {
    setGettingBets(true);
    getBets();
  }, []);

  return {
    filteredBets,
    allBets,
    totalAmount,
    isFetching: gettingBets,
    refetchBets,
  };
};

export default useOrderBook;
