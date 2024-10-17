import { ExploreContext } from "@/contexts";
import { useGameMarkets, useOrderBookV2 } from "@/hooks";
import { ChartIcon, ChevronDown, OrderBookIcon } from "@/icons";
import { useContext, useEffect, useMemo } from "react";
import { getGameStatus } from '@azuro-org/toolkit'
import { useGame } from "@azuro-org/sdk";
import OrderBookPage, { OrderBook } from "@/components/OrderBookPage";

export default function BetInfo() {
    let isOpen = true

    const { outcomeSelected, setOutcomeSelected } = useContext(ExploreContext)

    if (!outcomeSelected) {
        return <div>Loading outcome...</div>;
    }

    useEffect(() => {
        if (outcomeSelected) {
            console.log('outcomeSelected', outcomeSelected)
            isOpen = true
        }
    }, [outcomeSelected]);

    const { game, isGameInLive } = useGame({ gameId: outcomeSelected.gameId })

    if (!game) {
        return <div>Loading game...</div>;
    }

    const { loading, markets } = useGameMarkets({
        gameId: game.gameId,
        gameStatus: getGameStatus({
            graphStatus: game.status,
            startsAt: Number(game.startsAt),
            isGameInLive: isGameInLive,
        }),
    })

    return (
        <>
            <div className='w-full bg-gray-700 h-8 mb-2 rounded-lg flex justify-end items-center gap-5 px-2'>
                <ChartIcon />
                <OrderBookIcon />
                <ChevronDown />
            </div>
            <div>
                {
                    isOpen && (
                        <div className='w-full bg-gray-700 h-8 mb-2 rounded-lg flex justify-end items-center gap-5 px-2'>
                            {/* <OrderBook
                                outcomeRowSelected={outcomeRowSelected}
                                isFetching={isFetching}
                                bets={bets}
                            /> */}
                            mygaskjdfh skjfh
                            <OrderBookPage
                                markets={markets}
                                outcomeSelected={outcomeSelected}
                            />
                        </div>
                    )
                }
            </div>
        </>
    )
}