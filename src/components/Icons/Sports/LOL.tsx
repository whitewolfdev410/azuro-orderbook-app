import React from 'react';
import { getSportIconColor } from '.';

const LOL = (props: any) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {props.children}
      <path
        d="M7.2 5.80001V18.2L5.5 20.8H17.5664L20 17.6H11.2V3.20001H5.6L7.2 5.80001Z"
        fill={getSportIconColor(props?.gradient)}
      />
      <path
        d="M5.60001 15.284C5.09201 14.2976 4.80001 13.1832 4.80001 12C4.80001 10.8168 5.09201 9.7024 5.60001 8.716V6.2528L5.49921 6.0896C4.07601 7.6536 3.20001 9.724 3.20001 12C3.20001 14.2696 4.07121 16.3344 5.48641 17.8968L5.60001 17.7232V15.284Z"
        fill={getSportIconColor(props?.gradient)}
      />
      <path
        d="M12.8 4.84721C16.3944 5.24641 19.2 8.30001 19.2 12C19.2 13.4792 18.7504 14.8552 17.9824 16H19.828C20.4448 14.7984 20.8 13.4408 20.8 12C20.8 7.41761 17.2784 3.64641 12.8 3.24081V4.84721Z"
        fill={getSportIconColor(props?.gradient)}
      />
    </svg>
  );
};

export default LOL;
