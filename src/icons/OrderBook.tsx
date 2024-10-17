import { IconProps } from '@/icons/props'

const OrderBookIcon = (props: Readonly<IconProps>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    stroke="#FFC300"
    stroke-width="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="4"
      ry="4"
      stroke="#FFC300"
      fill="none"
    />

    <circle cx="7" cy="8" r="1.5" fill="#FFC300" />
    <circle cx="7" cy="14" r="1.5" fill="#FFC300" />

    <line x1="10" y1="8" x2="18" y2="8" stroke="#FFC300" stroke-width="2" />
    <line x1="10" y1="14" x2="18" y2="14" stroke="#FFC300" stroke-width="2" />
  </svg>
)
export default OrderBookIcon
