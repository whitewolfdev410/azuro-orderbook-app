import { TGame } from '@/types'
import clsx from 'clsx'
import { use, useCallback, useEffect, useMemo, useState } from 'react'
import { PARTICIPANT_SIZE } from './constants'
import { useTheme } from '@/app/ThemeContext'

export type ParticipantProps = {
  className?: string
  size?: keyof typeof PARTICIPANT_SIZE,
  textCenter?: boolean
  textAbove?: boolean,
  colorWhite?: boolean
} & TGame['participants'][0]

const Participant = (props: Readonly<ParticipantProps>) => {
  const { size = 'sm', className, textCenter, textAbove, colorWhite } = props
  const [error, setError] = useState(false)

  const handleError = useCallback(() => {
    setError(true)
  }, [])

  const showPlaceholder = useMemo(
    () => error || !props.image,
    [error, props.image]
  )

  const {theme} = useTheme()

  // change text color based on value of theme
  const [textColor, setTextColor] = useState('white')
  useEffect(() => {
    if (colorWhite || theme === 'dark') {
      setTextColor('white')
      return
    }
    if (theme === 'light') {
      setTextColor('black')
      return
    }
  }
  , [theme])

  return (
    <div
      className={clsx(
        'flex items-center gap-2 text-[12px] overflow-hidden py-0.5',
        PARTICIPANT_SIZE[size].text,
        className,
      )}
    >
      <p className={clsx(
        !textAbove && 'hidden',
        "w-full text-[16px] overflow-hidden text-ellipsis"
        , textCenter && 'text-center',
        textColor === 'white' ? 'text-white' : 'text-black'
      )}>
        {props.name}
      </p>
      {showPlaceholder ? (
        <div
          className={clsx(
            'w-10 h-10 rounded-full border-[1px] border-blue-100',
            PARTICIPANT_SIZE[size].img
          )}
        ></div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={clsx('w-10 h-10', PARTICIPANT_SIZE[size].img)}
          src={props.image!}
          alt={props.name}
          aria-hidden
          onError={handleError}
        />
      )}
      <p className={clsx(
        textAbove && 'hidden',
        "w-full text-[16px] overflow-hidden text-ellipsis", 
        textCenter && 'text-center'
      )}>
        {props.name}
      </p>
    </div>
  )
}

export default Participant
