import type { Bet } from '@azuro-org/sdk';
import { BetType } from '@azuro-org/sdk';

export const returnTypeOfBet = (bet: Bet) => {
  if (bet.isWin && bet.isRedeemable && !bet.isRedeemed) {
    return BetType.Unredeemed;
  }

  if (bet.isLose || bet.isCanceled || bet.isRedeemed) {
    return BetType.Settled;
  }

  return BetType.Accepted;
};
