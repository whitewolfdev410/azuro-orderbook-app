import clsx from 'clsx'
import React from 'react'
import classes from './styles/GradientButton.module.css'

export type GradientButtonProps = {
  children: React.ReactNode
  onClick: () => void
  className?: string
  disabled?: boolean
}

const GradientButton = (props: Readonly<GradientButtonProps>) => {
  const { children, onClick, className, disabled } = props
  return (
    <button
      className={clsx(classes['gradient-btn'], 'rounded-lg py-3', className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default GradientButton
