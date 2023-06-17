import { watch } from 'vue';

import useCitizens from '@/stores/citizens';

import type { LawArticle } from '../types';

import { incrementOrMultiply, lawsFilterer } from './utils';

interface Props extends LawArticle {
  multiplier?: number,
  increment?: number,
}

export default ({
  key,
  active,
  multiplier = 1,
  increment = 0,
}: Props) => {
  const LAW_KEY = `laws.${key}` as const;

  const citizens = useCitizens();

  const getFilteredTotalIncrement = () => citizens.idleIncrements
    .getFilteredTotal(lawsFilterer, (value) => value > 0);

  watch(() => [active.value, getFilteredTotalIncrement()], () => {
    const newValue = incrementOrMultiply({
      active: active.value,
      increment,
      multiplier,
      currentValue: getFilteredTotalIncrement,
    });

    citizens.idleIncrements.setItem(LAW_KEY, newValue);
  });
};
