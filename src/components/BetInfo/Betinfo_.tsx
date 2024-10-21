import { ExploreContext } from "@/contexts";
import { use, useContext } from "react";
import { useGame } from "@azuro-org/sdk";
import OrderBookTableSmall from "@/components/OrderBookPage/OrderBookTableSmall";
import BetChart from "@/components/BetChart/BetChart";

type BetInfoProps = {
    isBetInfoOpen: boolean
    isChartSelected: boolean | null
    outcomeSelected: any
    ignoreChartSelected?: boolean
}

export default function BetInfo_({ isBetInfoOpen, isChartSelected, outcomeSelected, ignoreChartSelected = false }: BetInfoProps) {
    const { game, isGameInLive } = useGame({ gameId: outcomeSelected!.gameId })

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