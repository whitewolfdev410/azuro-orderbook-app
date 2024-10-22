import { useTheme } from '@/app/ThemeContext'
import { IconProps } from './props'

const CloseCircle = ({
  width = 40,
  height = 40,
  ...other
}: Readonly<IconProps>) => {
  const {theme} = useTheme()

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <circle cx="20" cy="20" r="20" fill={theme==='dark'?"white":"black"} fillOpacity="0.1" />
      <path
        d="M26 14L14 26M26 26L14 14"
        stroke={theme==='dark'?"white":'black'}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default CloseCircle
