import clsx from 'clsx'
import { SPORT_DATA, SPORT_NAME_SIZE } from './constants'

export type SportNameProps = {
  name: string
  sportId: number
  size?: keyof typeof SPORT_NAME_SIZE
}

const SportName = ({
  name,
  sportId: id,
  size = 'sm',
}: Readonly<SportNameProps>) => {
  const _class = SPORT_DATA[id] || SPORT_DATA[33]
  const _size = SPORT_NAME_SIZE[size] || SPORT_NAME_SIZE.sm
  return (
    <div
      className={clsx(
        'w-fit px-2 text-[10px] uppercase font-[600] rounded-full',
        _class,
        _size
      )}
    >
      {name}
    </div>
  )
}

export default SportName
