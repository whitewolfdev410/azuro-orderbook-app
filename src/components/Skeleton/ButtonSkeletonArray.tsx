import { useMemo } from 'react';
import ButtonSkeleton from './ButtonSkeleton';
import { ButtonSkeletonArrayProps } from './props';
import { makeSkeletonArray } from './utils';

export default function ButtonSkeletonArray({
  length,
  ...props
}: ButtonSkeletonArrayProps) {
  const array = useMemo(() => makeSkeletonArray(length), [length]);
  return array.map((key) => <ButtonSkeleton key={key} {...props} />);
}
