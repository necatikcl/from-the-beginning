import { watchEffect } from 'vue';

import useResources, { type ResourceKey } from '@/stores/resources';

import type { LawArticle } from '../types';

import { incrementOrMultiply, lawsFilterer } from './utils';

interface Props extends LawArticle {
  multiplier?: number,
  increment?: number,
  resourcesToInclude: ResourceKey[],
  condition?: () => boolean
}

export default ({
  key,
  active,
  multiplier = 1,
  increment = 0,
  resourcesToInclude,
  condition = () => true,
}: Props) => {
  const LAW_KEY = `laws.${key}` as const;
  const resources = useResources();

  watchEffect(() => {
    resourcesToInclude.forEach((resourceKey) => {
      const resource = resources[resourceKey];

      const newValue = incrementOrMultiply({
        active: active.value && condition(),
        increment,
        multiplier,
        currentValue: () => resource.getFilteredTotalRevenue(
          lawsFilterer,
          (value) => value > 0,
        ),
      });

      resource.setRevenue(LAW_KEY, newValue);
    });
  });
};
