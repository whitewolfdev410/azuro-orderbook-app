'use client';
import AllSportsTag from '@/components/AllSportsTag';
import GameCard from '@/components/GameCard';
import NoData from '@/components/NoData/NoData';
import { SkeletonArray } from '@/components/Skeleton';
import { ExploreContext } from '@/contexts';
import { use, useMemo } from 'react';

export default function GamesPage() {
  const { games, gameLoading } = use(ExploreContext);
  const isNoData = useMemo(
    () => !games?.length && !gameLoading,
    [games, gameLoading]
  );
  return (
    <div className="mt-12 flex flex-col gap-4 min-h-[70vh]">
      <AllSportsTag />
      {isNoData && (
        <div className="flex-1 flex items-center justify-center">
          <NoData />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {gameLoading ? (
          <SkeletonArray length={8} />
        ) : (
          games?.map((game) => <GameCard key={game.id} game={game} />)
        )}
      </div>
    </div>
  );
}
