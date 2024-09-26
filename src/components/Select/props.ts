export type SelectProps<T = string | number> = {
  options: T[]
  value?: T
  onSelect: (value: T) => void
}
