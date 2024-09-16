import { TTabItem } from '@/utils/types';
import React from 'react';
import clsx from 'clsx';

type Props = {
  activeClassName?: string;
  inActiveClassName?: string;
  value: number;
  Items: TTabItem[];
  onClick?: (e: number) => void;
};

const Tabs = (props: Props) => {
  const { Items, value, onClick, activeClassName, inActiveClassName } = props;
  return (
    <div className="flex overflow-auto">
      {Items.map((item, index) => {
        const isActive = index === value;
        return (
          <button
            className={clsx(
              'flex-1 text-center hover:bg-appGray-100 transition-all flex items-center justify-center gap-1 py-2',
              'border-b-2 border-b-white border-opacity-0',
              {
                ['text-appGray-500']: !isActive,
                [`${activeClassName}`]: isActive,
                [`${inActiveClassName}`]: !isActive,
                'border-opacity-100 text-white': isActive
              }
            )}
            key={index}
            onClick={() => onClick?.(index)}
          >
            <div>{item.name}</div>
            {typeof item?.count === 'number' && item?.count >= 0 && (
              <div className="bg-appGray-1100 rounded-md px-[9px] py-1 text-black font-semibold text-[10px]">
                {item.count}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
