'use client'
import AllSportsTag from '@/components/AllSportsTag'
import BetslipButtonContent from '@/components/BetslipButton/BetslipButtonContent'
import { GameCard } from '@/components/GameCard'
import { GameCardList } from '@/components/GameCard'
import LeaguesTag from '@/components/LeaguesTag/LeaguesTag'
import NoData from '@/components/NoData/NoData'
import { SkeletonArray } from '@/components/Skeleton'
import { ExploreContext } from '@/contexts'
import { use } from 'react'

export default function GamesPage() {
  const { games, gamesLoading } = use(ExploreContext)

  const isNoData = !games?.length && !gamesLoading

  return (
        <>
          <LeaguesTag />
          {isNoData && (
            <div className="flex-1 flex items-center justify-center">
              <NoData />
            </div>
          )}
          <div className="flex flex-col">
            {gamesLoading ? (
              <SkeletonArray length={8} />
            ) : (
              // TODO - allow user to choose grid or list view (default list)
              // games?.map((game) => <GameCard key={game.id} game={game} />)
              games?.map((game) => <GameCardList key={game.id} game={game} />)
            )}
          </div>
        </>
  )
}
