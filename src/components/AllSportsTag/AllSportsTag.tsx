import { ExploreContext } from '@/contexts'
import { useGameCategories } from '@/hooks'
import { SportIcon } from '@/icons'
import clsx from 'clsx'
import { use } from 'react'

export default function AllSportsTag() {
  const {
    sports,
    selectedSport,
    setSelectedSport,
    filterGames,
    selectedSportHub,
    searching,
    removeGameParams,
  } = use(ExploreContext)
  const { loading: sportLoading } = useGameCategories()

  return (
    <div className="flex items-center pb-2 gap-4">
      {!sportLoading && (
        <>
          <button
            className="capitalize text-[21px] font-bold"
            onClick={() => {
              setSelectedSport('all')
              removeGameParams('sportSlug')
            }}
          >
            {selectedSportHub}
          </button>
          <div
            className={clsx(
              'flex relative max-w-[calc(100%-86px)] items-center snap-x snap-mandatory overflow-x-auto space-x-2',
              'no-scrollbar'
            )}
          >
            {sports.map((sport) => {
              const isSelected = selectedSport === sport.sportId

              return (
                <button
                  key={sport.sportId}
                  id={`id-${sport.sportId}`}
                  onClick={() => {
                    if (sport.slug === 'all') {
                      removeGameParams('sportSlug')
                      setSelectedSport('all')
                      return
                    }

                    if (!searching) {
                      filterGames({
                        sportSlug: sport.slug,
                      })
                    }
                    setSelectedSport(sport.sportId)
                  }}
                  className={clsx(
                    'flex items-center gap-1 p-2 cursor-pointer rounded-lg font-bold whitespace-nowrap',
                    {
                      'bg-gradient-to-l from-[#ff65a6] via-[#b37ed3] to-[#5e64eb]':
                        isSelected,
                      'bg-[#FFFFFF0D]': !isSelected,
                    }
                  )}
                >
                  <SportIcon sportId={sport.sportId} />
                  <span>{sport.name}</span>
                  <span className="bg-[#E6E6E6] p-1 rounded-md text-black text-[10px]">
                    {sport.total}
                  </span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
