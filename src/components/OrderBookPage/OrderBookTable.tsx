import { CustomMarketOutcome } from "@/contexts"
import { formatOdds } from "@/utils"
import { useDetailedBetslip } from "@azuro-org/sdk"
import clsx from "clsx"
import { MarketOutcome } from '@azuro-org/toolkit'

export default function OrderBookTable({bets, selectedOutcome} : {bets: any[] | undefined, selectedOutcome: MarketOutcome | CustomMarketOutcome }) {
    const { changeBatchBetAmount } = useDetailedBetslip()

    return (
        <table className={clsx('min-w-full text-white border-none ')}>
            <thead className="border-b border-white border-opacity-10 sticky top-0 bg-[#242931] z-10">
                <tr className="text-sm font-semibold text-white uppercase">
                    <th className="pl-6 text-[10px] py-2 text-left">Price</th>
                    <th className="text-[10px] py-2 text-left">Amount</th>
                </tr>
            </thead>
            <tbody>
                {bets && !!bets?.length ? (
                    bets.map(({ betAmount, odds }, index) => {
                        return (
                            <tr
                                key={index}
                                className="cursor-pointer hover:bg-white hover:bg-opacity-10"
                                onClick={() => {
                                    changeBatchBetAmount(selectedOutcome, betAmount)
                                }}
                            >
                                <td className="pl-6 pr-3 py-2 text-base text-[#54D09E]">{`${formatOdds(odds).toFixed(2)}¢`}</td>
                                <td className="py-2 text-base">
                                    $
                                    {Number(parseFloat(betAmount).toFixed(2)).toLocaleString(
                                        'en'
                                    )}
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={4} className="text-center py-4">
                            No data available.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}