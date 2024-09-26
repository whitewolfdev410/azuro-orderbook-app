import { BetslipContext, BetslipContextValue } from '@/contexts'
import { use } from 'react'

export default function useBetslip() {
  return use(BetslipContext) as BetslipContextValue
}
