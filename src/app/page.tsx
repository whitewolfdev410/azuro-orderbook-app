'use client'
import { GameCard, GameCardList } from '@/components/GameCard'
import LeaguesTag from '@/components/LeaguesTag/LeaguesTag'
import NoData from '@/components/NoData/NoData'
import { SkeletonArray } from '@/components/Skeleton'
import { ExploreContext } from '@/contexts'
import { useBreakpoints } from '@/hooks'
import { use } from 'react'

export default function GamesPage() {
  const { games, gamesLoading } = use(ExploreContext)

  const isNoData = !games?.length && !gamesLoading

  const breakpoints = useBreakpoints()

  return (
    <div className="lg:w-[65vw]">
      <div className="mb-2 w-full">
        <LeaguesTag />
      </div>
      {isNoData && (
        <div className="flex-1 flex items-center justify-center">
          <NoData />
        </div>
      )}
      <div className="flex flex-col overflow-y-auto lg:max-h-[85vh] p-1">
        {gamesLoading ? (
          <SkeletonArray length={8} />
        ) : (
          // TODO - allow user to choose grid or list view (default list)
          // games?.map((game) => <GameCard key={game.id} game={game} />)

          games?.map((game) => {
            return breakpoints.isXs ? (
              <GameCard key={game.id} game={game} />
            ) : (
              <GameCardList key={game.id} game={game} />
            )
          })
        )}
      </div>
    </div>
  )
}
