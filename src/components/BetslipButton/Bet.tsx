import SmallBetCard from "@/components/BetslipButton/SmallBetCard"
import Input from "@/components/BetslipButton/Input"
import Button, { BetButton } from "@/components/Button"
import { SportIcon } from "@/icons"
import { BetOutcome, BetslipItem, useBaseBetslip, useChain, useDetailedBetslip } from "@azuro-org/sdk"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import type { MarketOutcome } from '@azuro-org/toolkit'
import { ExploreContext } from '@/contexts'
import Skeleton from "@/components/Skeleton"
import { formatOdds } from "@/utils"

type BetProps = {
    item: BetslipItem
    conditionId: string
    outcomeId: string
    isLoading: boolean
    onClose: () => void
}

export default function Bet({ item, conditionId, outcomeId, isLoading, onClose }: BetProps) {
    const { clear, removeItem } = useBaseBetslip()
    const { betToken } = useChain()
    const {
        batchBetAmounts,
        odds,
        statuses,
        disableReason,
        isStatusesFetching,
        isOddsFetching,
        isLiveBet,
        changeBatchBetAmount,
    } = useDetailedBetslip()


    const key = `${conditionId}-${outcomeId}`
    let totalOdds = odds[key] || 0
    const _originalOdds = totalOdds // use to calc possible winnings
    totalOdds = formatOdds(totalOdds)

    const betAmount = batchBetAmounts[key] || '0'

    const labelClassName = "text-appGray-600 font-medium"

    return (
        < div
            key={`${item.game.gameId}-${item.outcomeId}-${item.conditionId}`}
            className="flex flex-col gap-4 mt-4 border border-[#FFFFFF0D] rounded-xl p-2 bg-[#0000000D]"
        >
            <div className="flex items-center justify-between ">
                <div className="flex gap-2">
                    <SportIcon
                        sportId={item?.game?.sportId}
                        className="h-[20xp] w-[20px]"
                    />
                    <p className="text-appGray-600">
                        {item.game.sportName} - {item.game.countryName} -
                        {item.game.leagueName}
                    </p>
                </div>
                <Button
                    icon="delete"
                    className="cursor-pointer"
                    onClick={() => {
                        removeItem(item)
                    }}
                    size="sm"
                />
            </div>
            <SmallBetCard outcome={item as unknown as BetOutcome} totalOdds={totalOdds} isOddsFetching={isOddsFetching} betAmount={betAmount} />
            
            <div>
                <span className={labelClassName}>
                    Bet Amount:
                </span>
                <Input item={item} isLoading={isLoading}/>
            </div>
            <div className="flex justify-between">
                <span className={labelClassName}>
                    To win:
                </span>
                <span className="text-md font-semibold text-[#54D09E] text-end">
                    {isOddsFetching ? (
                        <Skeleton className="!w-[50px] !h-[21px]" />
                    ) : (
                        <>
                            {Number(betAmount) < 0 ? (
                                <>0 {betToken.symbol}</>
                            ) : (
                                <>
                                    {(+betAmount * _originalOdds || 0).toFixed(2)}{' '}
                                    {betToken.symbol}
                                </>
                            )}
                        </>
                    )}
                </span>
            </div>
            <BetButton item={item} />
        </div >
    )
}