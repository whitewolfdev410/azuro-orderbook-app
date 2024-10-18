'use client'

import { ExploreContext } from '@/contexts'
import { SportIcon } from '@/icons'
import clsx from 'clsx'
import { use, useEffect, useMemo } from 'react'

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
        'flex items-center gap-1 cursor-pointer font-bold whitespace-nowrap lg:w-full lg:justify-between w-full rounded-lg hover:border hover:border-gray-300',
        {
          'bg-gradient-to-l from-[#ff65a6] via-[#b37ed3] to-[#5e64eb] rounded-md':
            isSelected, // Added border radius for selected state
        },
        'p-2'
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
      <span className="bg-slate-400 p-1 rounded-md text-gray-800 text-xs">
        {count}
      </span>
    </button>
  )
}

export default function AllSportsTag() {
  const { categories, sportSlug, filterGames, filterLeague} = use(ExploreContext)
  const handleClick = (sportSlug: string) => {
    filterGames(sportSlug)
  }

  useEffect(() => {
    handleClick('football')
  }, [])

  useEffect(() => {
    const sport = categories
      .flatMap((category) => category.sports ?? [])
      .find((sport) => sport?.slug === sportSlug);
    const defaultLeague = sport?.defaultLeagueSlug;
    console.log("filter my league!!!!!! ", defaultLeague)
    if (defaultLeague){
      filterLeague(defaultLeague)
    }
  }, [sportSlug])


  return (
    <div className="flex items-center pb-2 gap-4 w-full">
      <div
        className={clsx(
          'flex lg:flex-col relative items-center snap-x snap-mandatory overflow-x-auto w-[100%]',
          'no-scrollbar'
        )}
      >
        {
          categories?.map((category) => {
            if (!category) return null;
            return (
              <div>
                <div className="w-full px-3 py-4 font-bold text-lg max-lg:hidden capitalize">{category.name}</div>
                {category.sports?.map((item) => {
                  if (!item) return null; // Skip undefined items

                  const { sportId, name, games, slug } = item;
                  const isSelected = sportSlug === slug;

                  return (
                    <Button
                      key={sportId}
                      sportId={sportId}
                      title={name}
                      count={games?.length ?? 0}
                      isSelected={isSelected}
                      onClick={() => handleClick(slug)}
                    />
                  );
                })}
              </div>
            )
          })

        }
      </div>
    </div>
  )
}
