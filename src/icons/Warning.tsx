import { IconProps } from './props'

const Warning = (props: Readonly<IconProps>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 6.75v3.75M9 16.058H4.455c-2.602 0-3.69-1.86-2.43-4.133l2.34-4.215L6.57 3.75c1.335-2.408 3.525-2.408 4.86 0l2.205 3.967 2.34 4.215c1.26 2.273.165 4.133-2.43 4.133H9v-.008Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.996 12.75h.007"
    />
  </svg>
)
export default Warning
