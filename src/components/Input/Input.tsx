import { useTheme } from '@/app/ThemeContext'
import clsx from 'clsx'
import React from 'react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  startIcon?: React.ReactNode
  containerClass?: string
}

const Input = React.forwardRef(function Input(
  props: Readonly<InputProps>,
  ref: React.Ref<HTMLInputElement>
) {
  const { startIcon, containerClass, className, ...other } = props
  const { theme } = useTheme()
  return (
    <div
      className={clsx(
        'flex items-center gap-2 rounded-[30px] px-2 h-[40px] text-[14px]',
        theme === 'dark' ? 'bg-[#FFFFFF1A]' : 'bg-[#ededed]',
        containerClass
      )}
    >
      {startIcon}
      <input
        type="text"
        className={clsx(
          'bg-transparent outline-none h-full py-1 w-full',
          className
        )}
        ref={ref}
        {...other}
      />
    </div>
  )
})

export default Input
