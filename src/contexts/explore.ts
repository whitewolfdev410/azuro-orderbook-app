'use client'
import { OutComeData } from '@/hooks'
import { DefaultBetRanges, TCategory } from '@/types'
import { BetslipItem, SportHub } from '@azuro-org/sdk'
import { MarketOutcome, SportsNavigationQuery, GamesQuery } from '@azuro-org/toolkit'
import { Dispatch, SetStateAction, createContext } from 'react'
import type { useNavigation } from '@azuro-org/sdk'

export type CustomMarketOutcome = MarketOutcome & { _outcomeSelected: number }

export type ExploreContextValue = {
  sportHub: SportHub,
  sportSlug: string
  sportsLoading: boolean
  gamesLoading: boolean
  games: GamesQuery['games'] | undefined
  sports: SportsNavigationQuery['sports'] | undefined
  categories: TCategory[]
  searching: string
  bets: OutComeData
  betRange: DefaultBetRanges
  setBets: Dispatch<SetStateAction<OutComeData>>
  setBetRange: Dispatch<SetStateAction<DefaultBetRanges>>
  filterSports: (hub: SportHub) => void
  filterGames: (slug: string) => void
  clearFilterSports: () => void
  clearFilterGames: () => void
  setSearching: (value: string) => void
  outcomeSelected: MarketOutcome | CustomMarketOutcome | null
  setOutcomeSelected: Dispatch<SetStateAction<CustomMarketOutcome | MarketOutcome | null>>,
  navigation: ReturnType<typeof useNavigation>['navigation'],
  filterLeague: (slug: string) => void,
  leagueSlug: string,
  isBetInfoOpen: boolean,
  setIsBetInfoOpen: Dispatch<SetStateAction<boolean>>
  isChartSelected: boolean | null,
  setIsChartSelected: Dispatch<SetStateAction<boolean | null>>,
  betTokenSymbol: string,
}

export const ExploreContext = createContext<ExploreContextValue>({
  sportHub: SportHub.Sports,
  sportSlug: '',
  sportsLoading: false,
  gamesLoading: false,
  games: [],
  sports: [],
  categories: [],
  searching: '',
  bets: {},
  betRange: 'Single',
  filterSports: () => null,
  setBets: () => null,
  setBetRange: () => null,
  filterGames: () => null,
  setSearching: () => null,
  clearFilterSports: () => null,
  clearFilterGames: () => null,
  outcomeSelected: null,
  setOutcomeSelected: () => null,
  navigation: [],
  filterLeague: () => null,
  leagueSlug: '',
  isBetInfoOpen: false,
  setIsBetInfoOpen: () => null,
  isChartSelected: null,
  setIsChartSelected: () => null,
  betTokenSymbol: '',
})
