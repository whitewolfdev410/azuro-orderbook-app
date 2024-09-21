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
  '28': BaseBall,
  '29': Boxing,
  '31': BasketBall,
  '32': IceHockey,
  '33': FootBall,
  '36': MMA,
  '40': Cricket,
  '44': AmericanFootball,
  '45': Tennis,
  '47': Cricket,
  '56': Politic,
  '58': Rugby,
  '59': Rugby,
  '1000': Dota2,
  '1002': LOL,
  '1061': CounterStrike,
};

const iconMappedBySlug: { [key: string]: React.FC<SportIconProps> } = {
  'american-football': AmericanFootball,
  basketball: BasketBall,
  baseBall: BaseBall,
  boxing: Boxing,
  cricket: Cricket,
  'counter-strike': CounterStrike,
  cs2: CounterStrike,
  'dota-2': Dota2,
  football: FootBall,
  'ice-hockey': IceHockey,
  lol: LOL,
  mma: MMA,
  politics: Politic,
  rugby: Rugby,
  tennis: Tennis,
};

export default function getIconComponent(key: string | number) {
  const iconMap = isFinite(+key) ? iconMappedById : iconMappedBySlug;
  return iconMap[key] || React.Fragment;
}
