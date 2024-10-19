'use client'
import { OutcomeButton } from '@/components/Button'
import { useAddEvent, useOrderBook } from '@/hooks'
import { InfoIcon } from '@/icons'
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
  description: string
}

const Market: React.FC<Readonly<MarketProps>> = ({
  name,
  outcomes,
  onSelectOutcome,
  checkIsBetPlaced,
  description,
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
      <div className="flex justify-between font-semibold text-base mb-4">
        <span className="flex space-x-2 items-center">
          <span>
            {name}
          </span>
          <span className="cursor-pointer tooltip-container">
            <div className="tooltip-text">
              {description}
            </div>
            <InfoIcon />
          </span>
        </span>
        <span className="text-[12px] text-appGray-600 font-normal ml-2">
          {totalAmount > 0 && `$${totalAmount.toFixed(2)}`}
        </span>
      </div>
      <div className="flex gap-6 flex-row">
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
      {markets.map(({ name, outcomeRows, description }) => {
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
            description={description}
          />
        ))
      })}
    </div>
  )
}
