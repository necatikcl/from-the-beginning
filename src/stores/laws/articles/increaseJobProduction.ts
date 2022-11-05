import type { NumberMap } from '@/composables/useNumberMap';
import useCitizens, { type Job } from '@/stores/citizens';
import { watchEffect } from 'vue';
import type { LawArticle } from '../types';
import { incrementOrMultiply, lawsFilterer } from './utils';

const getRevenuePerSecond = (map: NumberMap) => map.getFilteredTotal(
  lawsFilterer,
  (value) => value > 0,
);

interface Props extends LawArticle {
  multiplier?: number,
  increment?: number,
  jobsToInclude: Job[],
  condition?: () => boolean
}

export default ({
  key,
  active,
  multiplier = 1,
  increment = 0,
  jobsToInclude,
  condition = () => true,
}: Props) => {
  const LAW_KEY = `laws.${key}` as const;
  const citizens = useCitizens();

  watchEffect(() => {
    jobsToInclude.forEach((jobKey) => {
      const jobIncrement = citizens.jobIncrements[jobKey] as unknown as NumberMap;

      const newValue = incrementOrMultiply({
        active: active.value && condition(),
        increment,
        multiplier,
        currentValue: () => getRevenuePerSecond(jobIncrement),
      });

      jobIncrement.setItem(LAW_KEY, newValue);
    });
  });
};
