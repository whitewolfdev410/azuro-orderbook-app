import { useTheme } from '@/app/ThemeContext'
import { IconProps } from './props'

const ChevronDown = (props: Readonly<IconProps>) => {
  const {theme} = useTheme()
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 1L5 5L1 1"
        stroke={theme == 'dark' ? "white" : 'black'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ChevronDown
