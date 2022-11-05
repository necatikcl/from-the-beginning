import { computed, watchEffect } from 'vue';
import { defineStore } from 'pinia';
import useNumberMap from '@/composables/useNumberMap';
import useResources, { resourceKeys } from './resources';

const BASE_HAPPINESS = 100;

const useHappinessStore = defineStore('happiness', () => {
  const resources = useResources();

  const {
    data: happinessImpacts,
    total: happinessImpactTotal,
    deleteItem: deleteHappinessImpact,
    setItem: setHappinessImpact,
  } = useNumberMap();

  const happiness = computed(() => BASE_HAPPINESS + happinessImpactTotal.value);

  const bonusRevenue = computed(() => {
    if (happiness.value >= 75) return 25 - (100 - happiness.value);

    return (75 - happiness.value) * -1;
  });

  watchEffect(() => {
    const revenuePercentage = bonusRevenue.value / 100;

    resourceKeys.forEach((key) => {
      const revenuesArr = Object.entries(resources[key].revenues);

      const revenuePerSecond = revenuesArr.reduce((acc, [revenueKey, value]) => {
        if (value <= 0 || revenueKey === 'happiness') return acc;

        return acc + value;
      }, 0);

      resources[key].setRevenue('resources.happiness', revenuePerSecond * revenuePercentage);
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
