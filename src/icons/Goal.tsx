import { IconProps } from './props';

const Goal = (props: Readonly<IconProps>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M12 13V2L20 6L12 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.55 10.23C21.0821 11.8701 21.1319 13.6286 20.6934 15.2963C20.255 16.9639 19.3466 18.4704 18.0766 19.6367C16.8065 20.8029 15.2281 21.5798 13.5292 21.8748C11.8304 22.1699 10.0825 21.9707 8.49356 21.3009C6.90464 20.6311 5.54156 19.519 4.56649 18.0969C3.59142 16.6748 3.04541 15.0025 2.99341 13.2789C2.94142 11.5554 3.38563 9.85322 4.2732 8.37489C5.16077 6.89656 6.45434 5.70432 8 4.94"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10C7.49891 10.667 7.17268 11.4488 7.05105 12.2742C6.92941 13.0996 7.01624 13.9422 7.30361 14.7254C7.59098 15.5087 8.06976 16.2075 8.69633 16.7584C9.32291 17.3092 10.0774 17.6945 10.8909 17.8792C11.7045 18.0638 12.5514 18.042 13.3544 17.8156C14.1573 17.5892 14.8909 17.1655 15.4882 16.5831C16.0855 16.0007 16.5276 15.278 16.7742 14.481C17.0208 13.684 17.0641 12.838 16.9 12.02"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Goal;
