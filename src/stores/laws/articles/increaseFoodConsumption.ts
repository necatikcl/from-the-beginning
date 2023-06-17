import { watchEffect } from 'vue';

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
  const LAW_KEY = `laws.${key}`;

  const citizens = useCitizens();

  const getFilteredTotalIncrement = () => citizens.foodConsumption
    .getFilteredTotal(lawsFilterer, (value) => value < 0);

  watchEffect(() => {
    const newValue = incrementOrMultiply({
      active: active.value,
      increment,
      multiplier,
      currentValue: getFilteredTotalIncrement,
    });

    citizens.foodConsumption.setItem(LAW_KEY, newValue);
  });
};
