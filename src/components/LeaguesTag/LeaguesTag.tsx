import React, { useMemo } from 'react'
import { use } from 'react'
import { ExploreContext } from '@/contexts'
import clsx from 'clsx'

type ButtonProps = {
    // sportId?: string
    title: string
    // count: number
    isSelected: boolean
    onClick: () => void
}

// TODO create component for this to use with AllSportsTag
const Button: React.FC<ButtonProps> = (props) => {
    const { title, isSelected, onClick } = props

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
            <span>{title}</span>
        </button>
    )
}

export default function LeaguesTag() {
    const { navigation, sportSlug } = use(ExploreContext)

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
        <div className="flex items-center pb-2 gap-4">
            <div
                className="capitalize text-[21px] font-bold"
            >
                {sportSlug}
            </div>
            <div className={clsx(
                'flex relative max-w-[calc(100%-86px)] items-center snap-x snap-mandatory overflow-x-auto space-x-2',
                // 'scrollbar'
            )}>
                {
                    leagues.map(league => {
                        return <Button
                            key={league.id}
                            title={league.name}
                            isSelected={false}
                            onClick={() => console.log('clicked')}
                        />
                    })
                }
            </div>
        </div>
    )
}