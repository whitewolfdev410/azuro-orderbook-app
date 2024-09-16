'use client';
import { ExploreContext } from '@/providers/ExploreProvider';
import { TCategory, TSport } from '@/utils/game';
import { SportHub } from '@azuro-org/sdk';
import cx from 'clsx';
import { use } from 'react';
import Icons from './Icons';
import { ButtonSkeleton } from './Skeletons';
import SportIcon from './Icons/Sports';

const iconsMapper = {
  [SportHub.Esports]: 'esport',
  [SportHub.Sports]: 'sport'
};

const ExploreDialogContent = ({ onClose }: { onClose: () => void }) => {
  const {
    categories,
    sports,
    filterSports,
    loading,
    selectedSportHub,
    setSelectedSportHub,
    selectedSport,
    setSelectedSport,
    filterGames,
    resetGame,
    removeGameParams,
    searchGame,
    searching
  } = use(ExploreContext);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category: TCategory, index: number) => (
          <div
            onClick={() => {
              searchGame('');
              setSelectedSport('all');
              resetGame();
              removeGameParams('filter');
              if (selectedSportHub === category.id) {
                setSelectedSportHub('');
              } else {
                setSelectedSportHub(category.id);
                filterGames({ sportHub: category.id });
                filterSports({ sportHub: category.id });
              }
              onClose();
            }}
            key={`${category?.name}-${index}`}
            className={cx(
              'flex items-center gap-3 px-[18px] py-3 border border-[#FFFFFF1A] rounded-xl cursor-pointer',
              {
                'bg-[#FFFFFF1A] border-0': selectedSportHub === category.id
              }
            )}
          >
            <Icons name={iconsMapper[category.id]} />
            <p className="text-sm py-[10px] capitalize">{category?.name}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="py-6">
          <h2 className="text-sm font-semibold my-[10px]">Browse</h2>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ButtonSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="py-6">
          <h2 className="text-sm font-semibold my-[10px]">Browse</h2>
          <div className="grid grid-cols-2 gap-4 max-h-72 overflow-auto">
            {sports.slice(1, sports.length).map((data: TSport) => (
              <div
                onClick={() => {
                  if (+selectedSport === +data.sportId || data.slug === 'all') {
                    removeGameParams('sportSlug');
                    setSelectedSport('all');
                  } else {
                    if (!searching) {
                      filterGames({ sportSlug: data.slug });
                    }
                    setSelectedSport(data.sportId);
                  }
                  onClose();
                }}
                key={data.name}
                className={cx(
                  `flex items-center gap-1 px-[12px] py-3 rounded-xl cursor-pointer hover:bg-[#FFFFFF1A]
                  ${selectedSport === data.sportId ? 'bg-[#FFFFFF1A] ' : 'bg-none'}
                `
                )}
              >
                <SportIcon sportId={data.sportId} />
                <p className="text-sm">{data.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ExploreDialogContent;
