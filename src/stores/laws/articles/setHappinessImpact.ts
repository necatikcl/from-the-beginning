import { watchEffect } from 'vue';

import useHappinessStore from '@/stores/happiness';

import type { LawArticle } from '../types';

interface Props extends LawArticle {
  value: number | (() => number)
  condition?: () => boolean
}

export default ({
  active,
  key,
  value,
  condition = () => true,
}: Props) => {
  const LAW_KEY = `laws.${key}` as const;

  const happiness = useHappinessStore();

  watchEffect(() => {
    let newValue = 0;

    if (active.value && condition()) {
      newValue = typeof value === 'function' ? value() : value;
    }

    happiness.setHappinessImpact(LAW_KEY, newValue);
  });
};
