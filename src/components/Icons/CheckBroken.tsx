import * as React from 'react';
import { SVGProps } from 'react';
const CheckBroken = (props: SVGProps<SVGSVGElement>) => (
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
      d="M14 8a6 6 0 1 1-3.375-5.397m2.25 1.647L7.625 9.5 6.125 8"
    />
  </svg>
);
export default CheckBroken;
