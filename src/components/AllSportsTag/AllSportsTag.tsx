import { ExploreContext } from '@/contexts'
import { SportIcon } from '@/icons'
import clsx from 'clsx'
import { use, useMemo } from 'react'


type ButtonProps = {
  sportId?: string
  title: string
  count: number
  isSelected: boolean
  onClick: () => void
}

const Button: React.FC<ButtonProps> = (props) => {
  const { sportId, title, count, isSelected, onClick } = props

  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center gap-1 p-2 cursor-pointer rounded-lg font-bold whitespace-nowrap',
        {
          'bg-gradient-to-l from-[#ff65a6] via-[#b37ed3] to-[#5e64eb]':
            isSelected,
          'bg-[#FFFFFF0D]': !isSelected,
        }
      )}
    >
      {
        Boolean(sportId) && (
          <SportIcon sportId={sportId} />
        )
      }
      <span>{title}</span>
      <span className="bg-[#E6E6E6] p-1 rounded-md text-black text-[10px]">
        {count}
      </span>
    </button>
  )
}

export default function AllSportsTag() {
  const {
    sports,
    selectedSport,
    setSelectedSport,
    selectedSportHub,
    removeGameParams,
    filterGames,
  } = use(ExploreContext)

  const handleClick = (sportId: string, sportSlug?: string) => {
    if (sportSlug) {
      filterGames({
        sportSlug: sportSlug,
      })
    }
    else {
      removeGameParams('sportSlug')
    }
    setSelectedSport(sportId)
  }

  const allGames = useMemo(() => {
    if (!sports?.length) {
      return 0
    }

    return sports.reduce((acc, { games }) => acc + games?.length!, 0)
  }, [ sports ])

  return (
    <div className="flex items-center pb-2 gap-4">
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
        <Button 
          title="All"
          count={allGames}
          isSelected={selectedSport === 'all'}
          onClick={() => handleClick('all')}
        />
        {
          sports?.map(({ sportId, name, games, slug }) => {
            const isSelected = selectedSport === sportId

            return (
              <Button 
                key={sportId} 
                sportId={sportId} 
                title={name} 
                count={games?.length!} 
                isSelected={isSelected}
                onClick={() => handleClick(sportId, slug)}
              />
            )
          })
        }
      </div>
    </div>
  )
}
