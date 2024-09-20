import clsx from 'clsx';
import { SkeletonProps } from './props';

export default function Skeleton(props: Readonly<SkeletonProps>) {
  return (
    <div
      className={clsx(
        'skeleton-loader relative w-full h-[200px] rounded-lg bg-[#FFFFFF0D] overflow-hidden',
        props.className
      )}
    />
  );
}
