import SmallBetCard from "@/components/BetslipButton/SmallBetCard"
import Input from "@/components/BetslipButton/Input"
import Button, { BetButton } from "@/components/Button"
import { ChartIcon, OrderBookIcon, SportIcon } from "@/icons"
import { BetOutcome, BetslipItem, useBaseBetslip, useChain, useDetailedBetslip } from "@azuro-org/sdk"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import type { MarketOutcome } from '@azuro-org/toolkit'
import { CustomMarketOutcome, ExploreContext } from '@/contexts'
import Skeleton from "@/components/Skeleton"
import { formatOdds } from "@/utils"
import Winnings from "@/components/BetslipButton/Winnings"
import BatchBetButton from "@/components/Button/BatchBetButton"
import clsx from "clsx"

type BetProps = {
    item: BetslipItem
    conditionId: string
    outcomeId: string,
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void,
    setSelectedIndex: (selectedIndex: string | null) => void,
    isSelected: boolean
}

export default function Bet({ item, conditionId, outcomeId, isLoading, setIsLoading, setSelectedIndex, isSelected }: BetProps) {
    const { items, removeItem } = useBaseBetslip()
    const {
        batchBetAmounts,
        odds,
        isOddsFetching,
    } = useDetailedBetslip()
    const { setOutcomeSelected, setIsBetInfoOpen, isChartSelected, setIsChartSelected } = useContext(ExploreContext)

    const key = `${conditionId}-${outcomeId}`
    const originalOdds = odds[key] || 0
    const betAmount = batchBetAmounts[key] || '0'
    const labelClassName = "text-appGray-600 text-xs"

    let locked = false
    const onClick = () => {
        let itemFound = false
        for (let count = 0; count < items.length; count++) {
            if (items[count].selectionName === item.selectionName) {
                const newItem = items[count] as unknown as CustomMarketOutcome
                newItem._outcomeSelected = count
                setIsBetInfoOpen(true)
                !locked && setIsChartSelected(false)
                setOutcomeSelected(newItem)
                itemFound = true
            }
        }
        setSelectedIndex(`${item.game.gameId}-${item.outcomeId}-${item.conditionId}`)
        if (!itemFound) {
            throw new Error('Item not found')
        }
    }

    return (
        < div
            key={`${item.game.gameId}-${item.outcomeId}-${item.conditionId}`}
            className={clsx(
                "grid grid-rows-4 grid-cols-[2fr_1fr] items-center mt-2 border border-[#FFFFFF0D] rounded-xl p-2 bg-[#0000000D] hover:cursor-pointer",
                isSelected && "bg-[#feefef0d]",
            )}
            onClick={onClick}
        >
            <div className="row-start-1 col-start-1">
                {/* <SportIcon
                        sportId={item?.game?.sportId}
                        className="h-[20xp] w-[20px]"
                    /> */}
                <p className="inline bg-appGray-100 px-3 py-1 rounded-2xl text-button-LightGreen text-[10px]">
                    {/* {item.game.sportName} - {item.game.countryName} -
                        {item.game.leagueName} */}
                    {item.selectionName}
                </p>
            </div>
            <div className="row-start-1 col-start-2 flex items-center justify-end space-x-1">
                <span>
                    {originalOdds.toFixed(2)}
                </span>
                <Button
                    icon="delete"
                    className="cursor-pointer"
                    onClick={() => {
                        removeItem(item)
                    }}
                    size="sm"
                />
            </div>
            <div className="row-start-2 col-start-1">
                {item.marketName}
            </div>
            <div className="row-start-3 col-start-1">
                {item.game.title}
            </div>

            {/* <SmallBetCard outcome={item as unknown as BetOutcome} betAmount={betAmount} /> */}
            <div className="row-start-2 row-span-2 col-start-2">
                {/* <span className={labelClassName}>
                    Bet Amount:
                </span> */}
                <Input item={item} isLoading={isLoading} />
            </div>
            <div className="row-start-4 col-start-1 flex items-center gap-2">
                <span className={clsx("hover:cursor-pointer rounded-lg p-1", isSelected && isChartSelected && 'bg-gray-500')} onClick={() => {
                    locked = true
                    setIsChartSelected(true)
                }}>
                    <ChartIcon />
                </span>
                <span className={clsx("hover:cursor-pointer rounded-lg p-1", isSelected && !isChartSelected && 'bg-gray-500')} onClick={() => {
                    setIsChartSelected(false)
                }}>
                    <OrderBookIcon />
                </span>
            </div>
            <div className="row-start-4 col-start-2 flex items-center justify-end space-x-4">
                <span className={labelClassName}>
                    To win:
                </span>
                <Winnings betAmount={betAmount} originalOdds={originalOdds} isOddsFetching={isOddsFetching} />
            </div>
        </div>
    )
}