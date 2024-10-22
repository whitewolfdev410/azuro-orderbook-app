import { useTheme } from "@/app/ThemeContext"
import { BetslipItem, useDetailedBetslip } from "@azuro-org/sdk"
import clsx from "clsx"

type InputProps = {
    item: BetslipItem
    isLoading: boolean
}

export default function Input({item, isLoading}: InputProps) {
    const {
        batchBetAmounts,
        changeBatchBetAmount,
    } = useDetailedBetslip()
    const {theme} = useTheme()
    return (
        <div className={clsx("flex mt-2 items-center justify-between border rounded-lg h-[56px]",
            theme === 'dark' ? 'border-appGray-100' : 'border-gray-300'
        )}>
            <input
                type="number"
                className="text-[#B58EEA] bg-transparent border-none outline-none focus:ring-0 resize-none w-full text-right px-2 input-no-arrow"
                value={batchBetAmounts[`${item.conditionId}-${item.outcomeId}`] || 0}
                onChange={(event) => {
                    if (event.target.value.length > 16) {
                        return
                    }
                    changeBatchBetAmount(
                        item,
                        Number(event.target.value) < 0 ? '0' : event.target.value
                    )
                }}
                max={16}
                placeholder="Bet size"
                disabled={isLoading}
            />
        </div>
    )
}