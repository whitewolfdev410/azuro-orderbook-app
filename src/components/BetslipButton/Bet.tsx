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
import BetInfo from "@/components/BetInfo/BetInfo"
import { useBreakpoints } from "@/hooks"
import BetChart from "@/components/BetChart/BetChart"
import { useTheme } from "@/app/ThemeContext"

type BetProps = {
    item: BetslipItem
    conditionId: string
    outcomeId: string,
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void,
    setSelectedIndex: (selectedIndex: string | null) => void,
    isSelected: boolean,
    selectedIndex: string | null,
}

export default function Bet({ item, conditionId, outcomeId, isLoading, setIsLoading, setSelectedIndex, isSelected, selectedIndex }: BetProps) {
    const { items, removeItem } = useBaseBetslip()
    const {
        batchBetAmounts,
        odds,
        isOddsFetching,
    } = useDetailedBetslip()
    const {theme} = useTheme()
    const { setOutcomeSelected, outcomeSelected, setIsBetInfoOpen, isChartSelected, setIsChartSelected, isBetInfoOpen } = useContext(ExploreContext)
    const breakpoints = useBreakpoints()
    const key = `${conditionId}-${outcomeId}`
    const originalOdds = odds[key] || 0
    const betAmount = batchBetAmounts[key] || '0'
    const labelClassName = "text-appGray-600 text-xs"
    const index = `${item.outcomeId} ${item.game.gameId} ${item.conditionId}`

    let locked = false
    const onClick = () => {
        let itemFound = false
        for (let count = 0; count < items.length; count++) {
            if (items[count].conditionId === item.conditionId && items[count].outcomeId === item.outcomeId) {
                const newItem = items[count] as unknown as CustomMarketOutcome
                newItem._outcomeSelected = count
                !isBetInfoOpen && setIsBetInfoOpen(true)
                !locked && setIsChartSelected(false)
                setOutcomeSelected(newItem)
                itemFound = true
            }
        }
        setSelectedIndex(index)
        if (!itemFound) {
            throw new Error('Item not found')
        }
    }

    return (
        < div
            key={`${item.game.gameId}-${item.outcomeId}-${item.conditionId}`}
            className={clsx(
                "grid rows-auto-rows grid-cols-[2fr_1fr] items-center mt-2 border border-[#FFFFFF0D] rounded-xl p-2 hover:cursor-pointer",
                theme === 'dark' ? "bg-[#0000000d]" : "bg-white border border-gray-300",
                isSelected && "bg-[#feefef0d]",
            )}
            onClick={onClick}
        >
            <div className="row-start-1 col-start-1">
                {/* <SportIcon
                        sportId={item?.game?.sportId}
                        className="h-[20xp] w-[20px]"
                    /> */}
                <p className={clsx("inline px-3 py-1 rounded-2xl text-button-LightGreen md:text-[12px] text-[10px]",
                    theme === "dark" ? "bg-appGray-100" : "bg-gray-200", 
                )}>
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
                    className={clsx("cursor-pointer",
                        theme === 'light' && 'hover:bg-gray-300'
                    )}
                    onClick={() => {
                        removeItem(item)
                    }}
                    size="sm"
                />
            </div>
            <div className={clsx("row-start-2 col-start-1 font-light pr-1",
                "max-xl:col-span-2",
                "max-lg:col-span-1",
                item.game.sportSlug === 'politics' && 'row-span-2'
            )}>
                {item.marketName}
            </div>
            {
                item.game.sportSlug !== 'politics' && 
                <div className={clsx("row-start-3 col-start-1 font-light pr-1",
                    "max-xl:col-span-2",
                    "max-lg:col-span-1"
                )}>
                {item.game.title}
            </div>
            }

            {/* <SmallBetCard outcome={item as unknown as BetOutcome} betAmount={betAmount} /> */}
            <div className={clsx("xl:row-start-2 xl:row-span-2 xl:col-start-2",
                "max-xl:row-start-4 max-xl:col-span-2",
                "max-lg:row-start-2 max-lg:row-span-2 max-lg:col-start-2",
            )}
            >
                {/* <span className={labelClassName}>
                    Bet Amount:
                </span> */}
                <Input item={item} isLoading={isLoading} />
            </div>
            {(breakpoints.isXxs || !breakpoints.isXs) &&
                <div className="xl:row-start-4 row-start-6 col-start-1 max-xl:col-span-2 flex xl:items-center max-xl:text-center max-xl:p-1 gap-2 mt-2 max-xl:hidden max-sm:block">
                    <button title="chart" className={clsx("hover:cursor-pointer rounded-lg p-1", isSelected && isChartSelected && 'bg-gray-500')} onClick={() => {
                        locked = true
                        setIsChartSelected(true)
                    }}>
                        <div className="flex gap-2 p-1">
                            {!breakpoints.isLg && <ChartIcon />} <text>{!breakpoints.isXl && 'Chart'}</text>
                        </div>
                    </button>
                    <button title="orderbook" className={clsx("hover:cursor-pointer rounded-lg p-1", isSelected && !isChartSelected && 'bg-gray-500')} onClick={() => {
                        setIsChartSelected(false)
                    }}>
                        <div className="flex gap-2 p-1">
                            {!breakpoints.isLg && <OrderBookIcon />} {!breakpoints.isXl && 'Orderbook'}
                        </div>
                    </button>
                </div>
            }
            <div className="xl:row-start-4 xl:col-start-2 row-start-5 col-start-1 max-xl:col-span-2 text-end space-x-2 flex flex-row items-center justify-end flex-wrap">
                <span className={labelClassName}>
                    Return:
                </span>
                <Winnings betAmount={betAmount} originalOdds={originalOdds} isOddsFetching={isOddsFetching} />
            </div>
            {outcomeSelected && (breakpoints.isSm || breakpoints.isMd || breakpoints.isXs) && index === selectedIndex &&
                <div className="row-start-7 col-span-2 flex justify-around mt-2">
                    {breakpoints.isXxs ?
                        (isChartSelected ? <BetChart conditionId={outcomeSelected.conditionId} /> : null) :
                            <div className="w-[50%]">
                                <BetChart conditionId={outcomeSelected.conditionId} />
                            </div>
                    }
                    {breakpoints.isXxs ?
                        (!isChartSelected ? <BetInfo /> : null) :
                                <BetInfo ignoreChartSelected={true}/>
                    }
                </div>
            }
        </div>
    )
}