import { CustomMarketOutcome } from "@/contexts"
import { formatOdds } from "@/utils"
import { useDetailedBetslip } from "@azuro-org/sdk"
import clsx from "clsx"
import { MarketOutcome } from '@azuro-org/toolkit'
import { useGame } from "@azuro-org/sdk"
import { getGameStatus } from '@azuro-org/toolkit'
import { useFixDisableReason, useGameMarkets, useOrderBookV2 } from "@/hooks"
import { useMemo } from "react"

type OrderBookTableSmallProps = {
    outcomeSelected: MarketOutcome | CustomMarketOutcome,
    game: NonNullable<ReturnType<typeof useGame>['game']>,
    isGameInLive: boolean,
}

export default function OrderBookTableSmall({ game, isGameInLive, outcomeSelected }: OrderBookTableSmallProps) {
    const { changeBatchBetAmount } = useDetailedBetslip()

    const { loading, markets } = useGameMarkets({
        gameId: game.gameId,
        gameStatus: getGameStatus({
            graphStatus: game.status,
            startsAt: Number(game.startsAt),
            isGameInLive: isGameInLive,
        }),
    })

    useFixDisableReason(outcomeSelected)

    const { data: bets, isFetching } = useOrderBookV2({
        conditionId: outcomeSelected.conditionId,
        outcomeId: outcomeSelected.outcomeId,
    })

    return (
        <>
            {isFetching || loading ? (
                <div>
                    Loading...
                </div>
            ) : 
                < div className="grid grid-cols-2">
                    {bets && !!bets?.length ? (
                        bets.map(({ betAmount, odds }, index) => {
                            return (
                                <div
                                    key={index}
                                    className="cursor-pointer hover:bg-slate-500 rounded-lg grid grid-cols-2 p-0.5"
                                    onClick={() => {
                                        changeBatchBetAmount(outcomeSelected, betAmount)
                                    }}
                                >
                                    <span className="text-base text-[#54D09E]">
                                        {`${formatOdds(odds).toFixed(2)}¢`}
                                    </span>
                                    <span className="text-base">
                                        $
                                        {Number(parseFloat(betAmount).toFixed(2)).toLocaleString(
                                            'en'
                                        )}
                                    </span>
                                </div>
                            )
                        })
                    ) : (
                        <div>
                            No orderbook data
                        </div>
                    )}
                </div >
            }
        </>
    )
}