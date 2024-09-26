export default function formatOdds(odds: number | string) {
  if (odds === 0) return 0
  return (1 - 1 / Number(odds)) * 100
}
