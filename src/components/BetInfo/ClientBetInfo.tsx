'use client'
import BetInfo from "@/components/BetInfo/BetInfo";
import { ExploreContext } from "@/contexts";
import { ChartIcon, ChevronDown, OrderBookIcon } from "@/icons";
import clsx from "clsx";
import { use } from "react";

export default function ClientBetInfo() {
    let { isBetInfoOpen, setIsBetInfoOpen, outcomeSelected, isChartSelected, setIsChartSelected } = use(ExploreContext)

    return (
        <>
            <div className={clsx(
                'w-full bg-gray-600 h-8 rounded-t-lg flex justify-between items-center p-3',
                !isBetInfoOpen && 'rounded-b-lg mb-2',
            )}
                >
                <div>
                    {
                        isChartSelected ? 'Chart' : (isChartSelected === false ? 'Orderbook' : '')
                    }
                </div>
                <div className="flex items-center gap-5">
                    <span className={clsx('p-0.5 rounded-lg hover:cursor-pointer', isChartSelected && 'bg-gray-500 ')} onClick={
                        () => {
                            setIsChartSelected(true)
                        }}>
                        <ChartIcon />
                    </span>
                    <span className={clsx('p-0.5 rounded-lg hover:cursor-pointer', !isChartSelected && isChartSelected !== null && 'bg-gray-500')} onClick={
                        () => {
                            setIsChartSelected(false)
                        }
                    } >
                        <OrderBookIcon />
                    </span>
                    <span className='p2 hover:cursor-pointer' onClick={() => {
                        if (outcomeSelected) {
                            setIsBetInfoOpen(!isBetInfoOpen)
                        }
                    }}>
                        <ChevronDown />
                    </span>
                </div>
            </div>
            <div>

                {
                    isBetInfoOpen && (
                        <div className={clsx(
                            'w-full bg-gray-700 p-2 mb-2 rounded-b-lg',
                            isBetInfoOpen && 'rounded-t-none',
                        )}>
                            <BetInfo />
                        </div>
                    )
                }
            </div>
        </>
    )
}