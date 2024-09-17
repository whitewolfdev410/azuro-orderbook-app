import {
  BetslipDisableReason,
  useBaseBetslip,
  useDetailedBetslip
} from '@azuro-org/sdk';
import { ConditionStatus, liveHostAddress } from '@azuro-org/toolkit';
import { useEffect } from 'react';

const useFixDisableReason = () => {
  const { items, removeItem } = useBaseBetslip();
  const { statuses, disableReason } = useDetailedBetslip();

  const removeList = (items: any) => {
    items.forEach((item) => {
      removeItem(item);
    });
  };

  const removeLiveGame = () => {
    const _items = items.filter((item) => {
      return item.coreAddress === liveHostAddress;
    });

    removeList(_items);
  };

  const removeForbidden = () => {
    const _items = items.filter((item) => {
      return item.isExpressForbidden === false;
    });

    removeList(_items);
  };

  const removeConditionsInvalid = () => {
    const _items = items.filter((item) => {
      return statuses[item.conditionId] !== ConditionStatus.Created;
    });

    removeList(_items);
  };

  const removeGameStarted = () => {
    const _items = items.filter((item) => {
      let isValid = false;
      const game = item.game;
      if (item.coreAddress === liveHostAddress) {
        isValid = true;
      }
      isValid = isValid || game.startsAt * 1000 > Date.now();
      return !isValid;
    });

    removeList(_items);
  };

  useEffect(() => {
    switch (disableReason) {
      case BetslipDisableReason.ComboWithForbiddenItem:
        removeForbidden();
        break;
      case BetslipDisableReason.ComboWithLive:
        removeLiveGame();
        break;
      case BetslipDisableReason.ConditionStatus:
        removeConditionsInvalid();
        break;
      case BetslipDisableReason.PrematchConditionInStartedGame:
        removeGameStarted();
        break;
      case BetslipDisableReason.ComboWithSameGame:
        break;
      case BetslipDisableReason.BatchWithLive:
        removeLiveGame();
        break;

      default:
    }
  }, [disableReason]);
};

export default useFixDisableReason;
