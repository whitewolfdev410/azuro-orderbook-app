'use client'
import { GameInfo, GameMarkets } from '@/components'
import { LoadingGameInfo } from '@/components/Loading'
import { BetModal } from '@/components/Modal'
import { GameInfoNotFound } from '@/components/NotFound'
import { BetSuccessNoti } from '@/components/Noti'
import OrderBookPage from '@/components/OrderBookPage'
import Skeleton, {
  SkeletonArray,
  makeSkeletonArray,
} from '@/components/Skeleton'
import { ExploreContext } from '@/contexts'
import { useGameMarkets } from '@/hooks'
import { useGame, useGameStatus } from '@azuro-org/sdk'
import type { GameQuery, GameStatus } from '@azuro-org/toolkit'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

export type MarketsProps = {
  gameId: string
  gameStatus: GameStatus
}

const Markets: React.FC<MarketsProps> = ({ gameId, gameStatus }) => {
  // throw new Error('Not implemented')
  // TODO - find out why still implemented

  const { loading, markets } = useGameMarkets({
    gameId,
    gameStatus,
  })

  const { outcomeSelected, setOutcomeSelected } = useContext(ExploreContext)

  if (loading) {
    return (
      <div className="max-w-[800px] mx-auto mt-12 space-y-6">
        {makeSkeletonArray(3).map((key) => (
          <div key={key}>
            <Skeleton className="!w-[70px] !h-[20px]" />
            <div className="flex gap-4 mt-2 flex-col sm:flex-row sm:h-auto h-[200px]">
              <SkeletonArray
                length={2}
                className="flex-1 !h-[80px] rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!markets) {
    return null
  }

  return (
    <>
      {/* <BetModal
        onClose={() => {
          setOutcomeSelected(null)
        }}
        isOpen={Boolean(outcomeSelected)}
        modalBody={
          outcomeSelected && (
            <OrderBookPage
              markets={markets}
              outcomeSelected={outcomeSelected}
            />
          )
        }
      /> */}
      <GameMarkets
        markets={markets}
        onSelectOutcome={(outcome) => {
          setOutcomeSelected(outcome)
        }}
      />
    </>
  )
}

type ContentProps = {
  game: GameQuery['games'][0]
  isGameInLive: boolean
}

const Content: React.FC<ContentProps> = ({ game, isGameInLive }) => {
  const { status: gameStatus } = useGameStatus({
    startsAt: +game.startsAt,
    graphStatus: game.status,
    isGameExistInLive: isGameInLive,
  })

  return (
    <>
      <BetSuccessNoti />
      <GameInfo game={game} />
      <Markets gameId={game.gameId} gameStatus={gameStatus} />
    </>
  )
}

export default function Game() {
  const params = useParams()
  const { loading, game, isGameInLive } = useGame({
    gameId: params.id as string,
  })

  if (loading) {
    return <LoadingGameInfo />
  }

  if (!game) {
    return <GameInfoNotFound />
  }

  return <Content game={game} isGameInLive={isGameInLive} />
}
