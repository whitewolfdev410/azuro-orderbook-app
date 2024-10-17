'use client'
import { useTheme } from '@/app/ThemeContext'
import { OutcomeButton } from '@/components/Button'
import { ExploreContext } from '@/contexts'
import { TGame } from '@/types'
import { formatTime } from '@/utils'
import { BetType, useActiveMarkets, usePrematchBets } from '@azuro-org/sdk'
import { MarketOutcome, getGameStatus } from '@azuro-org/toolkit'
import clsx from 'clsx'
import Link from 'next/link'
import { useCallback, useContext, useMemo } from 'react'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import Participant from './Participant'

export type GameCardListProps = {
  className?: string
  game: TGame
}

// TODO - integrate with GameCard.tsx Component
export default function GameCardList(props: Readonly<GameCardListProps>) {
  const { className, game } = props
  const { gameId, league, startsAt, sport, participants, status } = game

  const formattedStartAt = useMemo(() => formatTime(startsAt), [startsAt])

  // TODO - create function that can fetch all markets for all games
  // TODO - don't hardcode isGameInLive
  const gameStatus = getGameStatus({
    graphStatus: status,
    startsAt: Number(startsAt),
    isGameInLive: false,
  })
  const { loading, markets } = useActiveMarkets({
    gameId,
    gameStatus,
  })

  const outcomes = markets?.[0]?.outcomeRows?.[0] || []
  const outcomeName = markets?.[0]?.name || ''

  const { outcomeSelected, setOutcomeSelected: onSelectOutcome } =
    useContext(ExploreContext)
  const { address } = useAccount()
  const { bets } = usePrematchBets({
    filter: {
      type: BetType.Accepted,
      bettor: address as Address,
    },
  })

  const checkIsBetPlaced = useCallback(
    (outcome: MarketOutcome) => {
      if (bets.length === 0) {
        return false
      }

      return bets.some(
        (bet) =>
          bet.outcomes[0].outcomeId === outcome.outcomeId &&
          bet.outcomes[0].conditionId === outcome.conditionId
      )
    },
    [bets]
  )
  const { theme } = useTheme()

  return (
    <Link href={`/event/${gameId}`}>
      <div
        className={clsx(
          'hover:bg-gradient-to-l hover:from-[#ff65a6] hover:via-[#b37ed3] hover:to-[#5e64eb] p-[15px] h-full',
          className,
          'mb-1 rounded-lg min-h-[100px] justify-between flex',
          theme === 'dark' ? 'bg-[#262a31]' : 'bg-[#ADD6FF]' // Change based on the theme
        )}
      >
        <div className="w-[50%] grid flex-end">
          <div className="flex flex-col flex-1 row-start-2">
            <Participant
              {...participants[0]}
              className="flex-row"
              size={'xs'}
            />
            <Participant
              {...participants[1]}
              className="flex-row"
              size={'xs'}
            />
          </div>
          <div className="text-[10px] font-bold col-start-1 row-start-3 flex h-6 gap-2 items-center">
            <div className="">{formattedStartAt.date}</div>
            <div className="bg-[#FFFFFF0D] rounded-lg h-full flex items-center px-1 justify-center">
              {formattedStartAt.time}
            </div>
          </div>
        </div>
        <div className="w-[50%]">
          <div className="row-start-1 col-start-3 flex justify-around flex-1">
            {outcomes.map((outcome, index) => (
              <div>{outcome.selectionName}</div>
            ))}
          </div>
          <div className="flex-1 text-center flex justify-between gap-2 row-start-2 col-start-3 items-center">
            {outcomes.map((outcome, index) => (
              <OutcomeButton
                index={index}
                key={outcome.outcomeId}
                text={''}
                outcome={outcome}
                onSelectOutcome={() => onSelectOutcome(outcome)}
                isPlaced={checkIsBetPlaced(outcome)}
                textAbove={true}
              />
            ))}
          </div>
          <div className="row-start-3 col-start-3 text-end">
            {markets.length} {'>'}
          </div>
        </div>
      </div>
    </Link>
  )
}
