import { ExploreContext } from "@/contexts";
import { useGameMarkets, useOrderBookV2 } from "@/hooks";
import { use, useContext, useEffect } from "react";
import { getGameStatus } from '@azuro-org/toolkit'
import { useGame } from "@azuro-org/sdk";

export default function BetInfo() {
    const {isBetInfoOpen} = use(ExploreContext)

    const { outcomeSelected } = useContext(ExploreContext)

    useEffect(() => {
        if (isBetInfoOpen) {
            console.log('wlksdjflsdkjfsdlk')
        }
    }, [isBetInfoOpen])

    if (!outcomeSelected) {
        throw new Error("Outcome selected is not defined")
    }

    const { game, isGameInLive } = useGame({ gameId: outcomeSelected.gameId })

    if (!game) {
        throw new Error("Game is not defined")
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
            hi
        </>
    )
}