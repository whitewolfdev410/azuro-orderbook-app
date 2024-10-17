'use client'
import BetInfo from "@/components/BetInfo/BetInfo";
import { ExploreContext } from "@/contexts";
import { ChartIcon, ChevronDown, OrderBookIcon } from "@/icons";
import { use } from "react";

export default function ClientBetInfo() {
    let { isBetInfoOpen, setIsBetInfoOpen, outcomeSelected } = use(ExploreContext)

    return (
        <>
            <div className='w-full bg-gray-700 h-8 mb-2 rounded-lg flex justify-end items-center gap-5 px-2'>
                <ChartIcon />
                <OrderBookIcon />
                <ChevronDown onClick={() => {
                    if (outcomeSelected) {
                        setIsBetInfoOpen(!isBetInfoOpen)
                    }
                }} className="hover:cursor-pointer"/>
            </div>
            <div>

                {
                    isBetInfoOpen && (
                        <div className='w-full bg-gray-700 rounded-lg p-2 mb-2'>
                            <BetInfo />
                        </div>
                    )
                }
            </div>
        </>
    )
}