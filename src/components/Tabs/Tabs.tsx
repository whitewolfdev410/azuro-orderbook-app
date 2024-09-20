import clsx from 'clsx';
import TabItem, { TabItemProps } from './TabItem';

export type TabsProps = {
  activeClassName?: string;
  inActiveClassName?: string;
  value: number;
  items: TabItemProps['item'][];
  onClick?: (e: number) => void;
};

export const Tabs = (props: Readonly<TabsProps>) => {
  const {
    items,
    value,
    onClick,
    activeClassName = '',
    inActiveClassName = '',
  } = props;

  return (
    <div className="flex overflow-auto">
      {items.map((item, index) => {
        const isActive = index === value;
        return (
          <TabItem
            item={item}
            className={clsx({
              'text-appGray-500': !isActive,
              [activeClassName]: isActive,
              [inActiveClassName]: !isActive,
              'border-opacity-100 text-white': isActive,
            })}
            key={item.name}
            onClick={() => onClick?.(index)}
          />
        );
      })}
    </div>
  );
};

export default Tabs;
