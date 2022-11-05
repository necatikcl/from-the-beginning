import formatNumber, { type NumberFormat } from './formatNumber';

const weightNumber = (number: number, format: NumberFormat = 'compact'): {
  value: number,
  text: string,
  type: 'success' | 'danger' | 'secondary'
} => {
  if (number > 0) {
    return {
      value: number,
      text: `+${formatNumber(number, format)}`,
      type: 'success',
    };
  }

  if (number < 0) {
    return {
      value: number,
      text: `${formatNumber(number, format)}`,
      type: 'danger',
    };
  }

  return {
    value: 0,
    text: '0',
    type: 'secondary',
  };
};

export default weightNumber;
