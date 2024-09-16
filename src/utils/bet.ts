import { OutComeData } from '@/hooks';
import { Bet, BetOutcome } from '@azuro-org/sdk';
import { DefaultBetRanges } from '@/utils/types';
import { forma } from 'viem/chains';
import { formatOdds } from '@/helpers/formatOdds';

export const groupBetByBetRange = (
  bets: OutComeData,
  rangeArg: DefaultBetRanges
): OutComeData | null => {
  let result: OutComeData = {};

  bets = sortBet(bets);

  if (rangeArg === 'Single') {
    return bets;
  }

  const range = +rangeArg as number;
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
        calcOdds: rangeKey
      } as any);
    });
  });
  return result;
};

export const sortBet = (bets: OutComeData): OutComeData => {
  const result = {};

  Object.keys(bets).forEach((key) => {
    result[key] = bets[key] ? bets[key].sort((a, b) => +b.odds - +a.odds) : [];
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
