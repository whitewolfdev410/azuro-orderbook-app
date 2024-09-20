import { BubbleIcon, CheckBroken, CoinIcon } from '@/icons';
import { BetType } from '@azuro-org/sdk';
import clsx from 'clsx';
import { ReactNode } from 'react';

export type BetsTagProps = {
  status: BetType;
};

const StatusTag: Record<
  BetType,
  {
    icon: ReactNode;
    text: string;
    className: string;
  }
> = {
  [BetType.Accepted]: {
    icon: <BubbleIcon />,
    text: 'Active',
    className: 'bg-tag-active text-tag-activeText',
  },
  [BetType.Unredeemed]: {
    icon: <CoinIcon />,
    text: 'Unredeemed',
    className: 'bg-tag-unredeemed text-white',
  },
  [BetType.Settled]: {
    icon: <CheckBroken />,
    text: 'Settled',
    className: 'bg-tag-settled text-white',
  },
};

const BetsTag = (props: Readonly<BetsTagProps>) => {
  const { status } = props;
  const renderPayload = StatusTag[status];

  if (!renderPayload) return null;

  const { icon, text, className } = renderPayload;

  return (
    <div
      className={clsx(
        'flex items-center gap-1 px-2 py-1 w-fit rounded-2xl',
        className
      )}
    >
      {icon}
      {text}
    </div>
  );
};

export default BetsTag;
