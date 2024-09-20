import { SkeletonProps } from './props';

const ButtonSkeleton = (props: SkeletonProps) => {
  return (
    <div
      className="w-full h-10 bg-[#FFFFFF0D] rounded-xl animate-pulse"
      {...props}
    />
  );
};

export default ButtonSkeleton;
