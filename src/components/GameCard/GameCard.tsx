'use client'
import { SportIcon } from '@/icons'
import { TGame } from '@/types'
import { formatTime } from '@/utils'
import clsx from 'clsx'
import Link from 'next/link'
import { useMemo } from 'react'
import Participant from './Participant'

export type GameCardProps = {
  className?: string
  game: TGame
}

export default function GameCard(props: Readonly<GameCardProps>) {
  const { className, game } = props
  const { gameId, league, startsAt, sport, participants } = game

  const formattedStartAt = useMemo(() => formatTime(startsAt), [startsAt])

  return (
    <Link href={`/event/${gameId}`}>
      <div className="hover:bg-gradient-to-l hover:from-[#ff65a6] hover:via-[#b37ed3] hover:to-[#5e64eb] p-[1px] rounded-lg h-full">
        <div
          className={clsx(
            className,
            'p-4 bg-[#262a31] rounded-lg min-h-[190px] flex flex-col gap-2 h-full'
          )}
        >
          <div>
            <p className="font-bold flex flex-items gap-2 overflow-hidden text-ellipsis w-full">
              <SportIcon sportId={sport.sportId} />
              {league.country.name} &middot; {league.name}
            </p>
          </div>
          <div className="flex gap-2 items-center justify-between flex-1">
            <Participant {...participants[0]} className="w-[40%] flex-col" />
            <div className="text-[10px] font-bold">
              <div className="bg-[#FFFFFF0D] rounded-lg p-1 flex items-center justify-center mb-1">
                {formattedStartAt.time}
              </div>
              {formattedStartAt.date}
            </div>
            <Participant {...participants[1]} className="w-[40%] flex-col" />
          </div>
        </div>
      </div>
    </Link>
  )
}
