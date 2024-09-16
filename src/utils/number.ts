export const formatNumber = (number: number, decimalPlaces: number) => {
  // check number is infinity then return 0
  if (Number.isFinite(number) === false) {
    return '0';
  }
  return number.toFixed(decimalPlaces).replace(/\.?0+$/, '');
};
