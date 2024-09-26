export default function getColor(gradient?: string) {
  if (gradient) return gradient
  return 'currentColor'
}
