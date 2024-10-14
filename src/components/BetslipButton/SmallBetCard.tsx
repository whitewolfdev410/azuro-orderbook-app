import { formatNumber, formatOdds, formatTime } from '@/utils'
import { useChain, useDetailedBetslip, type BetOutcome } from '@azuro-org/sdk'
import { useMemo } from 'react'
import { AvatarParticipants } from '../Avatar'
import Skeleton from '@/components/Skeleton'

export type SmallBetCardProps = {
  outcome: BetOutcome,
  betAmount: string,
  isOddsFetching: boolean,
  totalOdds: number
}

const SmallBetCard = (props: Readonly<SmallBetCardProps>) => {
  const { outcome, betAmount, isOddsFetching, totalOdds } = props

  const game = outcome.game

  const formattedStartAt = useMemo(
    () => formatTime(game.startsAt),
    [game.startsAt]
  )

  const additionalRowsInfo = useMemo(
    () => [
      {
        text: formattedStartAt.time,
        className:
          'rounded-[4px] px-2 py-1 bg-appGray-50 font-bold text-[11px]',
      },
      {
        text: formattedStartAt.date,
        className: 'text-[11px]',
      },
    ],
    [formattedStartAt]
  )

  const rows = useMemo(
    () => [
      {
        label: 'Market',
        value: outcome.marketName,
        valueClassName: 'text-[12px]',
      },
      {
        label: 'Outcome',
        value: outcome.selectionName,
        valueClassName:
          'bg-appGray-100 px-3 py-1 rounded-2xl text-button-LightGreen text-[10px]',
      },
      {
        label: 'Price',
        value: `${+betAmount <= 0 ? 0 : totalOdds.toFixed(2)}¢`,
        valueClassName: 'text-[12px]',
      },
    ],
    [outcome, isOddsFetching]
  )

  return (
    <div className="bg-appGray-50 rounded-xl border border-appGray-100 mb-5">
      <div className="px-4 py-2">
        {game.participants.map((participant, index) => (
          <div key={participant.name} className="flex items-center gap-2 mb-2">
            <AvatarParticipants
              name={participant.name}
              image={participant?.image ?? ''}
            />
            <div className="flex-1">{participant.name}</div>
            {additionalRowsInfo[index] && (
              <div className={additionalRowsInfo[index].className}>
                {additionalRowsInfo[index].text}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full h-[1px] bg-appGray-100" />
      <div className="px-4 py-2 space-y-3">
        {rows.map((row) => (
          <div
            className="flex items-center justify-between font-medium"
            key={row.value}
          >
            <div className="text-appGray-600">{row.label}</div>
            <div className={row?.valueClassName}>{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SmallBetCard
