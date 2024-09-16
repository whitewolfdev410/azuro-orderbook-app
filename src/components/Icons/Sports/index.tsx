import AmericanFootball from './AmericanFootball';
import Boxing from './Boxing';
import Cricket from './Cricket';
import FootBall from './FootBall';
import BasketBall from './BasketBall';
import IceHockey from './IceHockey';
import Tennis from './Tennis';
import BaseBall from './BaseBall';
import MMA from './MMA';
import Rugby from './Rugby';
import CounterStrike from './CounterStrike';
import LOL from './LOL';
import Dota2 from './Dota2';
import Politic from './Politic';
// Import other icons as needed

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
  '31': BasketBall, // Assuming you have a Basketball component
  '32': IceHockey,
  '1061': CounterStrike, // Assuming you have a CounterStrike component
  '28': BaseBall, // Assuming you have a Baseball component
  '29': Boxing,
  '58': Rugby, // Assuming you have a Rugby component
  '59': Rugby,
  '1002': LOL, // Assuming you have a LeagueOfLegends component
  '1000': Dota2,
  '44': AmericanFootball,
  '47': Cricket,
  '36': MMA, // Assuming you have an MMA component
  '56': Politic // Assuming you have a Politics component
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
