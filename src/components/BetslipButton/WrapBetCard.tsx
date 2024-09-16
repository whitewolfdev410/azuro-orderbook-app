import React, { useMemo } from 'react';
import BetsTag from '../Tags/BetsTag';
import { Bet, BetType, useChain, useRedeemBet } from '@azuro-org/sdk';
import SmallBetCard from './SmallBetCard';
import dayjs from 'dayjs';
import SportIcon from '../Icons/Sports';
import { formatNumber } from '@/utils/number';
import RedeemedTag from '../Tags/RedeemedTag';
import GradientButton from '../Button/GradientButton';
import { padBytes } from 'viem';
import WinLoseTags from '../Tags/WinLoseTags';
import { showNotification } from '../Noti/Notification';

const WrapBetCard = ({ bet, status }: { bet: Bet; status?: string }) => {
  const { betToken } = useChain();
  const game = bet.outcomes[0].game;
  const league = game.league;
  const sport = game.sport;
  const amount = Number(bet.amount);
  const { submit, isPending, isProcessing } = useRedeemBet();

  const handleRedeem = async () => {
    try {
      const data = await submit({ bets: [bet] });
      if (data.status === 'success') {
        showNotification({
          title: 'Redeem Successful',
          description:
            'You have successfully redeemed the winnings from your bet.'
        });
      } else if (data.status === 'reverted') {
        showNotification({
          status: 'error',
          title: 'Redeem Failed',
          description:
            'You have not successfully redeemed the winnings from your bet. Please try again.'
        });
      }
    } catch (error) {
      console.log(error);
      showNotification({
        status: 'error',
        title: 'Redeem unsuccessful',
        description: 'Redeem unsuccessful. Please try again'
      });
    }
  };
  const rows = [
    {
      label: 'Bet Amount',
      value: `${formatNumber(amount, 2)} ${betToken.symbol}`,
      valueClassName: `text-white `
    },
    {
      label: 'Possible win',
      value: `${bet.possibleWin} ${betToken.symbol}`,
      isRedeemed: bet.isRedeemed,
      valueClassName: 'text-button-LightGreen'
    }
  ];

  let buttonTitle;

  if (bet.isCanceled) {
    buttonTitle = 'Refund';
  } else {
    buttonTitle = 'Redeem';
  }

  if (isPending) {
    buttonTitle = 'Waiting for approval';
  } else if (isProcessing) {
    buttonTitle = 'Processing...';
  }

  const isDisabled = isPending || isProcessing;

  return (
    <div className="border rounded-xl p-4 bg-appBlack-50 border-appGray-50 mb-5">
      <div className="flex items-center justify-between">
        {status && <BetsTag status={status} />}
        <div className="text-appGray-600">
          Accepted: {dayjs(bet.createdAt * 1000).format('DD MMM, YYYY HH:mm')}
        </div>
      </div>
      <div className="flex gap-1 py-4">
        <SportIcon sportId={sport.sportId} className={'h-[20xp] w-[20px]'} />
        <div className="flex-1 text-appGray-600">
          {sport.name} - {league.country.name} - {league.name}
        </div>
        <WinLoseTags isWin={bet.isWin} isLose={bet.isLose || bet.isCanceled} />
      </div>
      <SmallBetCard outcome={bet.outcomes[0]} />
      {amount > 0 && (
        <div className="space-y-2">
          {rows.map((item) => (
            <div className="flex items-center text-[12px]" key={item.label}>
              <div className="flex flex-1 items-center text-appGray-600 font-medium gap-1.5">
                {item.label}
                {item.isRedeemed && <RedeemedTag />}
              </div>
              <div className={`font-bold ${item.valueClassName}`}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      )}
      {Boolean(bet.isRedeemable || bet.payout) && (
        <GradientButton
          className="mt-2"
          onClick={handleRedeem}
          disabled={isDisabled}
        >
          {buttonTitle}
        </GradientButton>
      )}
    </div>
  );
};

export default WrapBetCard;
