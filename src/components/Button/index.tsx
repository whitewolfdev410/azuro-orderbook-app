'use client';
import React from 'react';
import './index.css';
import Icons from '../Icons';
export * from './BackButton';
export * from './GroupBetButton';
export * from './SelectBetButton';
type Variant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'default'
  | 'icon'
  | 'text'
  | 'textGradient'
  | 'outlinePrimary'
  | 'outlineGradient'
  | 'gradient';

type Size =
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg';

interface ButtonProps {
  size?: Size;
  variant?: Variant;
  icon?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
  contentClass?: string;
  [key: string]: any;
}

export const Button: React.FC<ButtonProps> = ({
  size = 'md',
  variant = 'default',
  icon = '',
  isLoading = false,
  children,
  className,
  contentClass,
  ...other
}) => {
  return (
    <button
      className={`btn ${size} ${variant} ${icon ? 'icon' : ''}
      ${className} 
      ${isLoading ? 'pointer-events-none' : ''} `}
      {...other}
    >
      {isLoading && (
        <div className="flex items-center justify-center absolute w-full h-full top-0 left-0 z-10">
          <div className="progress-circular">
            <svg viewBox="25 25 50 50" width="25" height="25">
              <circle
                className="progress-circular-path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke-width="4"
              />
            </svg>
          </div>
        </div>
      )}
      <div
        className={`content flex items-center justify-center ${isLoading ? 'opacity-0' : ''} ${contentClass}`}
      >
        {icon && <Icons name={icon} size={size} />}
        {children}
      </div>
    </button>
  );
};
