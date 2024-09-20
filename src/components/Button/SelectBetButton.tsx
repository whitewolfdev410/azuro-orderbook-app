import clsx from 'clsx';

export type SelectBetButtonProps = {
  text: string;
  price: string;
  index: number;
  isSelected?: boolean;
  onClick?: () => void;
  totalBetsPlaced?: number;
};

const SelectBetButton = (props: Readonly<SelectBetButtonProps>) => {
  const {
    text,
    price,
    index,
    isSelected,
    onClick,
    totalBetsPlaced = 0,
  } = props;
  return (
    <button
      className={clsx(
        'flex items-center justify-between w-full px-5 py-3 rounded-lg relative',
        {
          'bg-button-green': index === 0 && isSelected,
          'bg-button-red': index === 1 && isSelected,
          'bg-appGray-100': !isSelected,
        }
      )}
      onClick={onClick}
    >
      <div>
        <div className="text-left">{text}</div>
        <div className="text-appGray-500 text-[14px] font-normal">
          Total Bets Placed: {totalBetsPlaced}
        </div>
      </div>
      <div className="bg-white rounded-2xl px-2 py-1  text-black">{price}</div>
      {!isSelected && (
        <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-30 rounded-md"></div>
      )}
    </button>
  );
};

export default SelectBetButton;
