'use client';
import { type BetslipItem } from '@azuro-org/sdk';
import { ConditionStatus, MarketOutcome } from '@azuro-org/toolkit';
import React from 'react';
import GroupBetButton from './Button/GroupBetButton';

type BetslipItemProps = {
  item: BetslipItem;
  status: ConditionStatus;
  odds: number;
  isStatusesFetching: boolean;
  onRemove: (item: BetslipItem) => void;
  outcomeRowSelected?: MarketOutcome[];
  betsData?: any;
};

function BetslipCard(props: BetslipItemProps) {
  const {
    item,
    status,
    odds: _odds,
    isStatusesFetching,
    outcomeRowSelected,
    betsData
  } = props;
  const {
    game: { gameId },
    outcomeId
  } = item;

  const isLock = !isStatusesFetching && status !== ConditionStatus.Created;
  return (
    <div
      key={`${gameId}-${outcomeId}`}
      className="rounded-md mt-2 first-of-type:mt-0"
    >
      <div className="font-bold text-lg">Betslip</div>
      <div className="mt-10">
        <div className=" font-semibold text-appGray-800 mb-2">Outcome</div>
        <GroupBetButton
          outcomeId={outcomeId}
          outcomeRowSelected={outcomeRowSelected}
          betsData={betsData}
        />
      </div>
      {isLock && (
        <div className="text-orange-200 text-center">
          Outcome removed or suspended
        </div>
      )}
    </div>
  );
}

export default React.memo(BetslipCard);
