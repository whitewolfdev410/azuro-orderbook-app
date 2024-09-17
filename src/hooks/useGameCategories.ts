'use client';
import { TSport } from '@/utils/game';
import { SportHub, useGames } from '@azuro-org/sdk';
import { useEffect, useState } from 'react';
import { ECategories, TGame } from '../utils/types';
const ALL = 'all';
export const useGameCategories = () => {
  const [sports, setSports] = useState<TGame[]>([]);
  const [esports, setEsports] = useState<TGame[]>([]);
  const [renderGames, setRenderGames] = useState<TGame[]>([]);
  const [sportsList, setSportsList] = useState<TSport[]>([]);
  const [sportSelected, setSportSelected] = useState<string>(ALL);
  const { loading, games = [] } = useGames();
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (loading) {
      return;
    }
    if (games.length) {
      const sports = games.filter(
        (game: TGame) => game.sport.__typename === ECategories.Sport
      );
      const esports = games.filter(
        (game: TGame) => game.sport.__typename !== ECategories.Sport
      );
      let tmpSportsList: any = [
        {
          name: 'All',
          sportId: ALL,
          total: games.length
        }
      ];
      games.forEach((element) => {
        const index = tmpSportsList.findIndex(
          (item: any) => item.sportId === element.sport.sportId
        );
        if (index === -1) {
          return tmpSportsList.push({
            name: element.sport.name,
            sportId: element.sport.sportId,
            slug: element.sport.slug,
            total: 1,
            __typename: element.sport.__typename
          });
        }
        tmpSportsList[index].total += 1;
      });
      setSportsList(tmpSportsList);
      setSports(sports);
      setEsports(esports);
    }
  }, [games]);

  return {
    loading,
    sportsList,
    games: renderGames,
    sportSelected,
    setSportSelected,
    setSearchText,
    searchText,
    categories: [
      {
        name: SportHub.Sports,
        games: sports,
        sports: [],
        id: SportHub.Sports
      },
      {
        name: SportHub.Esports,
        games: esports,
        sports: [],
        id: SportHub.Esports
      }
    ]
  };
};
