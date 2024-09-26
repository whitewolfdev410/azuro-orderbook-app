import { useMemo } from 'react'
import Skeleton from './Skeleton'
import { SkeletonArrayProps } from './props'
import { makeSkeletonArray } from './utils'

export default function SkeletonArray({
  length,
  ...props
}: SkeletonArrayProps) {
  const array = useMemo(() => makeSkeletonArray(length), [length])
  return array.map((key) => <Skeleton key={key} {...props} />)
}
