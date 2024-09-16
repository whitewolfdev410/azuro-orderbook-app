import React from 'react';
const Input = (props: any) => {
  const { startIcon: StartIcon, containerClass, className, ...other } = props;
  return (
    <div
      className={`flex items-center gap-2 bg-[#FFFFFF1A] rounded-[30px] px-2 h-[40px] text-[14px] ${containerClass}`}
    >
      {StartIcon}
      <input
        type="text"
        {...other}
        className={`bg-transparent outline-none h-full py-1 w-full ${className}`}
      />
    </div>
  );
};
export default Input;
