'use client';

import { GameMarkets, MarketOutcome } from '@azuro-org/toolkit';
import OrderBook from '@/components/OrderBookPage/OrderBook';
import { BetslipContent } from '../Betslip';

import useFixDisableReason from '@/hooks/useFixDisableReason';
import { useOrderBookV2 } from '@/hooks/useOrderBook.v2';
const OrderBookPage = ({
  markets,
  outcomeSelected
}: {
  markets: GameMarkets;
  outcomeSelected: MarketOutcome;
}) => {
  useFixDisableReason();
  const marketSelected = markets.find((market) => {
    const _find = market.outcomeRows.find(
      (_item) =>
        _item[0].outcomeId === outcomeSelected.outcomeId ||
        _item[1].outcomeId === outcomeSelected.outcomeId
    );

    return _find;
  });
  const outcomeRowSelected =
    marketSelected?.outcomeRows.find(
      (outcomeRow) =>
        outcomeRow[0].outcomeId === outcomeSelected.outcomeId ||
        outcomeRow[1].outcomeId === outcomeSelected.outcomeId
    ) || [];

  const { data: bets, isFetching } = useOrderBookV2({
    conditionId: outcomeSelected.conditionId,
    outcomeId: outcomeSelected.outcomeId
  });
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-4">
        <div className="col-span-12 md:col-span-7 pt-6 border-r border-white border-opacity-10">
          {/* <div className="flex gap-3 items-center">
            <h2 className="text-white text-lg pl-6 text-base font-bold">
              Odds
            </h2>
          </div> */}
          <OrderBook
            outcomeRowSelected={outcomeRowSelected}
            isFetching={isFetching}
            bets={bets}
          />
        </div>
        <div className="col-span-12 md:col-span-5 p-4 mb-4 rounded-md w-full max-h-[90vh]">
          <BetslipContent
            outcomeRowSelected={outcomeRowSelected}
            isFetching={isFetching}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderBookPage;
