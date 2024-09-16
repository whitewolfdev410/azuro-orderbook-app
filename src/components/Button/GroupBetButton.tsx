import React from 'react';
import SelectBetButton from './SelectBetButton';
import { MarketOutcome } from '@azuro-org/toolkit';
import { useBaseBetslip, useDetailedBetslip } from '@azuro-org/sdk';
import { useContext } from 'react';
import { ExploreContext } from '@/providers/ExploreProvider';
import compareOutcome from '@/utils/compareOutcome';
import { formatOdds } from '@/helpers/formatOdds';
import { BETS_AMOUNT_DECIMALS } from '@/hooks/useOrderBook.v2';
type GroupBetButtonProps = {
  onClick?: () => void;
  outcomeId?: string;
  outcomeRowSelected?: MarketOutcome[];
  betsData?: any;
};

const GroupBetButton = (props: GroupBetButtonProps) => {
  const { setOutcomeSelected, allBets } = useContext(ExploreContext);
  const { outcomeId = 0, outcomeRowSelected } = props;
  const { items, addItem } = useBaseBetslip();
  const { changeBatchBetAmount } = useDetailedBetslip();
  const handleClick = (item: MarketOutcome) => {
    // clear();

    if (!items.some((i) => compareOutcome(i, item))) {
      addItem(item);
      changeBatchBetAmount(item, BETS_AMOUNT_DECIMALS);
    }
    setOutcomeSelected(item);
  };

  return (
    <div className="flex flex-col gap-2 font-bold text-md">
      {outcomeRowSelected?.map((item, index) => (
        <SelectBetButton
          key={`${item.outcomeId}-${item.conditionId}`}
          text={item.selectionName}
          price={`${formatOdds(item.odds!).toFixed(2)}¢`}
          index={index}
          isSelected={outcomeId === item.outcomeId}
          onClick={() => handleClick(item)}
          totalBetsPlaced={allBets[item.outcomeId]?.length || 0}
        />
      ))}
    </div>
  );
};

export default GroupBetButton;
