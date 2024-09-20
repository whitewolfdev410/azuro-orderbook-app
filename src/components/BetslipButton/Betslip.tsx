'use client';
import Button from '@/components/Button';
import { ExploreContext } from '@/contexts';
import Icons, { ReceiptItemIcon, SportIcon } from '@/icons';
import { BetOutcome, useBaseBetslip } from '@azuro-org/sdk';
import type { MarketOutcome } from '@azuro-org/toolkit';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import SmallBetCard from './SmallBetCard';

export type BetslipProps = {
  onClose: () => void;
};

export default function Betslip({ onClose }: Readonly<BetslipProps>) {
  const { items, clear, removeItem } = useBaseBetslip();
  const navigate = useRouter();
  const { setOutcomeSelected } = useContext(ExploreContext);
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between">
        <p className="font-bold">All Betslip</p>
        {Boolean(items.length) && (
          <Button
            size="sm"
            onClick={() => {
              clear();
            }}
          >
            <Icons name="closeCircleOutline" className="mr-2" />
            Remove all
          </Button>
        )}
      </div>
      <div className="flex flex-1 flex-col overflow-auto">
        {items.length ? (
          items.map((item) => (
            <div
              key={`${item.game.gameId}-${item.outcomeId}-${item.conditionId}`}
              className="flex flex-col gap-4 mt-4 border border-[#FFFFFF0D] rounded-xl p-2 bg-[#0000000D]"
            >
              <div className="flex items-center justify-between ">
                <div className="flex gap-2">
                  <SportIcon
                    sportId={item?.game?.sportId}
                    className="h-[20xp] w-[20px]"
                  />
                  <p className="text-appGray-600">
                    {item.game.sportName} - {item.game.countryName} -
                    {item.game.leagueName}
                  </p>
                </div>
                <Button
                  icon="delete"
                  className="cursor-pointer"
                  onClick={() => {
                    removeItem(item);
                  }}
                  size="sm"
                />
              </div>
              <SmallBetCard outcome={item as unknown as BetOutcome} />
              <Button
                onClick={() => {
                  navigate.push('/event/' + item.game.gameId);
                  setOutcomeSelected(item as unknown as MarketOutcome);
                  onClose();
                }}
                variant="outlineGradient"
                contentClass="!bg-[#23282F] w-full"
              >
                Place Bet
              </Button>
            </div>
          ))
        ) : (
          <div className="mt-40 flex items-center justify-center flex-col gap-1">
            <ReceiptItemIcon />
            <div className="text-center mt-2 font-bold">No bets added</div>
          </div>
        )}
      </div>
    </div>
  );
}
