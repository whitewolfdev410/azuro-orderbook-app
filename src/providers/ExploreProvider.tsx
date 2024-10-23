'use client'
import { CustomMarketOutcome, ExploreContext } from '@/contexts'
import { OutComeData, useLocalStorage } from '@/hooks'
import { DefaultBetRanges, TGame } from '@/types'
import { groupBetByBetRange, sortBet } from '@/utils'
import { SportHub, useChain, useGames, useNavigation } from '@azuro-org/sdk'
import { MarketOutcome } from '@azuro-org/toolkit'
import { useCallback, useEffect, useMemo, useState } from 'react'

export type ExploreProviderProps = {
  children: React.ReactNode
}

export const ExploreProvider: React.FC<ExploreProviderProps> = ({
  children,
}) => {
  const [sportHub, setSportHub] = useState<SportHub>(SportHub.Sports)
  const [sportSlug, setSportSlug] = useState('football')
  const [leagueSlug, setLeagueSlug] = useState('')
  const [isBetInfoOpen, setIsBetInfoOpen] = useState(false)

  // const { sports, loading: sportsLoading } = useSportsNavigation({
  //   withGameCount: true,
  //   // isLive: true,
  //   // filter: {
  //   //   sportHub,
  //   // }
  // })

  const { navigation, loading: sportsLoading, error } = useNavigation({
    withGameCount: true,
    // filter: {
    //   sportHub,
    // }
  })

  // const leagues = navigation?.map((sport) => sport.countries.flatMap((country) => country.leagues)) || undefined;

  const allSports = navigation?.map((sport) => ({
    __typename: sport.__typename,
    id: sport.id,
    slug: sport.slug,
    name: sport.name,
    sportId: sport.sportId,
    // Flattening the games array from all leagues under each country
    games: sport.countries.flatMap((country) =>
      country.leagues.flatMap((league) => league.games || [])
    ),
  })) || undefined;

  // const sports = navigation?.map((sport) => {
  //   if (Number(sport.id) < 1000){
  //     return {
  //       __typename: sport.__typename,
  //       id: sport.id,
  //       slug: sport.slug,
  //       name: sport.name,
  //       sportId: sport.sportId,
  //       // Flattening the games array from all leagues under each country
  //       games: sport.countries.flatMap((country) =>
  //         country.leagues.flatMap((league) => league.games || [])
  //       ),
  //     }}
  // }) || undefined;

  const findFirstNonNullSlug = (sport: any): string | null => {
    return sport.countries?.flatMap((country: any) =>
      country.leagues?.flatMap((league: any) => league.slug || [])
    ).find(Boolean) || null;
  };

  const sports = navigation?.map((sport) => {
    if (Number(sport.id) < 1000) {
      return {
        __typename: sport.__typename,
        id: sport.id,
        slug: sport.slug,
        name: sport.name,
        sportId: sport.sportId,
        // Flattening the games array from all leagues under each country
        games: sport.countries.flatMap((country) =>
          country.leagues.flatMap((league) => league.games || [])
        ),
        // use first available leagueSlug as default
        defaultLeagueSlug: findFirstNonNullSlug(sport)
      }
    }
  }) || undefined;

  const esports = navigation?.map((sport) => {
    if (Number(sport.id) >= 1000) {
      return {
        __typename: sport.__typename,
        id: sport.id,
        slug: sport.slug,
        name: sport.name,
        sportId: sport.sportId,
        // Flattening the games array from all leagues under each country
        games: sport.countries.flatMap((country) =>
          country.leagues.flatMap((league) => league.games || [])
        ),
        // use first available leagueSlug as default
        defaultLeagueSlug: findFirstNonNullSlug(sport)
      }
    }
  }) || undefined;

  const { games: _games, loading: gamesLoading } = useGames({
    filter: {
      sportHub,
      sportSlug,
      leagueSlug,
    }
  })

  const [searching, setSearching] = useState<string>('')
  const [outcomeSelected, setOutcomeSelected] = useState<MarketOutcome | CustomMarketOutcome | null>(
    null
  )

  const [bets, setBets] = useState<OutComeData>({})
  const [groupedBets, setGroupedBets] = useState<OutComeData>({})
  const { setValue: setLocalBetRange, value: localBetRange } =
    useLocalStorage<DefaultBetRanges>('betRange', 'Single')
  const [betRange, setBetRange] = useState<DefaultBetRanges>(localBetRange)
  const [isChartSelected, setIsChartSelected] = useState<boolean | null>(null)

  const clearFilterSports = useCallback(() => {
    setSportHub(SportHub.Sports)
  }, [])

  const { betToken } = useChain()
  const [betTokenSymbol, setSymbol] = useState<string>("")
  useEffect(() => {
    setSymbol(betToken.symbol == 'USDT' || 'USDC' ? '$' : betToken.symbol)
  }, [betToken])

  const clearFilterGames = useCallback(() => {
    setSportSlug('')
  }, [])

  useEffect(() => {
    setLocalBetRange(betRange)
  }, [betRange])

  useEffect(() => {
    const result = groupBetByBetRange({ ...bets }, betRange)
    setGroupedBets(result as OutComeData)
  }, [betRange, bets])

  const games = useMemo(() => {
    if (!searching || !_games?.length) {
      return _games
    }

    return _games?.filter((game: TGame) => {
      const regex = new RegExp(searching, 'i')
      return regex.test(game?.title!)
    })
  }, [_games, searching])

  const value = useMemo(
    () => ({
      categories: [
        {
          name: SportHub.Sports,
          sports: sports,
          id: SportHub.Sports,
        },
        {
          name: SportHub.Esports,
          sports: esports,
          id: SportHub.Esports,
        },
      ],
      games,
      sports: allSports,
      sportHub,
      sportSlug,
      filterSports: setSportHub,
      clearFilterSports,
      clearFilterGames,
      setBets,
      filterGames: setSportSlug,
      setSearching,
      sportsLoading,
      gamesLoading,
      bets: Object.keys(groupedBets)?.length > 0 ? groupedBets : sortBet(bets),
      allBets: bets,
      betRange,
      setBetRange,
      outcomeSelected,
      setOutcomeSelected,
      searching,
      navigation,
      leagueSlug,
      filterLeague: setLeagueSlug,
      isBetInfoOpen,
      setIsBetInfoOpen,
      isChartSelected,
      setIsChartSelected,
      betTokenSymbol,
    }),
    [
      sportHub,
      sportSlug,
      setSportSlug,
      setSportHub,
      bets,
      games,
      sports,
      betRange,
      outcomeSelected,
      searching,
      clearFilterGames,
      clearFilterSports,
      gamesLoading,
      sportsLoading,
      groupedBets,
      navigation,
      isBetInfoOpen,
      isChartSelected,
      betToken,
    ]
  )
  return (
    <ExploreContext.Provider value={value}>{children}</ExploreContext.Provider>
  )
}

export default ExploreProvider
