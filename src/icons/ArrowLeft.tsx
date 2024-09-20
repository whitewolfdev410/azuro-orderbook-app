import { IconProps } from './props';

const ArrowLeftIcon = (props: Readonly<IconProps>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    fill="none"
    viewBox="0 0 10 10"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#000"
        d="m2.282 5.27 4.83 3.772a.085.085 0 0 0 .138-.067v-.828a.173.173 0 0 0-.065-.135L3.328 5l3.857-3.012a.17.17 0 0 0 .065-.135v-.828a.085.085 0 0 0-.138-.068L2.282 4.73a.342.342 0 0 0 0 .54Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="currentColor" d="M9.8 9.8H.2V.2h9.6z" />
      </clipPath>
    </defs>
  </svg>
);
export default ArrowLeftIcon;
