import { TGame } from '@/types'
import clsx from 'clsx'
import { useCallback, useMemo, useState } from 'react'
import { PARTICIPANT_SIZE } from './constants'

export type ParticipantProps = {
  className?: string
  size?: keyof typeof PARTICIPANT_SIZE
} & TGame['participants'][0]

const Participant = (props: Readonly<ParticipantProps>) => {
  const { size = 'sm', className } = props
  const [error, setError] = useState(false)

  const handleError = useCallback(() => {
    setError(true)
  }, [])

  const showPlaceholder = useMemo(
    () => error || !props.image,
    [error, props.image]
  )

  return (
    <div
      className={clsx(
        'flex items-center gap-2 text-[12px] overflow-hidden',
        PARTICIPANT_SIZE[size].text,
        className,
      )}
    >
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
      <p className="text-left w-full text-[16px] overflow-hidden text-ellipsis">
        {props.name}
      </p>
    </div>
  )
}

export default Participant
