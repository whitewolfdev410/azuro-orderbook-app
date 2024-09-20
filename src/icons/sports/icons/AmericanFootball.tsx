import { SportIconProps } from '../props';
import { getColor } from '../utils';

const AmericanFootball = (props: SportIconProps) => {
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
        d="M12 16L3.06738 17.5C4.03146 19.41 5.59011 20.9686 7.50009 21.9327L12 19M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 13.4222 21.7031 14.7751 21.1679 16C21.0177 16.3438 20.8487 16.6776 20.6622 17H19C19 18.933 17.433 20.5 15.5 20.5C13.567 20.5 12 18.933 12 17V12H2ZM16.75 16.75C16.75 17.4404 16.1904 18 15.5 18C14.8096 18 14.25 17.4404 14.25 16.75C14.25 16.0596 14.8096 15.5 15.5 15.5C16.1904 15.5 16.75 16.0596 16.75 16.75Z"
        stroke={getColor(props.gradient)}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {props.children}
    </svg>
  );
};

export default AmericanFootball;
