'use client'
import { ExploreContext } from '@/contexts'
import { OutComeData, useLocalStorage } from '@/hooks'
import { DefaultBetRanges, TGame } from '@/types'
import { groupBetByBetRange, sortBet } from '@/utils'
import { SportHub, useGames, useSportsNavigation } from '@azuro-org/sdk'
import { MarketOutcome } from '@azuro-org/toolkit'
import { useCallback, useEffect, useMemo, useState } from 'react'

export type ExploreProviderProps = {
  children: React.ReactNode
}

export const ExploreProvider: React.FC<ExploreProviderProps> = ({
  children,
}) => {
  const [sportHub, setSportHub] = useState<SportHub>(SportHub.Sports)
  const [sportSlug, setSportSlug] = useState('')
  const { sports, loading: sportsLoading } = useSportsNavigation({
    withGameCount: true,
    filter: {
      sportHub,
    }
  })
  const { games: _games, loading: gamesLoading } = useGames({
    filter: {
      sportHub,
      sportSlug,
    }
  })
  const [ searching, setSearching ] = useState<string>('')
  const [ outcomeSelected, setOutcomeSelected ] = useState<MarketOutcome | null>(
    null
  )
  const [ bets, setBets ] = useState<OutComeData>({})
  const [ groupedBets, setGroupedBets ] = useState<OutComeData>({})
  const { setValue: setLocalBetRange, value: localBetRange } =
    useLocalStorage<DefaultBetRanges>('betRange', 'Single')
  const [betRange, setBetRange] = useState<DefaultBetRanges>(localBetRange)

  const clearFilterSports = useCallback(() => {
    setSportHub(SportHub.Sports)
  }, [])

  const clearFilterGames = useCallback(() => {
    setSportSlug('')
  }, [])

  useEffect(() => {
    setLocalBetRange(betRange)
  }, [betRange])

  useEffect(() => {
    const result = groupBetByBetRange({ ...bets }, betRange)
    setGroupedBets(result as OutComeData)
  }, [ betRange, bets ])

  const games = useMemo(() => {
    if (!searching || !_games?.length) {
      return _games
    }

    return _games?.filter((game: TGame) => {
      const regex = new RegExp(searching, 'i')
      return regex.test(game?.title!)
    })
  }, [ _games, searching ])

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
      games,
      sports,
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
    ]
  )

  return (
    <ExploreContext.Provider value={value}>{children}</ExploreContext.Provider>
  )
}

export default ExploreProvider
