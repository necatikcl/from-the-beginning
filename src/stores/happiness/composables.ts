import useHappinessStore from '.';

export const useHappinessRange = () => {
  const happinessStore = useHappinessStore();

  const ranges = [
    { value: 100, icon: 'grin-tears' },
    { value: 90, icon: 'laugh-beam' },
    { value: 80, icon: 'smile-beam' },
    { value: 75, icon: 'meh' },
    { value: 50, icon: 'frown' },
    { value: 25, icon: 'flushed' },
    { value: 0, icon: 'angry' },
  ] as const;

  type Range = {
    value: typeof ranges[number]['value'],
    icon: typeof ranges[number]['icon'],
  };

  return computed(
    () => ranges.find(
      (range) => happinessStore.happiness >= range.value,
    ) as Range,
  );
};
