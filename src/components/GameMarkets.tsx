'use client'
import { OutcomeButton } from '@/components/Button'
import { useAddEvent, useOrderBook } from '@/hooks'
import { EVENT } from '@/utils'
import { BetType, usePrematchBets } from '@azuro-org/sdk'
import type { GameMarkets, MarketOutcome } from '@azuro-org/toolkit'
import { useCallback } from 'react'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'

export type MarketProps = {
  name: string
  outcomes: MarketOutcome[]
  onSelectOutcome: (outcome: MarketOutcome) => void
  checkIsBetPlaced: (outcome: MarketOutcome) => boolean
}

const Market: React.FC<Readonly<MarketProps>> = ({
  name,
  outcomes,
  onSelectOutcome,
  checkIsBetPlaced,
}) => {
  const conditionId = outcomes[0].conditionId

  const { totalAmount, refetchBets } = useOrderBook({
    conditionId,
    outcomes,
  })
  useAddEvent(EVENT.apolloGameMarkets, () => {
    refetchBets()
  })

  return (
    <div className="bg-[#FFFFFF0D] p-4 rounded-xl">
      <div className="font-semibold text-base mb-4">
        {name}
        <span className="text-[12px] text-appGray-600 font-normal ml-2">
          {totalAmount > 0 && `$${totalAmount.toFixed(2)} Bet`}
        </span>
      </div>
      <div className="flex gap-6 flex-col sm:flex-row">
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
  )
}

type GameMarketsProps = {
  markets: GameMarkets
  onSelectOutcome: (outcome: MarketOutcome) => void
}

export function GameMarkets(props: Readonly<GameMarketsProps>) {
  const { address } = useAccount()
  const { bets } = usePrematchBets({
    filter: {
      type: BetType.Accepted,
      bettor: address as Address,
    },
  })

  const { markets } = props

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
    <div className="max-w-[800px] mx-auto mt-12 space-y-6">
      {markets.map(({ name, outcomeRows }) => {
        return outcomeRows.map((outcomes) => (
          <Market
            key={`${name}-${outcomes[0].selectionName}`}
            name={name}
            outcomes={outcomes.map((outcome) => ({
              ...outcome,
              marketName: name,
            }))}
            onSelectOutcome={props.onSelectOutcome}
            checkIsBetPlaced={checkIsBetPlaced}
          />
        ))
      })}
    </div>
  )
}
