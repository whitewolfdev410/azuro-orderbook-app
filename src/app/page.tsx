'use client'
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
    <div className="lg:w-[65vw]">
      <div className="mb-2">
        <LeaguesTag />
      </div>
      {isNoData && (
        <div className="flex-1 flex items-center justify-center mb-">
          <NoData />
        </div>
      )}
      <div className="flex flex-col overflow-y-auto lg:max-h-[85vh]">
        {gamesLoading ? (
          <SkeletonArray length={8} />
        ) : (
          // TODO - allow user to choose grid or list view (default list)
          // games?.map((game) => <GameCard key={game.id} game={game} />)
          games?.map((game) => <GameCardList key={game.id} game={game} />)
        )}
      </div>
    </div>
  )
}
