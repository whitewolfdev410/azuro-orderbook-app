import clsx from 'clsx';

export type SkeletonProps = {
  className?: string;
};

const Skeleton = (props: Readonly<SkeletonProps>) => {
  const { className } = props;
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-300 max-h-full max-w-full rounded-md',
        className
      )}
    />
  );
};

export default Skeleton;
