'use client'
import BetInfo from "@/components/BetInfo/BetInfo";
import { ChartIcon, ChevronDown, OrderBookIcon } from "@/icons";
import { useEffect, useState } from "react";

export default function ClientBetInfo() {
    let [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className='w-full bg-gray-700 h-8 mb-2 rounded-lg flex justify-end items-center gap-5 px-2'>
                <ChartIcon />
                <OrderBookIcon />
                <ChevronDown onClick={() => setIsOpen(!isOpen)}/>
            </div>
            <div>

                {
                    isOpen && (
                        <div className='w-full bg-gray-700 h-8 mb-2 rounded-lg flex justify-end items-center gap-5 px-2'>
                            <BetInfo/>
                        </div>
                    )
                }
            </div>
        </>
    )
}