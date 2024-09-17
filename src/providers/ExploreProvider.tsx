/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { OutComeData } from '@/hooks';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { groupBetByBetRange, sortBet } from '@/utils/bet';
import { TCategory, TSport } from '@/utils/game';
import { DefaultBetRanges, TGame } from '@/utils/types';
import { SportHub, useGames, useSports, UseSportsProps } from '@azuro-org/sdk';
import { useRouter } from 'next/navigation';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react';

type Props = {
  children: React.ReactNode;
};

type ExploreContextValue = {
  loading: boolean;
  gameLoading: boolean;
  games: TGame[];
  sports: TSport[];
  selectedSportHub: string;
  selectedSport: string;
  categories: TCategory[];
  totalGames: number;
  searching: string;
  bets: OutComeData;
  allBets: OutComeData;
  betRange: DefaultBetRanges;
  searchGame: (value: string) => void;
  setSelectedSportHub: Dispatch<SetStateAction<string>>;
  setSelectedSport: Dispatch<SetStateAction<string>>;
  setBets: Dispatch<SetStateAction<OutComeData>>;
  setBetRange: Dispatch<SetStateAction<DefaultBetRanges>>;
  filterSports: (args: Record<string, any>) => void;
  filterGames: (args: Record<string, any>) => void;
  clearFilterSports: () => void;
  clearFilterGames: () => void;
  outcomeSelected: any;
  setOutcomeSelected: Dispatch<SetStateAction<any>>;
  resetGame: () => void;
  removeGameParams: (key: string) => void;
};

export const ExploreContext = createContext<ExploreContextValue>({
  loading: false,
  gameLoading: false,
  games: [],
  sports: [],
  selectedSportHub: '',
  selectedSport: '',
  categories: [],
  totalGames: 0,
  searching: '',
  bets: {},
  allBets: {},
  betRange: 'Single',
  searchGame: () => null,
  filterSports: () => null,
  setSelectedSportHub: () => null,
  setSelectedSport: () => null,
  setBets: () => null,
  setBetRange: () => null,
  filterGames: () => null,
  clearFilterSports: () => null,
  clearFilterGames: () => null,
  outcomeSelected: null,
  setOutcomeSelected: () => null,
  resetGame: () => null,
  removeGameParams: () => null
});

