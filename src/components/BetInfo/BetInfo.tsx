import { ExploreContext } from "@/contexts";
import { use, useContext } from "react";
import { useGame } from "@azuro-org/sdk";
import OrderBookTableSmall from "@/components/OrderBookPage/OrderBookTableSmall";
import BetChart from "@/components/BetChart/BetChart";

export default function BetInfo({ ignoreChartSelected = false }: { ignoreChartSelected?: boolean }) {
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
                            {!ignoreChartSelected ?
                                (isChartSelected ? <BetChart conditionId={outcomeSelected.conditionId} /> : isChartSelected === false ? (
                                    <OrderBookTableSmall
                                        outcomeSelected={outcomeSelected}
                                        game={game}
                                        isGameInLive={isGameInLive}
                                    />
                                ) : null) : <OrderBookTableSmall
                                    outcomeSelected={outcomeSelected}
                                    game={game}
                                    isGameInLive={isGameInLive}
                                />
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}