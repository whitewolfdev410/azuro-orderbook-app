import * as React from 'react';
import { SVGProps } from 'react';
const ArrowRight = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12.53 7.55 4.48 1.263a.142.142 0 0 0-.23.112v1.38c0 .088.041.172.109.226L10.787 8 4.36 13.02a.283.283 0 0 0-.109.224v1.38c0 .12.138.186.23.113l8.05-6.288a.571.571 0 0 0 0-.9Z"
    />
  </svg>
);
export default ArrowRight;
