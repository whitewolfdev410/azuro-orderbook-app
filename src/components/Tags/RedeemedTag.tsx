import { MoneyTickIcon } from '@/icons'

const RedeemedTag = () => {
  return (
    <div className="flex items-center gap-1 bg-tag-redeemedBg text-tag-redeemed px-2 rounded-full py-1">
      <MoneyTickIcon />
      <div className="font-medium text-[12px]">Redeemed</div>
    </div>
  )
}

export default RedeemedTag
