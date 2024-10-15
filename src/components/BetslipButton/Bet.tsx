import SmallBetCard from "@/components/BetslipButton/SmallBetCard"
import Input from "@/components/BetslipButton/Input"
import Button, { BetButton } from "@/components/Button"
import { SportIcon } from "@/icons"
import { BetOutcome, BetslipItem, useBaseBetslip, useChain, useDetailedBetslip } from "@azuro-org/sdk"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import type { MarketOutcome } from '@azuro-org/toolkit'
import { ExploreContext } from '@/contexts'
import Skeleton from "@/components/Skeleton"
import { formatOdds } from "@/utils"
import Winnings from "@/components/BetslipButton/Winnings"
import BatchBetButton from "@/components/Button/BatchBetButton"

type BetProps = {
    item: BetslipItem
    conditionId: string
    outcomeId: string,
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void
}

export default function Bet({ item, conditionId, outcomeId, isLoading, setIsLoading }: BetProps) {
    const { clear, removeItem } = useBaseBetslip()
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
    let originalOdds = odds[key] || 0
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
            <SmallBetCard outcome={item as unknown as BetOutcome} betAmount={betAmount}/>
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
                <Winnings betAmount={betAmount} originalOdds={originalOdds} isOddsFetching={isOddsFetching}/>
            </div>
        </div >
    )
}