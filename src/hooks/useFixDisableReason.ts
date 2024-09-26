import { compareOutcome } from '@/utils'
import {
  BetslipDisableReason,
  useBaseBetslip,
  useDetailedBetslip,
  type BetslipItem,
} from '@azuro-org/sdk'
import {
  ConditionStatus,
  MarketOutcome,
  liveHostAddress,
} from '@azuro-org/toolkit'
import { useCallback, useEffect } from 'react'

const useFixDisableReason = (outcomeSelected: MarketOutcome) => {
  const { items, removeItem } = useBaseBetslip()
  const { statuses, disableReason } = useDetailedBetslip()

  const removeList = useCallback(
    (items: BetslipItem[]) => {
      items.forEach((item) => {
        if (compareOutcome(item, outcomeSelected)) {
          return null
        }
        removeItem(item)
      })
    },
    [removeItem, outcomeSelected]
  )

  const removeLiveGame = useCallback(() => {
    const liveItems = items.filter((item) => {
      return item.coreAddress === liveHostAddress
    })

    removeList(liveItems)
  }, [items, removeList])

  const removeForbidden = useCallback(() => {
    const forbiddenItems = items.filter((item) => {
      return item.isExpressForbidden === true
    })

    removeList(forbiddenItems)
  }, [items, removeList])

  const removeConditionsInvalid = useCallback(() => {
    const conditionsInvalidItems = items.filter((item) => {
      return statuses[item.conditionId] !== ConditionStatus.Created
    })

    removeList(conditionsInvalidItems)
  }, [items, removeList, statuses])

  const removeGameStarted = useCallback(() => {
    const gameStartedItems = items.filter((item) => {
      let isValid = false
      const game = item.game
      if (item.coreAddress === liveHostAddress) {
        isValid = true
      }
      isValid = isValid || game.startsAt * 1000 > Date.now()
      return !isValid
    })

    removeList(gameStartedItems)
  }, [items, removeList])

  useEffect(() => {
    switch (disableReason) {
      case BetslipDisableReason.ComboWithForbiddenItem:
        removeForbidden()
        break
      case BetslipDisableReason.ComboWithLive:
        removeLiveGame()
        break
      case BetslipDisableReason.ConditionStatus:
        removeConditionsInvalid()
        break
      case BetslipDisableReason.PrematchConditionInStartedGame:
        removeGameStarted()
        break
      case BetslipDisableReason.ComboWithSameGame:
        break
      case BetslipDisableReason.BatchWithLive:
        removeLiveGame()
        break

      default:
    }
  }, [
    disableReason,
    removeConditionsInvalid,
    removeForbidden,
    removeGameStarted,
    removeLiveGame,
  ])
}

export default useFixDisableReason
