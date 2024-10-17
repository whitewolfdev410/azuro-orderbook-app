import { IconProps } from '@/icons/props'

const ChartIcon = (props: Readonly<IconProps>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="10" width="3" height="10" fill="#FFD966" />
    <rect x="8" y="6" width="3" height="14" fill="#F4B183" />
    <rect x="14" y="4" width="3" height="16" fill="#A9D08E" />
    <rect x="20" y="2" width="3" height="18" fill="#9DC3E6" />
  </svg>
)
export default ChartIcon
