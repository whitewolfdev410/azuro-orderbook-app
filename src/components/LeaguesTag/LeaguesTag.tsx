'use client'
import { useTheme } from '@/app/ThemeContext'
import { ExploreContext } from '@/contexts'
import clsx from 'clsx'
import React, { use, useMemo } from 'react'

type ButtonProps = {
  // sportId?: string
  title: string
  count: number
  isSelected: boolean
  onClick: () => void
}

// TODO create component for this to use with AllSportsTag
const Button: React.FC<ButtonProps> = (props) => {
  const { title, isSelected, onClick, count } = props
  const { theme } = useTheme()

  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center gap-2 p-2 cursor-pointer font-bold whitespace-nowrap rounded-md mr-1',
        {
          'bg-gradient-to-l from-[#ff65a6] via-[#b37ed3] to-[#5e64eb]':
            isSelected && theme !== 'light', // Gradient for other themes
          'bg-gray-500 text-white rounded-md': isSelected && theme === 'light',
        }
      )}
    >
      <span>{title}</span>
      <span className="bg-slate-400 px-2 py-1 rounded-md text-gray-800 text-[10px]">
        {count}
      </span>
    </button>
  )
}

export default function LeaguesTag() {
  const { navigation, filterLeague, sportSlug, leagueSlug } =
    use(ExploreContext)

  const handleClick = (leagueSlug: string) => {
    filterLeague(leagueSlug)
  }

  const leagues = useMemo(() => {
    if (!navigation) {
      return []
    }
    return navigation.flatMap((sport) => {
      if (sport.slug !== sportSlug) {
        return []
      } else {
        return sport.countries.flatMap((country) => country.leagues)
      }
    })
  }, [navigation, sportSlug])

  return (
    <div className="flex items-center">
      {/* <div className="capitalize text-[21px] font-bold">{sportSlug}</div> */}
      <div
        className={clsx(
          'flex relative max-w-[100%] lg:max-w-[calc(100%-86px)] items-center snap-x snap-mandatory overflow-x-auto'
          // 'scrollbar'
        )}
      >
        {/* <Button
          title="All leagues"
          isSelected={!leagueSlug}
          onClick={() => handleClick('')}
          count={leagues.length}
        /> */}
        {leagues.map((league) => {
          return (
            <Button
              key={league.id}
              title={league.name}
              isSelected={league.slug === leagueSlug}
              onClick={() => handleClick(league.slug)}
              count={league.games?.length || 0}
            />
          )
        })}
      </div>
    </div>
  )
}
