import { BetType } from '@azuro-org/sdk';
import React from 'react';
import clsx from 'clsx';
import BubbleIcon from '../Icons/BubbleIcon';
import CoinIcon from '../Icons/CoinIcon';
import CheckBroken from '../Icons/CheckBroken';

type Props = {
  status: string;
};

const StatusTag = {
  [BetType.Accepted]: {
    Icon: <BubbleIcon />,
    text: 'Active',
    className: 'bg-tag-active text-tag-activeText'
  },
  [BetType.Unredeemed]: {
    Icon: <CoinIcon />,
    text: 'Unredeemed',
    className: 'bg-tag-unredeemed text-white'
  },
  [BetType.Settled]: {
    Icon: <CheckBroken />,
    text: 'Settled',
    className: 'bg-tag-settled text-white'
  }
};

const BetsTag = (props: Props) => {
  const { status } = props;
  const { Icon, text, className } = StatusTag[status as BetType] || {};
  return (
    <div
      className={clsx(
        'flex items-center gap-1 px-2 py-1 w-fit rounded-2xl',
        className
      )}
    >
      {Icon}
      {text}
    </div>
  );
};

export default BetsTag;
