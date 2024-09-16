import React from 'react';
import clsx from 'clsx';

type IconProps = {
  children: React.ReactNode;
  className?: string;
};

const Icon = ({ children, className }: IconProps) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-center p-3 rounded-full',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Icon;
