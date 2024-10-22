import { useTheme } from "@/app/ThemeContext";
import Skeleton from "@/components/Skeleton";
import { ExploreContext } from "@/contexts";
import clsx from "clsx";
import { use } from "react";

type WinningProps = {
    betAmount: string
    originalOdds: number
    isOddsFetching: boolean
}

export default function Winnings({betAmount, originalOdds, isOddsFetching}: WinningProps) {
    const {betTokenSymbol: symbol} = use(ExploreContext)
    const {theme} = useTheme()
    return (
        <span className={clsx("text-md font-semibold text-end",
            theme === 'dark' ? 'text-[#54D09E]' : 'text-[#1f842a]'
        )}>
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