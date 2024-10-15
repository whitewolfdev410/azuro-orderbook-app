'use client'
import AllSportsTag from '@/components/AllSportsTag'
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
    <div className="flex lg:flex-row max-lg:flex-col  bg-gray-700 lg:bg-transparent w-full">
      <div className="pr-2">
        <AllSportsTag />
      </div>
      <div className="bg-gray-700 w-full max-md:transparent">
        <div className="max-md:mt-12 flex flex-col gap-4 min-h-[70vh]">
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
        </div>
      </div>
    </div>
  )
}
