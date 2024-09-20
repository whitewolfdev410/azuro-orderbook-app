import { IconProps } from './props';

const BubbleIcon = (props: Readonly<IconProps>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M10.393 8.173a3.42 3.42 0 1 0 0-6.84 3.42 3.42 0 0 0 0 6.84ZM4.24 12.96a2.053 2.053 0 1 0 0-4.107 2.053 2.053 0 0 0 0 4.107ZM11.08 14.667a1.707 1.707 0 1 0 0-3.414 1.707 1.707 0 0 0 0 3.414Z"
    />
  </svg>
);

export default BubbleIcon;
