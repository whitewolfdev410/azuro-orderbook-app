'use client'
import { ExploreContext } from '@/contexts'
import { OutComeData, useLocalStorage } from '@/hooks'
import { DefaultBetRanges, TGame } from '@/types'
import { groupBetByBetRange, sortBet } from '@/utils'
import { SportHub, UseSportsProps, useGames, useSportsNavigation } from '@azuro-org/sdk'
import { MarketOutcome } from '@azuro-org/toolkit'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

export type ExploreProviderProps = {
  children: React.ReactNode
}

export const ExploreProvider: React.FC<ExploreProviderProps> = ({
  children,
}) => {
  const [sportHub, setSportHub] = useState<SportHub>(SportHub.Sports)
  const [gameParams, setGameParams] = useState<UseSportsProps>({
    filter: {
      sportHub: SportHub.Sports,
    },
  })
  const { sports, loading } = useSportsNavigation({
    withGameCount: true,
    filter: {
      sportHub,
    }
  })
  const { games: _games, loading: gameLoading } = useGames(gameParams)
  const [selectedSportHub, setSelectedSportHub] = useState<string>(
    SportHub.Sports
  )
  const [selectedSport, setSelectedSport] = useState<string>('all')
  const [totalGames, setTotalGames] = useState<number>(-1)
  const [games, setGames] = useState<TGame[]>([])
  const [searching, setSearching] = useState<string>('')
  const [outcomeSelected, setOutcomeSelected] = useState<MarketOutcome | null>(
    null
  )
  const [bets, setBets] = useState<OutComeData>({})
  const [groupedBets, setGroupedBets] = useState<OutComeData>({})
  const { setValue: setLocalBetRange, value: localBetRange } =
    useLocalStorage<DefaultBetRanges>('betRange', 'Single')
  const [betRange, setBetRange] = useState<DefaultBetRanges>(localBetRange)

  const router = useRouter()

  const redirect = () => {
    if (window.location.pathname !== '/') {
      router.push('/')
    }
  }

  const cleanup = () => {
    setGames([])
  }

  const filterSports = useCallback((hub: SportHub) => {
    cleanup()
    redirect()
    setSportHub(hub)
  }, [])

  const filterGames = useCallback(
    (args: Record<string, unknown>): void => {
      redirect()
      if (searching !== '' && totalGames === -1) {
        return
      }
      setGameParams((prev) => ({
        filter: {
          ...prev.filter,
          ...args,
        },
      }))
    },
    [searching]
  )

  const clearFilterSports = useCallback(() => {
    setSportHub(SportHub.Sports)
  }, [])

  const clearFilterGames = useCallback(() => {
    setGameParams({
      filter: {
        sportHub: SportHub.Sports,
      },
    })
  }, [])

  useEffect(() => {
    setLocalBetRange(betRange)
  }, [betRange])

  useEffect(() => {
    const result = groupBetByBetRange({ ...bets }, betRange)
    setGroupedBets(result as OutComeData)
  }, [betRange, bets])

  // useEffect(() => {
  //   const _allGames = searching ? games : allGames
  //   const tempSportsList: TSport[] = []

  //   const _newSports = [
  //     {
  //       name: 'All',
  //       slug: 'all',
  //       countries: [],
  //       sportId: 'all',
  //       total: 0,
  //     },
  //     ..._sports,
  //   ]

  //   if (!_sports || _games?.length === 0) {
  //     setSports(_newSports as TSport[])
  //     return
  //   }

  //   _newSports.forEach((sport) => {
  //     const total =
  //       sport?.slug === 'all'
  //         ? _allGames?.length
  //         : _allGames?.filter((game) => game.sport.slug === sport?.slug)
  //             ?.length || 0

  //     tempSportsList.push({
  //       name: sport?.name,
  //       sportId:
  //         sport.slug === 'all'
  //           ? sport.slug
  //           : sport?.countries?.[0]?.leagues?.[0]?.games?.[0]?.sport?.sportId ||
  //             '', //sport.countries[0]?.leagues[0]?.games[0]?.sport?.sportId
  //       total,
  //       countries: [],
  //       slug: sport?.slug,
  //     })
  //   })

  //   if (searching !== '') {
  //     setSports(tempSportsList.filter(({ total }) => total > 0))
  //     return
  //   }
  //   setSports(tempSportsList)
  // }, [loading, games, searching])

  useEffect(() => {
    if (gameLoading) {
      return
    }

    if (totalGames === -1 && _games) {
      setTotalGames(_games?.length || 0)
    }

    if (searching) {
      searchGame(searching)
      return
    }
    setGames(_games as TGame[])
  }, [_games, totalGames, searching])

  const searchGame = useCallback(
    (value: string) => {
      redirect()
      setSearching(value)
      if (value) {
        const tempGames = _games?.filter((game: TGame) => {
          const regex = new RegExp(value, 'i')
          return regex.test(game?.title!)
        })
        setGames(tempGames as TGame[])
      } else {
        setGames(_games as TGame[])
        setSearching('')
      }
    },
    [_games, searching]
  )

  const resetGame = () => {
    setTotalGames(-1)
  }

  const removeGameParams = useCallback((key: string) => {
    setGameParams((prev) => {
      if (!prev.filter) return prev
      if (key === 'filter') {
        return { filter: {} }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { filter, ...rest } = prev
      return rest
    })
  }, [])

  const filteredGames = useMemo(() => {
    if (searching === '') return games
    if (selectedSport === 'all') return games
    return games?.filter((game) => game.sport.sportId === selectedSport)
  }, [searching, selectedSport, games])

  const value = useMemo(
    () => ({
      categories: [
        {
          name: SportHub.Esports,
          sports: [],
          id: SportHub.Esports,
        },
        {
          name: SportHub.Sports,
          sports: [],
          id: SportHub.Sports,
        },
      ],
      games: filteredGames,
      sports,
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
      bets: Object.keys(groupedBets)?.length > 0 ? groupedBets : sortBet(bets),
      allBets: bets,
      betRange,
      setBetRange,
      outcomeSelected,
      setOutcomeSelected,
      searching,
      resetGame,
      removeGameParams,
    }),
    [
      filterGames,
      filterSports,
      groupedBets,
      bets,
      games,
      sports,
      betRange,
      outcomeSelected,
      selectedSport,
      selectedSportHub,
      searching,
      totalGames,
    ]
  )

  return (
    <ExploreContext.Provider value={value}>{children}</ExploreContext.Provider>
  )
}

export default ExploreProvider
