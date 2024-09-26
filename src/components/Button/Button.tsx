'use client'
import Icons from '@/icons'
import clsx from 'clsx'
import React from 'react'
import './styles/Button.css'
export * from './BackButton'
export * from './GroupBetButton'
export * from './SelectBetButton'

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
  | 'gradient'

type Size = 'x-small' | 'small' | 'medium' | 'large' | 'xs' | 'sm' | 'md' | 'lg'

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  size?: Size
  variant?: Variant
  icon?: string
  isLoading?: boolean
  children?: React.ReactNode
  className?: string
  contentClass?: string
}

const Button = ({
  size = 'md',
  variant = 'default',
  icon = '',
  isLoading = false,
  children,
  className,
  contentClass,
  ...other
}: Readonly<ButtonProps>) => {
  return (
    <button
      className={clsx('btn', size, variant, className, {
        'pointer-events-none': isLoading,
        icon,
      })}
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
                strokeWidth="4"
              />
            </svg>
          </div>
        </div>
      )}
      <div
        className={clsx(
          'content flex items-center justify-center',
          contentClass,
          {
            'opacity-0': isLoading,
          }
        )}
      >
        {icon && <Icons name={icon} />}
        {children}
      </div>
    </button>
  )
}

export default Button
