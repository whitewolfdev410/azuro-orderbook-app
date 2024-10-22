'use client'
import { BackCircle, SportIcon } from '@/icons'
import { formatTime } from '@/utils'
import { type GameQuery } from '@azuro-org/toolkit'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { Participant } from './GameCard'
import BreadCrumbBackButton from '@/components/Button/BackButton'

export type GameInfoProps = {
  game: GameQuery['games'][0]
}

export function GameInfo(props: Readonly<GameInfoProps>) {
  const { participants, startsAt, title } = props.game
  const formattedStarAt = useMemo(() => formatTime(startsAt), [startsAt])

  return (
    <div className="relative">
      <div className="grid grid-cols-[1fr_1fr_auto_1fr_1fr] items-center">
        <div className="col-start-2">
          <Participant {...participants[0]} size="lg" className="flex-col" textCenter={true} textAbove={true} colorWhite={true}/>
        </div>
        <div className="col-start-3 flex flex-col items-center px-auto">
          <div className="text-[12px] font-[500] mb-1 bg-[#FFFFFF0D] text-white rounded-[12px] px-2 py-1">
            {formattedStarAt.time}
          </div>
          <div className="text-[12px] font-[500] text-white">{formattedStarAt.date}</div>
        </div>
        <div className="col-start-4">
          <Participant {...participants[1]} size="lg" className="flex-col" textCenter={true} textAbove={true} colorWhite={true}/>
        </div>
      </div>
    </div>
  )
}
