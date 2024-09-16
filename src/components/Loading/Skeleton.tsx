import React from 'react';
import clsx from 'clsx';

type Props = {
  className?: string;
};

const Skeleton = (props: Props) => {
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
