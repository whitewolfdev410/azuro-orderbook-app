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
    <div className="flex lg:flex-row lg:gap-2 max-lg:flex-col  bg-gray-700 lg:bg-transparent w-full">
      <div>
        <AllSportsTag />
      </div>
      <div className="bg-gray-700 flex-1 max-md:transparent">
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
      <div>
            <BetslipButtonContent isOpen={true} setIsOpen={() => null}/>
      </div>
    </div>
  )
}
