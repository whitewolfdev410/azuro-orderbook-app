import AmericanFootball from './AmericanFootball';
import BaseBall from './BaseBall';
import BasketBall from './BasketBall';
import Boxing from './Boxing';
import CounterStrike from './CounterStrike';
import Cricket from './Cricket';
import Dota2 from './Dota2';
import FootBall from './FootBall';
import IceHockey from './IceHockey';
import LOL from './LOL';
import MMA from './MMA';
import Politic from './Politic';
import Rugby from './Rugby';
import Tennis from './Tennis';

export const IconGradient1 = () => (
  <defs>
    <linearGradient id="football-gradient" x2="0%" y2="50%" x1="100%" y1="50%">
      <stop offset="12.88%" stopColor="#FF65A6" />
      <stop offset="50.05%" stopColor="#B37ED3" />
      <stop offset="88.76%" stopColor="#5E64EB" />
    </linearGradient>
  </defs>
);

export const getSportIconColor = (gradient: string) => {
  if (gradient) {
    return gradient;
  }
  return 'currentColor';
};

const sportIcons: { [key: string]: React.FC<any> } = {
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
  '36': MMA,
  '56': Politic
  // Add other mappings as needed
};

const sportSlugIcons: { [key: string]: React.FC<any> } = {
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
  politics: Politic

  // Add other mappings as needed
};

const EmptyIcon: React.FC = () => <div></div>;

const getSportIcon = (key: string): React.FC<any> => {
  const iconMap = isFinite(+key) ? sportIcons : sportSlugIcons;
  return iconMap[key] || EmptyIcon;
};

const SportIcon = (props: any) => {
  const Icon = getSportIcon(props.sportId);

  const Gradient = <IconGradient1 />;

  return <Icon {...props}>{Gradient}</Icon>;
};

export default SportIcon;
