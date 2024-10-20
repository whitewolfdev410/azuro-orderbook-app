'use client'
import { useTheme } from '@/app/ThemeContext'
import { OutcomeButton } from '@/components/Button'
import { ExploreContext } from '@/contexts'
import { TGame } from '@/types'
import { formatTime } from '@/utils'
import {
  BetType,
  useActiveMarkets,
  useGame,
  usePrematchBets,
} from '@azuro-org/sdk'
import { MarketOutcome, getGameStatus } from '@azuro-org/toolkit'
import clsx from 'clsx'
import Link from 'next/link'
import { useCallback, useContext, useMemo } from 'react'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import Participant from './Participant'
import { useRouter } from 'next/navigation'

export type GameCardListProps = {
  className?: string
  game: TGame
}

export default function GameCardList(props: Readonly<GameCardListProps>) {
  const { className, game } = props
  const { gameId, league, startsAt, sport, participants, status } = game
  const { isGameInLive } = useGame({ gameId: game.gameId })
  const router = useRouter()
  const formattedStartAt = useMemo(() => formatTime(startsAt), [startsAt])

  // Get the game status and active markets
  const gameStatus = getGameStatus({
    graphStatus: status,
    startsAt: Number(startsAt),
    isGameInLive: isGameInLive,
  })
  const { loading, markets } = useActiveMarkets({
    gameId,
    gameStatus,
  })

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
  const { theme } = useTheme()

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click was on a button, if yes, don't trigger navigation
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      router.push(`/event/${gameId}`);  // Change to your new page path
    }
  };

  return (
    <div>
      <div
        className={clsx(
          'p-[15px] h-full',
          className,
          'mb-1 rounded-lg min-h-[100px]',
          theme === 'dark' ? 'bg-[#262a31]' : 'bg-[#ADD6FF]', // Change based on the theme
          'grid auto-rows-auto grid-cols-[2fr_1fr_2fr_1fr_2fr]',
          // 'lg:grid-cols-5', // Keep the desktop grid layout
          'gradient-border-mask hover:border-3',
          'hover:cursor-pointer'
        )}
        onClick={handleCardClick}
      >
        <div className="col-start-1 row-start-2 col-span-2 flex flex-col flex-1">
          <Participant {...participants[0]} className="flex-row" size={'xs'} />
          <Participant {...participants[1]} className="flex-row" size={'xs'} />
        </div>

        <div className="col-start-1 row-start-3 text-[10px] font-bold flex h-6 gap-2 items-center">
          <div className="">{formattedStartAt.date}</div>
          <div className="bg-[#FFFFFF0D] rounded-lg h-full flex items-center px-1 justify-center">
            {formattedStartAt.time}
          </div>
        </div>

        <div className="row-start-2 col-start-2 flex items-center justify-end">
          {markets[1]?.outcomeRows[0].length < 3 && markets[1]?.name}
        </div>
        <div className="row-start-1 col-start-3 flex justify-around items-center">
          {markets[1]?.outcomeRows[0].length < 3 &&
            markets[1]?.outcomeRows[0].map((outcome, index) => (
              <div key={index}>{outcome.selectionName}</div>
            ))}
        </div>
        <div className="row-start-2 col-start-3 flex justify-around items-center">
          {markets[1]?.outcomeRows[0].length < 3 &&
            markets[1]?.outcomeRows[0].map((outcome, index) => (
              <div>
                <OutcomeButton
                  index={index}
                  key={outcome.outcomeId}
                  text={''}
                  outcome={outcome}
                  onSelectOutcome={() => onSelectOutcome(outcome)}
                  isPlaced={checkIsBetPlaced(outcome)}
                />
              </div>
            ))}
        </div>

        <div className="row-start-2 col-start-4 flex items-center justify-end pr-4">
          {markets[0]?.name}
        </div>
        <div className="row-start-1 col-start-5 flex justify-around items-center">
          {markets[0]?.outcomeRows[0].map((outcome, index) => (
            <div key={index}>{outcome.selectionName}</div>
          ))}
        </div>
        <div className="row-start-2 col-start-5 flex justify-around items-center">
          {markets[0]?.outcomeRows[0].map((outcome, index) => (
            <div>
              <OutcomeButton
                index={index}
                key={outcome.outcomeId}
                text={''}
                outcome={outcome}
                onSelectOutcome={() => onSelectOutcome(outcome)}
                isPlaced={checkIsBetPlaced(outcome)}
              />
            </div>
          ))}
        </div>

        <div className="row-start-3 col-start-5 text-end">
          {markets.length} {'>'}
        </div>
      </div>
    </div>
  )
}