export const ExploreProvider: React.FC<Props> = ({ children }) => {
  const [params, setParams] = useState<UseSportsProps>({
    filter: {
      sportHub: SportHub.Sports
    }
  });
  const [gameParams, setGameParams] = useState<UseSportsProps>({
    filter: {
      sportHub: SportHub.Sports
    }
  });
  const [sports, setSports] = useState<Partial<TSport[]>>([]);
  const { games: _games, loading: gameLoading } = useGames(gameParams);
  const { sports: _sports, loading } = useSports(params);
  const [selectedSportHub, setSelectedSportHub] = useState<string>(
    SportHub.Sports
  );
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [totalGames, setTotalGames] = useState<number>(-1);
  const [games, setGames] = useState<TGame[]>([]);
  const [allGames, setAllGames] = useState<TGame[]>([]);
  const [searching, setSearching] = useState<string>('');
  const [outcomeSelected, setOutcomeSelected] = useState<any>(null);
  const [bets, setBets] = useState<OutComeData>({});
  const [groupedBets, setGroupedBets] = useState<OutComeData>({});
  const { setValue: setLocalBetRange, value: localBetRange } =
    useLocalStorage<DefaultBetRanges>('betRange', 'Single');
  const [betRange, setBetRange] = useState<DefaultBetRanges>(localBetRange);

  const router = useRouter();

  const redirect = () => {
    if (window.location.pathname !== '/') {
      router.push('/');
      return;
    }
  };

  const cleanup = () => {
    setGames([]);
    setAllGames([]);
    setSports([]);
  };

  const filterSports = useCallback((args: Record<string, any>): void => {
    cleanup();
    redirect();
    setParams((prev) => ({
      filter: {
        ...prev.filter,
        ...args
      }
    }));
  }, []);

  const filterGames = useCallback(
    (args: Record<string, any>): void => {
      redirect();
      if (searching !== '' && totalGames === -1) return;
      setGameParams((prev) => ({
        filter: {
          ...prev.filter,
          ...args
        }
      }));
    },
    [searching]
  );

  const clearFilterSports = useCallback(() => {
    setParams({
      filter: {
        sportHub: SportHub.Sports
      }
    });
  }, []);

  const clearFilterGames = useCallback(() => {
    setGameParams({
      filter: {
        sportHub: SportHub.Sports
      }
    });
  }, []);

  useEffect(() => {
    setLocalBetRange(betRange);
  }, [betRange]);

  useEffect(() => {
    const result = groupBetByBetRange({ ...bets }, betRange);
    setGroupedBets(result as OutComeData);
  }, [betRange, bets]);

  useEffect(() => {
    const _allGames = searching ? games : allGames;
    const tempSportsList: TSport[] = [];

    const _newSports = [
      {
        name: 'All',
        slug: 'all',
        countries: [],
        sportId: 'all',
        total: 0
      },
      ..._sports
    ];

    if (!_sports || _games?.length === 0) {
      setSports(_newSports as TSport[]);
      return;
    }

    _newSports.forEach((sport) => {
      const total =
        sport?.slug === 'all'
          ? _allGames?.length
          : _allGames?.filter((game) => game.sport.slug === sport?.slug)
              ?.length || 0;

      tempSportsList.push({
        name: sport?.name!,
        sportId:
          sport.slug === 'all'
            ? sport.slug
            : sport?.countries?.[0]?.leagues?.[0]?.games?.[0]?.sport?.sportId ||
              '', //sport.countries[0]?.leagues[0]?.games[0]?.sport?.sportId
        total,
        countries: [],
        slug: sport?.slug!
      });
    });

    if (searching !== '') {
      setSports(tempSportsList.filter(({ total }) => total > 0));
      return;
    }
    setSports(tempSportsList);
  }, [loading, games, params, searching]);

  useEffect(() => {
    if (gameLoading) return;
    if (totalGames === -1 && _games) {
      setTotalGames(_games?.length || 0);
      setAllGames(_games as TGame[]);
    }
    if (searching) {
      searchGame(searching);
      return;
    }
    setGames(_games as TGame[]);
  }, [_games, totalGames, searching]);

  const searchGame = useCallback(
    (value: string) => {
      redirect();
      setSearching(value);
      if (value) {
        const tempGames = _games?.filter((game: TGame) => {
          const regex = new RegExp(value, 'i');
          return regex.test(game?.title!);
        });
        setGames(tempGames as TGame[]);
      } else {
        setGames(_games as TGame[]);
        setSearching('');
      }
    },
    [_games, searching]
  );

  const resetGame = () => {
    setTotalGames(-1);
  };

  const removeGameParams = (key: any) => {
    if (!gameParams?.filter) return;

    if (key === 'filter') {
      setGameParams({ filter: {} });
      return;
    }

    delete gameParams.filter[key];

    setGameParams(gameParams);
  };

  return (
    <ExploreContext.Provider
      value={{
        categories: [
          {
            name: SportHub.Esports,
            sports: [],
            id: SportHub.Esports
          },
          {
            name: SportHub.Sports,
            sports: [],
            id: SportHub.Sports
          }
        ],
        games:
          searching !== ''
            ? selectedSport !== 'all'
              ? games?.filter((game) => game.sport.sportId === selectedSport)
              : games
            : (games as TGame[]),
        sports: sports as unknown as TSport[],
        filterSports,
        clearFilterSports,
        clearFilterGames,
        selectedSportHub,
        setSelectedSportHub,
        selectedSport,
        setSelectedSport,
        setBets,
        filterGames,
        loading,
        gameLoading,
        totalGames,
        searchGame,
        bets:
          Object.keys(groupedBets)?.length > 0 ? groupedBets : sortBet(bets),
        allBets: bets,
        betRange,
        setBetRange,
        outcomeSelected,
        setOutcomeSelected,
        searching,
        resetGame,
        removeGameParams
      }}
    >
      {children}
    </ExploreContext.Provider>
  );
};
