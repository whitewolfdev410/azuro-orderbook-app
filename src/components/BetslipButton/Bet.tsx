import SmallBetCard from "@/components/BetslipButton/SmallBetCard"
import Button, { BetButton } from "@/components/Button"
import { SportIcon } from "@/icons"
import { BetOutcome, BetslipItem, useBaseBetslip, useDetailedBetslip } from "@azuro-org/sdk"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import type { MarketOutcome } from '@azuro-org/toolkit'
import { ExploreContext } from '@/contexts'

type BetProps = {
    item: BetslipItem
    conditionId: string
    outcomeId: string
    isLoading: boolean
    onClose: () => void
}

export default function Bet({ item, conditionId, outcomeId, isLoading, onClose }: BetProps) {
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
            <SmallBetCard outcome={item as unknown as BetOutcome} />
            <div className="flex mt-2 px-2 py-2 items-center justify-between border-appGray-100 border rounded-lg h-[56px]">

                <input
                    type="number"
                    className="text-[#B58EEA] bg-transparent border-none outline-none focus:ring-0 resize-none w-full text-right px-2 input-no-arrow"
                    value={batchBetAmounts[`${conditionId}-${outcomeId}`]}
                    onChange={(event) => {
                        if (event.target.value.length > 16) {
                            return
                        }
                        changeBatchBetAmount(
                            item,
                            Number(event.target.value) < 0 ? '0' : event.target.value
                        )
                    }}
                    max={16}
                    placeholder="Enter Bet amount"
                    disabled={isLoading}
                />
            </div>
            {/* <Button
                onClick={() => {
                    navigate.push('/event/' + item.game.gameId)
                    setOutcomeSelected(item as unknown as MarketOutcome)
                    onClose()
                }}
                variant="outlineGradient"
                contentClass="!bg-[#23282F] w-full"
            >
                Place Bet
            </Button> */}
            <BetButton item={item} />

        </div >
    )
}