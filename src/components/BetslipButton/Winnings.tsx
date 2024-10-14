import Skeleton from "@/components/Skeleton";
import { formatOdds } from "@/utils";
import { useChain, useDetailedBetslip } from "@azuro-org/sdk";

type WinningProps = {
    betAmount: string
    originalOdds: number
    isOddsFetching: boolean
}

export default function Winnings({betAmount, originalOdds, isOddsFetching}: WinningProps) {
    const { betToken } = useChain()

    return (
        <span className="text-md font-semibold text-[#54D09E] text-end">
            {isOddsFetching ? (
                <Skeleton className="!w-[50px] !h-[21px]" />
            ) : (
                <>
                    {Number(betAmount) < 0 ? (
                        <>0 {betToken.symbol}</>
                    ) : (
                        <>
                            {(+betAmount * originalOdds || 0).toFixed(2)}{' '}
                            {betToken.symbol}
                        </>
                    )}
                </>
            )}
        </span>
    )
}