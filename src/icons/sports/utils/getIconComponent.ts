import React from 'react';
import {
  AmericanFootball,
  BaseBall,
  BasketBall,
  Boxing,
  CounterStrike,
  Cricket,
  Dota2,
  FootBall,
  IceHockey,
  LOL,
  MMA,
  Politic,
  Rugby,
  Tennis,
} from '../icons';
import { SportIconProps } from '../props';

const iconMappedById: { [key: string]: React.FC<SportIconProps> } = {
  '33': FootBall,
  '45': Tennis,
  '31': BasketBall,
  '32': IceHockey,
  '1061': CounterStrike,
  '28': BaseBall,
  '29': Boxing,
  '58': Rugby,
  '59': Rugby,
  '1002': LOL,
  '1000': Dota2,
  '44': AmericanFootball,
  '47': Cricket,
  '40': Cricket,
  '36': MMA,
  '56': Politic,
};

const iconMappedBySlug: { [key: string]: React.FC<SportIconProps> } = {
  football: FootBall,
  tennis: Tennis,
  basketball: BasketBall,
  'ice-hockey': IceHockey,
  'counter-strike': CounterStrike,
  cs2: CounterStrike,
  baseBall: BaseBall,
  boxing: Boxing,
  rugby: Rugby,
  lol: LOL,
  'dota-2': Dota2,
  'american-football': AmericanFootball,
  cricket: Cricket,
  mma: MMA,
  politics: Politic,
};

export default function getIconComponent(key: string | number) {
  const iconMap = isFinite(+key) ? iconMappedById : iconMappedBySlug;
  return iconMap[key] || React.Fragment;
}
