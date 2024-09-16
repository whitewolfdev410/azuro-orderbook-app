import { Bet, BetType, SportHub } from '@azuro-org/sdk';
import { BetStatus, PrematchGraphGameStatus } from '@azuro-org/toolkit';
import { TGame } from './types';
export type TCategory = {
  name: SportHub;
  games?: TGame[];
  sports: TSport[];
  id: SportHub;
};

export type TSport = {
  countries: Array<{
    slug: string;
    name: string;
    turnover: string;
    leagues: Array<{
      slug: string;
      name: string;
      turnover: string;
      games: Array<{
        turnover: string;
        id: string;
        gameId: string;
        title?: string | null;
        startsAt: string;
        status: PrematchGraphGameStatus;

        sport: {
          sportId: string;
          slug: string;
          name: string;
        };
        league: {
          slug: string;
          name: string;
          country: {
            slug: string;
            name: string;
          };
        };
        participants: Array<{
          image?: string | null;
          name: string;
        }>;
      }>;
    }>;
  }>;
  slug: string;
  name: string;
  total: number;
  sportId: string;
  __typename?: SportHub;
};

// lose, cancelled => settled
// win not redeemed or is redeemable => unredeemed
// else => Active

export const returnTypeOfBet = (bet: Bet) => {
  if (bet.isWin && bet.isRedeemable && !bet.isRedeemed)
    return BetType.Unredeemed;
  if (bet.isLose || bet.isCanceled || bet.isRedeemed) return BetType.Settled;

  return BetType.Accepted;
};
