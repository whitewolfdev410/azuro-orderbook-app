'use client';
import { Skeleton } from '@/components';
import AllSportsTag from '@/components/AllSportsTag';
import GameCard from '@/components/GameCard';
import NoData from '@/components/NoData/NoData';
import { useGameCategories } from '@/hooks/useGameCategories';
import { ExploreContext } from '@/providers/ExploreProvider';
import { use } from 'react';
export default function GamesPage() {
  const { loading: sportLoading } = useGameCategories();

  const { games, gameLoading } = use(ExploreContext);
  const isNoData = !gameLoading && games?.length === 0;
  return (
    <>
      <div className="mt-12 flex flex-col gap-4 min-h-[70vh]">
        <AllSportsTag />
        {/* <div className="flex items-center gap-4 overflow-auto scroll-smooth pb-2">
          {!sportLoading && !gameLoading && (
            <>
              <span
                className="capitalize text-[21px] font-[700] cursor-pointer"
                onClick={() => {
                  setSelectedSport('all');
                  removeGameParams('sportSlug');
                }}
              >
                {selectedSportHub}
              </span>

              {sports.map((sport) => {
                return (
                  <div
                    key={sport.sportId}
                    onClick={() => {
                      if (sport.slug === 'all') {
                        removeGameParams('sportSlug');
                        setSelectedSport('all');
                        return;
                      }
                      if (!searching) {
                        filterGames({
                          sportSlug: sport.slug
                        });
                      }
                      setSelectedSport(sport.sportId);
                    }}
                    className={`flex items-center gap-1 p-2 cursor-pointer rounded-lg font-bold whitespace-nowrap ${
                      selectedSport === sport.sportId
                        ? 'bg-gradient-to-l from-[#ff65a6] via-[#b37ed3] to-[#5e64eb] '
                        : 'bg-[#FFFFFF0D]'
                    }`}
                  >
                    <span>{sport.name}</span>
                    <span className="bg-[#E6E6E6] p-1 rounded-md text-black text-[10px]">
                      {sport.total}
                    </span>
                  </div>
                );
              })}
            </>
          )}
        </div> */}

        {isNoData && (
          <div className="flex-1 flex items-center justify-center">
            <NoData />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {gameLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          {!gameLoading &&
            games?.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
      </div>
    </>
  );
}
