import React from 'react';
import Icons from '../Icons';

type Props = {
  text: string;
  prefixIcon?: string;
  trailingIcon?: string;
  clicked: any; //string or callback func
  className?: string;
};

export function IconButton({
  text,
  trailingIcon,
  prefixIcon,
  className,
  clicked,
  ...props
}: Props) {
  return (
    <div
      className={`flex items-center justify-between gap-[12px] cursor-pointer`}
      onClick={clicked}
    >
      <Icons name={prefixIcon} />
      <button {...props} className={className}>
        {text}
      </button>
      <Icons name={trailingIcon} />
    </div>
  );
}
