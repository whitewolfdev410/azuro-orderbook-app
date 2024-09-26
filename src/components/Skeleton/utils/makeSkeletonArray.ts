export default function makeSkeletonArray(length: number) {
  return Array.from({ length }).map((_, index) => index)
}
