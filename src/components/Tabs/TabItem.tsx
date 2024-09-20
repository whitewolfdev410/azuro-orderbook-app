import clsx from 'clsx';
import { useCallback, useMemo } from 'react';

export type TabItemPropsItem = {
  name: string;
  count?: number;
  type?: string;
};

export type TabItemProps = {
  item: TabItemPropsItem;
  className?: string;
  onClick?: () => void;
};

export default function TabItem({
  className,
  item,
  onClick,
}: Readonly<TabItemProps>) {
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const showCount = useMemo(() => {
    return typeof item?.count === 'number' && item?.count >= 0;
  }, [item]);

  return (
    <button
      className={clsx(
        'flex-1 text-center hover:bg-appGray-100 transition-all flex items-center justify-center gap-1 py-2 border-b-2 border-b-white border-opacity-0',
        className
      )}
      key={item.name}
      onClick={handleClick}
    >
      <div>{item.name}</div>
      {showCount && (
        <div className="bg-appGray-1100 rounded-md px-[9px] py-1 text-black font-semibold text-[10px]">
          {item.count}
        </div>
      )}
    </button>
  );
}
