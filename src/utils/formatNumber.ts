const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
});

const percentDetailedFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

const compactFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 3,
});

const formatters = {
  currency: currencyFormatter,
  percent: percentFormatter,
  compact: compactFormatter,
  percentDetailed: percentDetailedFormatter,
};

export type NumberFormat = keyof typeof formatters;

const formatNumber = (value: number, type: NumberFormat) => {
  const formattedValue = formatters[type].format(value);

  if (type === 'currency') return formattedValue.replace(/\D00(?=\D*$)/, '');

  return formattedValue;
};

export default formatNumber;
