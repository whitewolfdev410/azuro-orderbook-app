import { SportIconProps } from '../props';
import { getColor } from '../utils';

const Boxing = (props: SportIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.63241 13.1044C5.63241 13.1044 6.18145 15.1534 9.21254 16.9034C12.2436 18.6534 14.2927 18.1044 14.2927 18.1044M5.63241 13.1044C6.05219 2.37707 12.4492 0.296184 16.3464 2.54622C20.2436 4.79626 20.5424 7.27817 19.7925 8.57727C19.0426 9.87638 17.2436 9.99241 17.7925 12.0414M5.63241 13.1044L3.63228 16.5678C3.08 17.5244 3.40781 18.7475 4.3644 19.2998L9.56054 22.2998C10.5171 22.8521 11.7403 22.5243 12.2926 21.5677L14.2927 18.1044M14.2927 18.1044C16.4086 16.4392 19.8237 15.5235 20.8237 13.7915C21.8237 12.0594 21.2747 10.0104 19.2925 9.4433"
        stroke={getColor(props.gradient)}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {props.children}
    </svg>
  );
};

export default Boxing;
