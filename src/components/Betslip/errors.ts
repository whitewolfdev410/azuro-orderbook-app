import { BetslipDisableReason } from '@azuro-org/sdk';

export const errorPerDisableReason = {
  [BetslipDisableReason.ComboWithForbiddenItem]:
    "One or more conditions can't be used in combo",
  [BetslipDisableReason.BetAmountGreaterThanMaxBet]:
    'Bet amount exceeds max bet',
  [BetslipDisableReason.BetAmountLowerThanMinBet]:
    'Bet amount lower than min bet',
  [BetslipDisableReason.ComboWithLive]: "Live outcome can't be used in combo",
  [BetslipDisableReason.ConditionStatus]:
    'One or more outcomes have been removed or suspended. Review your betslip and remove them.',
  [BetslipDisableReason.PrematchConditionInStartedGame]: 'Game has started',
  [BetslipDisableReason.ComboWithSameGame]:
    'Combo with outcomes from same game prohibited, please use Batch bet',
  [BetslipDisableReason.BatchWithLive]: "Live outcome can't be used in batch",
} as const;
