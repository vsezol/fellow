const formatter = Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 6,
});

export const formatBigNumber = (value: number) => formatter.format(value);
