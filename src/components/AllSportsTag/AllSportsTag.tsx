'use client'

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
        'flex items-center gap-1 cursor-pointer font-bold whitespace-nowrap p-2 lg:w-full lg:justify-between w-full',
        {
          'bg-gradient-to-l from-[#ff65a6] via-[#b37ed3] to-[#5e64eb] rounded-lg':
            isSelected, // Added border radius for selected state
          'bg-[#FFFFFF0D] rounded-none': !isSelected, // Default border radius for unselected state
        }
      )}
    >
      <div className="flex flex-row">
        {Boolean(sportId) ? (
          <SportIcon sportId={sportId} className="lg:pr-1" />
        ) : (
          <span className="invisible">&nbsp;&nbsp;</span>
        )}
        <span>{title}</span>
      </div>
      <span className="bg-gray-200 px-2 py-1 rounded-md text-gray-800 text-xs">
        {count}
      </span>
    </button>
  )
}

export default function AllSportsTag() {
  const { sports, sportSlug, sportHub, filterGames } = use(ExploreContext)
  const handleClick = (sportSlug: string) => {
    filterGames(sportSlug)
  }

  const allGames = useMemo(() => {
    if (!sports?.length) {
      return 0
    }

    return sports.reduce((acc, { games }) => acc + games?.length!, 0)
  }, [sports])

  return (
    <div className="flex items-center pb-2 gap-4">
      <div className="capitalize text-[21px] font-bold lg:hidden">
        {sportHub}
      </div>
      <div
        className={clsx(
          'flex lg:flex-col relative items-center snap-x snap-mandatory overflow-x-auto w-[100%]',
          'no-scrollbar'
        )}
      >
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
              count={games?.length!}
              isSelected={isSelected}
              onClick={() => handleClick(slug)}
            />
          )
        })}
      </div>
    </div>
  )
}
