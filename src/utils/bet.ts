import type { OutComeData } from '@/hooks';
import type { DefaultBetRanges } from '@/types';
import { formatOdds } from '@/utils';
import type { Bet, BetOutcome } from '@azuro-org/sdk';

export const groupBetByBetRange = (
  bets: OutComeData,
  rangeArg: DefaultBetRanges
): OutComeData | null => {
  const result: OutComeData = {};

  bets = sortBet(bets);

  if (rangeArg === 'Single') {
    return bets;
  }

  const range = Number(rangeArg);

  Object.keys(bets).forEach((key) => {
    const betsByOutcome = bets[key];
    const groupedData: Record<string, (Bet & BetOutcome)[]> = groupData(
      betsByOutcome,
      range
    );

    Object.keys(groupedData).forEach((rangeKey) => {
      result[key] = result[key] || [];
      result[key].push({
        ...groupedData[rangeKey][0],
        amount: groupedData[rangeKey].reduce(
          (total, bet) => total + +bet.amount,
          0
        ),
        odds: groupedData[rangeKey][0].odds,
        calcOdds: rangeKey,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });
  });
  return result;
};

export const sortBet = (bets: OutComeData): OutComeData => {
  const result = {};

  Object.keys(bets).forEach((key) => {
    result[key] = bets[key]
      ? bets[key].toSorted((a, b) => +b.odds - +a.odds)
      : [];
  });

  return result;
};

export const oddsToPercent = (odds: number): number => {
  return +((1 / odds) * 100).toFixed(2);
};

export const groupData = (data: (Bet & BetOutcome)[], step: number) => {
  const groups: Record<string, (Bet & BetOutcome)[]> = {};

  data.forEach((item) => {
    const percentage = formatOdds(item.odds);
    const groupKey = (Math.ceil(percentage / step) * step).toFixed(2);

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(item);
  });

  return groups;
};
