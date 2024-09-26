'use client'
import Image from 'next/image'
import { useCallback, useState } from 'react'

export type AvatarParticipantsProps = {
  name: string
  image?: string
  width?: number
  height?: number
}

const AvatarParticipants = (props: Readonly<AvatarParticipantsProps>) => {
  const [error, setError] = useState(false)
  const { name, image, width = 24, height = 24 } = props
  const showPlaceholder = !image || error

  const handleError = useCallback(() => setError(true), [])

  if (showPlaceholder)
    return (
      <div
        className="rounded-full border border-blue-100"
        style={{ width, height }}
      />
    )

  return (
    <Image
      src={image ?? ''}
      width={width}
      height={height}
      onError={handleError}
      alt={name}
    />
  )
}

export default AvatarParticipants
