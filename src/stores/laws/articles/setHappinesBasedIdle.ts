import useCitizens from '@/stores/citizens';
import useHappinessStore from '@/stores/happiness';
import { watch } from 'vue';
import type { LawArticle } from '../types';

interface Props extends LawArticle {
  value: number
}

export default ({
  key,
  active,
  value,
}: Props) => {
  const LAW_KEY = `laws.${key}` as const;

  const happinessStore = useHappinessStore();
  const citizens = useCitizens();

  watch(() => [active.value, citizens.idle], () => {
    let newValue = 0;

    if (active.value) {
      newValue = citizens.idle * value;
    }

    happinessStore.setHappinessImpact(LAW_KEY, newValue);
  });
};
