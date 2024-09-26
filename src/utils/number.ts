export function formatNumber(number: number, decimalPlaces: number) {
  if (!isFinite(number)) return '0'
  return number.toFixed(decimalPlaces).replace(/\.?0+$/, '')
}
