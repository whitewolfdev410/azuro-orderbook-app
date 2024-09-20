import { CupIcon, HappyIcon } from '@/icons';

export type WinLoseTagsProps = {
  isWin?: boolean;
  isLose?: boolean;
};

const WinLoseTags = (props: Readonly<WinLoseTagsProps>) => {
  const { isWin, isLose } = props;

  if (isWin) {
    return (
      <div className="h-fit flex items-center gap-1 bg-button-LightGreen-50 text-button-LightGreen px-2 rounded-full py-[4px]">
        <CupIcon />
        <div className="font-medium text-[12px]">Win</div>
      </div>
    );
  }

  if (isLose) {
    return (
      <div className="h-fit flex items-center gap-1 bg-yellowDanger-bg text-button-red px-2 rounded-full py-[4px]">
        <HappyIcon />
        <div className="font-medium text-[12px]">Close</div>
      </div>
    );
  }

  return null;
};

export default WinLoseTags;
