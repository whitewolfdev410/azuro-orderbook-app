'use client'
import AllSportsTag from '@/components/AllSportsTag'
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
    <div className="flex flex-row h-screen"> 
      
      
      <div className="fixed w-1/5 bg-gray-900 text-white p-4 flex z-10 flex-col gap-4 min-h-screen"> 
        <AllSportsTag />
        <LeaguesTag />
      </div>

      
      <div className="flex-1 flex flex-col p-6"> 
        
        {isNoData && (
          <div className="flex-1 flex items-center justify-center">
            <NoData />
          </div>
        )}

        <div className="flex flex-col gap-2 pl-[300px]"> 
          {gamesLoading ? (
            <SkeletonArray length={8} />
          ) : (
            games?.map((game) => (
              <div key={game.id} className="mb-4"> 
                <GameCardList game={game} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
