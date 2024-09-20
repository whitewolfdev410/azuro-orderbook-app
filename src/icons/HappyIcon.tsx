import { IconProps } from './props';

const HappyIcon = (props: Readonly<IconProps>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      d="M7.98 1.333A6.67 6.67 0 0 0 1.313 8a6.67 6.67 0 0 0 6.667 6.667A6.67 6.67 0 0 0 14.647 8c0-3.68-2.98-6.667-6.667-6.667Zm3.62 9.62a4.384 4.384 0 0 1-3.6 1.88c-1.433 0-2.78-.7-3.6-1.88a.495.495 0 0 1 .127-.693c.226-.16.54-.1.693.127A3.399 3.399 0 0 0 8 11.84c1.107 0 2.147-.54 2.78-1.453a.502.502 0 0 1 .694-.127.489.489 0 0 1 .126.693Z"
    />
  </svg>
);
export default HappyIcon;
