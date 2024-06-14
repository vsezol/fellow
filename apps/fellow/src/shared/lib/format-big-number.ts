const formatter = Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 3,
  minimumFractionDigits: 3,
});

export const formatBigNumber = (value: number) => {
  if (value < 999) {
    return value;
  }

  return formatter.format(value);
};
