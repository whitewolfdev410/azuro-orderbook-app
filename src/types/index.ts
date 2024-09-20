import { SportHub } from '@azuro-org/sdk';
import type { GamesQuery, PrematchGraphGameStatus } from '@azuro-org/toolkit';

export type TGame = GamesQuery['games'][0];

export enum ECategories {
  Sport = 'Sport',
  ESport = 'ESport',
}

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

export type DefaultBetRanges = 'Single' | 0.1 | 0.5 | 1 | 5 | 10;
