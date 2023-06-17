import { watchEffect } from 'vue';

import useLabourStore from '@/stores/labour';

import type { LawArticle } from '../types';

import { incrementOrMultiply } from './utils';

interface Props extends LawArticle {
  value?: number | (() => number)
  condition?: () => boolean
  multiplier?: number
}

export default ({
  active,
  key,
  value,
  multiplier,
  condition = () => true,
}: Props) => {
  const LAW_KEY = `laws.${key}` as const;

  const labour = useLabourStore();

  watchEffect(() => {
    const willWork = active.value && condition();

    let newValue = 0;

    if (willWork) {
      if (willWork && value) {
        newValue = typeof value === 'function' ? value() : value;
      }

      if (multiplier) {
        newValue = incrementOrMultiply({
          active: willWork,
          multiplier,
          currentValue: () => labour.getFilteredTotalRevenue(
            LAW_KEY,
            (val) => val > 0,
          ),
        });
      }
    }

    labour.setRevenue(LAW_KEY, newValue);
  });
};
