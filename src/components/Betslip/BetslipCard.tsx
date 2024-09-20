'use client';
import { GroupBetButton } from '@/components/Button';
import { type BetslipItem } from '@azuro-org/sdk';
import type { MarketOutcome } from '@azuro-org/toolkit';
import { ConditionStatus } from '@azuro-org/toolkit';

export type BetslipItemProps = {
  item: BetslipItem;
  status: ConditionStatus;
  odds: number;
  isStatusesFetching: boolean;
  onRemove: (item: BetslipItem) => void;
  outcomeRowSelected?: MarketOutcome[];
  betsData?: BetslipItem;
};

export default function BetslipCard(props: Readonly<BetslipItemProps>) {
  const { item, status, isStatusesFetching, outcomeRowSelected, betsData } =
    props;
  const {
    game: { gameId },
    outcomeId,
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
