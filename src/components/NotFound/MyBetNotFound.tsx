import { ReceiptItemIcon } from '@/icons'

const MyBetNotFound = () => {
  return (
    <div className="mt-40 flex items-center justify-center flex-col gap-1">
      <ReceiptItemIcon />
      <div className="text-center mt-2 font-bold">No active bets</div>
      <div className="max-w-[320px]  text-appGray-600 text-center">
        You have not placed any bets yet. Place your first bet and it will
        appear here.
      </div>
    </div>
  )
}

export default MyBetNotFound
