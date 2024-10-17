import { ExploreContext } from "@/contexts";
import { use, useContext } from "react";
import { useGame } from "@azuro-org/sdk";
import OrderBookTableSmall from "@/components/OrderBookPage/OrderBookTableSmall";

export default function BetInfo() {
    const { isBetInfoOpen } = use(ExploreContext)
    const { outcomeSelected } = useContext(ExploreContext)

    const { game, isGameInLive } = useGame({ gameId: outcomeSelected!.gameId})
    
    if (!outcomeSelected) {
        return null
    }

    if (!game) {
        return null
    }

    return (
        <>
            <div>
                {
                    isBetInfoOpen && (
                        <div>
                            <OrderBookTableSmall
                                outcomeSelected={outcomeSelected}
                                game={game}
                                isGameInLive={isGameInLive}
                            />
                        </div>
                    )
                }
            </div>
        </>
    )
}