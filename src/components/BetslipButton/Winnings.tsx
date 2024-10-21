import Skeleton from "@/components/Skeleton";
import { ExploreContext } from "@/contexts";
import { use } from "react";

type WinningProps = {
    betAmount: string
    originalOdds: number
    isOddsFetching: boolean
}

export default function Winnings({betAmount, originalOdds, isOddsFetching}: WinningProps) {
    const {betTokenSymbol: symbol} = use(ExploreContext)

    return (
        <span className="text-md font-semibold text-[#54D09E] text-end">
            {isOddsFetching ? (
                <Skeleton className="!w-[50px] !h-[21px]" />
            ) : (
                <>
                    {Number(betAmount) <= 0 ? (
                        <>{symbol} 0</>
                    ) : (
                        <>
                            {symbol}
                            {Number((+betAmount * originalOdds || 0).toFixed(2)).toLocaleString('en')}{' '}
                        </>
                    )}
                </>
            )}
        </span>
    )
}