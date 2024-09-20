import { IconProps } from './props';

const JudgeOutline = (props: Readonly<IconProps>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    fill="none"
    viewBox="0 0 16 17"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m13.34 12.84-3.3-3.3M10.04 9.54 7.68 11.9c-.52.52-1.367.52-1.887 0L2.967 9.073a1.336 1.336 0 0 1 0-1.886L7.68 2.473c.52-.52 1.367-.52 1.887 0L12.393 5.3c.52.52.52 1.367 0 1.887L10.04 9.54ZM1.333 14.5h4M4.374 5.78l4.713 4.713"
    />
  </svg>
);
export default JudgeOutline;
