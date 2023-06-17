type IncrementOrMultiplyProps = {
  active: boolean,
  increment?: number,
  multiplier: number,
  currentValue: () => number,
};

export const incrementOrMultiply = ({
  active = false,
  increment = 0,
  multiplier = 1,
  currentValue,
}: IncrementOrMultiplyProps) => {
  if (!active) return 0;
  if (increment) return increment;

  return currentValue() * (multiplier - 1);
};

export const lawsFilterer = (key: string) => key.startsWith('laws') || key.includes('happiness');
