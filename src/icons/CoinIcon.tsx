import { IconProps } from './props';

const CoinIcon = (props: Readonly<IconProps>) => (
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
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.333 7.6c0 .513.4.933.887.933h1c.427 0 .774-.366.774-.813 0-.487-.214-.66-.527-.773l-1.6-.56c-.32-.114-.534-.287-.534-.774 0-.446.347-.813.774-.813h1A.92.92 0 0 1 8 5.733M6.667 8.567v.493M6.667 4.273v.52"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.66 11.987a5.327 5.327 0 1 0 0-10.654 5.327 5.327 0 0 0 0 10.654ZM8.653 13.253c.6.847 1.58 1.4 2.7 1.4 1.82 0 3.3-1.48 3.3-3.3a3.307 3.307 0 0 0-1.38-2.686"
    />
  </svg>
);
export default CoinIcon;
