import { BetslipItem, useDetailedBetslip } from "@azuro-org/sdk"

type InputProps = {
    item: BetslipItem
    isLoading: boolean
}

export default function Input({item, isLoading}: InputProps) {
    const {
        batchBetAmounts,
        changeBatchBetAmount,
    } = useDetailedBetslip()
    
    return (
        <div className="flex mt-2 items-center justify-between border-appGray-100 border rounded-lg h-[56px]">
            <input
                type="number"
                className="text-[#B58EEA] bg-transparent border-none outline-none focus:ring-0 resize-none w-full text-right px-2 input-no-arrow"
                value={batchBetAmounts[`${item.conditionId}-${item.outcomeId}`]}
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
                placeholder="Enter Bet amount"
                disabled={isLoading}
            />
        </div>
    )
}