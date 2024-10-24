import { IconProps } from './props'
import { useTheme } from '@/app/ThemeContext'


const Delete = (props: Readonly<IconProps>) => {
  const {theme} = useTheme()
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill='none'
    {...props}
  >
    <path
      d="M3 4.63235H15M6.75 2.25H11.25M11.625 15.75H6.375C5.54657 15.75 4.875 15.0389 4.875 14.1618L4.53255 5.45953C4.5148 5.00837 4.85544 4.63235 5.2819 4.63235H12.7181C13.1446 4.63235 13.4852 5.00837 13.4674 5.45953L13.125 14.1618C13.125 15.0389 12.4534 15.75 11.625 15.75Z"
      stroke={theme === 'dark' ? 'white' : 'black'}
      strokeOpacity="0.4"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
}
export default Delete
