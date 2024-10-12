'use client'
import { SportIcon } from '@/icons'
import { TGame } from '@/types'
import { formatTime } from '@/utils'
import clsx from 'clsx'
import Link from 'next/link'
import { useCallback, useContext, useMemo } from 'react'
import Participant from './Participant'
import { OutcomeButton } from '@/components/Button'
import { BetType, useActiveMarkets, usePrematchBets } from '@azuro-org/sdk'
import { getGameStatus, MarketOutcome } from '@azuro-org/toolkit'
import { useAccount } from 'wagmi'
import { Address } from 'viem'
import { ExploreContext } from '@/contexts'

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
  const gameStatus = getGameStatus({ graphStatus: status, startsAt: Number(startsAt), isGameInLive: false })
  const { loading, markets } = useActiveMarkets({
    gameId,
    gameStatus,
  })

  debugger;
  const outcomes = markets?.[0]?.outcomeRows?.[0] || []
  const outcomeName = markets?.[0]?.name || ''

  const { outcomeSelected, setOutcomeSelected: onSelectOutcome } = useContext(ExploreContext)
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

  return (
    <Link href={`/event/${gameId}`}>
      <div className="hover:bg-gradient-to-l hover:from-[#ff65a6] hover:via-[#b37ed3] hover:to-[#5e64eb] p-[1px] rounded-lg h-full">
        <div
          className={clsx(
            className,
            'p-4 bg-[#262a31] rounded-lg min-h-[100px] flex'
          )}
        >
          {/* <div>
            <p className="font-bold flex flex-items gap-2 overflow-hidden text-ellipsis w-full">
              <SportIcon sportId={sport.sportId} />
              {league.country.name} &middot; {league.name}
            </p>
          </div> */}
          <div className="flex gap-2 items-center justify-between w-full">
            <div className="flex flex-col flex-1">
              <Participant {...participants[0]} className="flex-row" />
              <Participant {...participants[1]} className="flex-row" />
            </div>
            <div className="text-[10px] font-bold">
              <div className="bg-[#FFFFFF0D] rounded-lg p-1 flex items-center justify-center mb-1">
                {formattedStartAt.time}
              </div>
              {formattedStartAt.date}
            </div>
            <div className="flex-1 text-center">
                {outcomeName}
                <div className="flex flex-row justify-between gap-2">
                  {outcomes.map((outcome, index) => (
                    <OutcomeButton
                      index={index}
                      key={outcome.outcomeId}
                      text={outcome.selectionName}
                      outcome={outcome}
                      onSelectOutcome={() => onSelectOutcome(outcome)}
                      isPlaced={checkIsBetPlaced(outcome)}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
