import { GamesQuery } from '@azuro-org/toolkit';
export type TGame = GamesQuery['games'][0];
export enum ECategories {
  Sport = 'Sport',
  ESport = 'ESport'
}

export type TTabItem = {
  name: string;
  count?: number;
  type?: string;
};

export type DefaultBetRanges = 'Single' | 0.1 | 0.5 | 1 | 5 | 10;
