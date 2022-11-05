import useCitizens from '@/stores/citizens';
import { watchEffect } from 'vue';
import type { LawArticle } from '../types';

interface Props extends LawArticle {
  value: number
}

export default ({
  active,
  key,
  value,
}: Props) => {
  const LAW_KEY = `laws.${key}` as const;

  const citizens = useCitizens();

  watchEffect(() => {
    let newValue = 0;

    if (active.value) {
      newValue = value;
    }

    citizens.populationPenalty.setItem(LAW_KEY, newValue);
  });
};
