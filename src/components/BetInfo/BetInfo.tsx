import { ExploreContext } from "@/contexts";
import { use, useContext } from "react";
import { useGame } from "@azuro-org/sdk";
import OrderBookTableSmall from "@/components/OrderBookPage/OrderBookTableSmall";

export default function BetInfo() {
    const { isBetInfoOpen, isChartSelected } = use(ExploreContext)
    const { outcomeSelected } = useContext(ExploreContext)
    const { game, isGameInLive } = useGame({ gameId: outcomeSelected!.gameId })

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
                            {isChartSelected ? 'Chart goes here' : isChartSelected === false ? (
                                <OrderBookTableSmall
                                    outcomeSelected={outcomeSelected}
                                    game={game}
                                    isGameInLive={isGameInLive}
                                />
                            ) : null
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}