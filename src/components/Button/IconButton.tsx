import Icons, { IconsProps } from '@/icons';
import clsx from 'clsx';

export type IconButtonProps = {
  text: string;
  prefixIcon?: IconsProps['name'];
  trailingIcon?: IconsProps['name'];
  onClick: () => void;
  className?: string;
};

export default function IconButton({
  text,
  trailingIcon,
  prefixIcon,
  className,
  ...props
}: Readonly<IconButtonProps>) {
  return (
    <button
      className={clsx(
        'flex items-center justify-between gap-2 cursor-pointer px-2',
        className
      )}
      {...props}
    >
      {prefixIcon && <Icons name={prefixIcon} width={20} height={20} />}
      <span className="flex-1 overflow-hidden text-ellipsis">{text}</span>
      {trailingIcon && <Icons name={trailingIcon} width={20} height={20} />}
    </button>
  );
}
