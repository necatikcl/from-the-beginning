import { defineStore } from 'pinia';
import { computed, watchEffect } from 'vue';

import useNumberMap from '@/composables/useNumberMap';

import useLabourStore from '../labour';
import useResources, { resourceKeys } from '../resources';
import useScienceStore from '../science';

export const BASE_HAPPINESS = 100;

const useHappinessStore = defineStore('happiness', () => {
  const resources = useResources();
  const labour = useLabourStore();
  const science = useScienceStore();

  const {
    data: happinessImpacts,
    total: happinessImpactTotal,
    deleteItem: deleteHappinessImpact,
    setItem: setHappinessImpact,
  } = useNumberMap('happiness');

  const happiness = computed(() => BASE_HAPPINESS + happinessImpactTotal.value);

  const bonusRevenue = computed(() => {
    if (happiness.value >= 75) return 25 - (100 - happiness.value);

    return (75 - happiness.value) * -1;
  });

  watchEffect(() => {
    const revenuePercentage = bonusRevenue.value / 100;

    [
      ...resourceKeys.map((key) => resources[key]),
      labour,
      science,
    ].forEach((store) => {
      const revenuePerSecond = store.getFilteredTotalRevenue(
        'resources.happiness',
        (value) => value > 0,
      );

      store.setRevenue('resources.happiness', revenuePerSecond * revenuePercentage);
    });
  });

  return {
    happiness,
    happinessImpacts,
    bonusRevenue,
    setHappinessImpact,
    deleteHappinessImpact,
  };
});

export default useHappinessStore;
