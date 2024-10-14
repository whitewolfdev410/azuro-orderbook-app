import { useContext, useMemo } from 'react'
import { ExploreContext } from '@/contexts'
import { SportIcon } from '@/icons'
import clsx from 'clsx'

type ButtonProps = {
  sportId?: string
  title: string
  count: number
  isSelected: boolean
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ sportId, title, count, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center gap-1 p-2 cursor-pointer rounded-lg font-bold whitespace-nowrap',
        {
          'bg-gradient-to-l from-[#ff65a6] via-[#b37ed3] to-[#5e64eb]': isSelected,
          'bg-[#FFFFFF0D]': !isSelected,
        }
      )}
    >
      {Boolean(sportId) && <SportIcon sportId={sportId} />}
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
    sportSlug,
    sportHub,
    filterGames,
  } = useContext(ExploreContext)

  const handleClick = (sportSlug: string) => {
    filterGames(sportSlug)
  }

  const allGames = useMemo(() => {
    if (!sports?.length) return 0
    return sports.reduce((acc, { games }) => acc + (games?.length || 0), 0)
  }, [sports])

  return (
    <div className="flex flex-col items-start pb-2 gap-4">
      <div className="capitalize text-[21px] font-bold">{sportHub}</div>
      <div className="flex flex-col overflow-y-auto max-h-[80vh]"> {/* Set a max height and allow scrolling */}
        <div className="flex flex-wrap gap-2"> {/* Flex-wrap to allow wrapping of buttons */}
          <Button 
            title="All"
            count={allGames}
            isSelected={!sportSlug}
            onClick={() => handleClick('')}
          />
          {sports?.map(({ sportId, name, games, slug }) => {
            const isSelected = sportSlug === slug
            return (
              <Button 
                key={sportId} 
                sportId={sportId} 
                title={name} 
                count={games?.length || 0} 
                isSelected={isSelected}
                onClick={() => handleClick(slug)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
