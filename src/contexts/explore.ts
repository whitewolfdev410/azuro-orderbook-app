'use client'
import { OutComeData } from '@/hooks'
import { DefaultBetRanges, TCategory, TGame, TSport } from '@/types'
import { MarketOutcome } from '@azuro-org/toolkit'
import { Dispatch, SetStateAction, createContext } from 'react'

export type ExploreContextValue = {
  loading: boolean
  gameLoading: boolean
  games: TGame[]
  sports: TSport[]
  selectedSportHub: string
  selectedSport: string
  categories: TCategory[]
  totalGames: number
  searching: string
  bets: OutComeData
  allBets: OutComeData
  betRange: DefaultBetRanges
  searchGame: (value: string) => void
  setSelectedSportHub: Dispatch<SetStateAction<string>>
  setSelectedSport: Dispatch<SetStateAction<string>>
  setBets: Dispatch<SetStateAction<OutComeData>>
  setBetRange: Dispatch<SetStateAction<DefaultBetRanges>>
  filterSports: (args: Record<string, unknown>) => void
  filterGames: (args: Record<string, unknown>) => void
  clearFilterSports: () => void
  clearFilterGames: () => void
  outcomeSelected: MarketOutcome | null
  setOutcomeSelected: Dispatch<SetStateAction<MarketOutcome | null>>
  resetGame: () => void
  removeGameParams: (key: string) => void
}

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
  removeGameParams: () => null,
})
