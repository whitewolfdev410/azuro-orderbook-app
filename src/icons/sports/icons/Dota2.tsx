import { SportIconProps } from '../props'
import { getColor } from '../utils'

const Dota2 = (props: SportIconProps) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.2 2.88H2.4C2.4 2.88 2.4 6.03887 2.4 6.72C2.4 8.16 2.88 10.08 2.88 10.08L2.87471 11.0712L2.4 11.52V13.44L2.88 13.92V16.32L2.4 17.76L2.88 19.68L2.4 21.12H9.12L9.6 20.64C9.69119 20.831 10.08 21.6 10.56 21.6C10.56 21.6 11.52 21.6 12 21.6C12.48 21.6 12.96 21.12 13.44 21.12H15.84L16.32 20.64C16.8 21.12 16.9877 21.6 17.28 21.6C17.76 21.6 18.72 21.6 19.68 21.6V20.64L21.6 21.12C21.6 21.12 21.5693 16.3862 21.6 13.92L21.12 13.44V11.04L20.64 10.56L21.12 9.6L21.6 9.12C21.6 8.64 21.5933 7.2 21.5933 6.71519L21.12 4.8L21.6 3.84V2.88C21.12 2.88 20.16 2.88 19.68 2.88C19.2715 2.88 19.1563 2.91503 18.72 3.36V2.4C18.24 2.4 16.3382 2.4 15.84 2.4C15.2323 2.4 15.0854 2.67503 14.88 3.36H13.92C13.92 3.36 13.44 2.88 13.44 2.4H10.08C10.0498 2.7 9.68975 3.36 9.06959 3.36C8.64 3.36 8.16 3.36 7.68 3.36C7.46015 3.36 7.28255 3.06767 7.2 2.88Z"
        stroke={getColor(props.gradient)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.28 6.20449L7.07184 5.76L18.72 14.6491L17.376 17.76H15.1358L5.28 6.20449Z"
        stroke={getColor(props.gradient)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.44 6.72L16.3627 5.76L17.8238 6.72L17.3371 9.6L13.44 6.72Z"
        stroke={getColor(props.gradient)}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.24 13.44L5.28 16.8L7.2 18.24L10.08 17.28L6.24 13.44Z"
        stroke={getColor(props.gradient)}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      {props.children}
    </svg>
  )
}

export default Dota2
