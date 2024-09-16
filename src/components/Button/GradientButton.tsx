import React from 'react';
import classes from './index.module.css';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

const GradientButton = (props: Props) => {
  const { children, onClick, className, disabled } = props;
  return (
    <button
      className={clsx(classes['gradient-btn'], 'rounded-lg py-3', className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default GradientButton;
