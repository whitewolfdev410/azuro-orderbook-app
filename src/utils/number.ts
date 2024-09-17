export const formatNumber = (number: number, decimalPlaces: number) => {
  if (Number.isFinite(number) === false) {
    return '0';
  }
  return number.toFixed(decimalPlaces).replace(/\.?0+$/, '');
};
