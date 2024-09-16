import * as React from 'react';
import { SVGProps } from 'react';
const MoneyTickIcon = (props: SVGProps<SVGSVGElement>) => (
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
      strokeMiterlimit={10}
      d="M8 9.667a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334ZM12.334 6.333v3.334M6 12c0 .5-.14.973-.387 1.373a2.647 2.647 0 0 1-2.28 1.294c-.973 0-1.82-.52-2.28-1.294A2.614 2.614 0 0 1 .667 12 2.666 2.666 0 1 1 6 12Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.294 12 .66.66 1.42-1.314"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M1.333 10.2V6c0-2.333 1.334-3.333 3.334-3.333h6.667c2 0 3.333 1 3.333 3.333v4c0 2.333-1.333 3.333-3.333 3.333H5.667"
    />
  </svg>
);
export default MoneyTickIcon;
