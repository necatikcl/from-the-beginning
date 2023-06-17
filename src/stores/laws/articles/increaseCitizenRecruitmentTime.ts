import { watchEffect } from 'vue';

import useTownHall from '@/stores/townHall';

import type { LawArticle } from '../types';

interface Props extends LawArticle {
  additionalMultiplier?: number,
}

export default ({
  key,
  active,
  additionalMultiplier = 1,
}: Props) => {
  const LAW_KEY = `laws.${key}` as const;
  const townHall = useTownHall();

  watchEffect(() => {
    let newValue = 0;

    if (active.value) {
      newValue = additionalMultiplier;
    }

    townHall.citizenIntervalMultiplier.setItem(LAW_KEY, newValue);
  });
};
