'use client'
import { BackCircle, SportIcon } from '@/icons'
import { formatTime } from '@/utils'
import { type GameQuery } from '@azuro-org/toolkit'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { Participant } from './GameCard'

export type GameInfoProps = {
  game: GameQuery['games'][0]
}

export function GameInfo(props: Readonly<GameInfoProps>) {
  const { sport, league, participants, startsAt } = props.game
  const router = useRouter()

  const handleBack = useCallback(() => {
    router.push('/')
  }, [router])

  const formattedStarAt = useMemo(() => formatTime(startsAt), [startsAt])

  return (
    <div className="flex flex-row justify-center w-full h-full rounded-[40px] pt-4 relative">
      <button
        className="absolute top-0 left-0 m-4 cursor-pointer flex items-center"
        onClick={handleBack}
      >
        <BackCircle />
        <span className="ml-2 text-[14px] font-[600]">Back</span>
      </button>
      <div className="flex flex-col items-center pt-6 pb-8 rounded-[40px]">
        <div className="flex flex-col items-center text-md">
          <div className="mt-2 font-bold text-[16px]">
            <div className="flex items-center justify-center rounded-[12px] bg-[#FFFFFF0D] p-2 px-4 mb-4 w-fit mx-auto">
              <SportIcon sportId={sport.sportId} />
              <span className="ml-2">{sport.name}</span>
            </div>
            <p className="text-center">
              {league.country.name} &middot; {league.name}
            </p>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center">
          <Participant {...participants[0]} size="lg" className="flex-col" />
          <div className="flex flex-col items-center px-auto">
            <div className="text-[12px] font-[500] mb-1 bg-[#FFFFFF0D] rounded-[12px] px-2 py-1">
              {formattedStarAt.time}
            </div>
            <div className="text-[12px] font-[500]">{formattedStarAt.date}</div>
          </div>
          <Participant {...participants[1]} size="lg" className="flex-col" />
        </div>
      </div>
    </div>
  )
}
