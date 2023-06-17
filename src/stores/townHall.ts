import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { watch, computed } from 'vue';

import useNumberMap from '@/composables/useNumberMap';
import useCitizens from '@/stores/citizens';

import useConfig from '../config/townHall';

import useHappinessStore from './happiness';
import useResources, { resourceKeys } from './resources';

const BASE_CITIZEN_INTERVAL = 5000;

const useTownHall = defineStore('townHall', () => {
  const resources = useResources();
  const citizens = useCitizens();
  const config = useConfig();
  const happinessStore = useHappinessStore();

  const level = useStorage('townHall.level', 1);

  watch(level, () => {
    resourceKeys.forEach((key) => {
      const levelConfig = config[level.value];

      resources[key].setCapacity(key, levelConfig.capacities[key]);
      resources[key].setRevenue('buildings.townHall', levelConfig.revenue[key]);
    });
  }, { immediate: true });

  const upgradeable = computed(() => resources.food.value === resources.food.capacity
    && resources.gold.value === resources.gold.capacity);

  const upgrade = () => {
    if (!upgradeable.value) return;

    resources.gold.value = 0;
    level.value += 1;
  };

  const citizenIntervalMultiplier = useNumberMap('townHall.citizenIntervalMultiplier', { base: 1 });

  const citizenIntervalTime = computed(() => {
    const value = BASE_CITIZEN_INTERVAL * ((190 - happinessStore.happiness) / 100);

    return (value - (value % 1000)) * citizenIntervalMultiplier.total.value;
  });

  const citizensCanBeRecruited = computed(() => config[level.value].citizens > citizens.count);

  let citizenInterval = 0;
  const passedIntervalMs = useStorage('townHall.passedIntervalMs', 0);

  const checkRecruitmentTime = () => {
    if (passedIntervalMs.value < citizenIntervalTime.value) return;

    citizens.count += 1;
    passedIntervalMs.value = 0;
  };

  watch(citizensCanBeRecruited, (newValue) => {
    clearInterval(citizenInterval);
    passedIntervalMs.value = 0;

    if (newValue) {
      // @ts-ignore
      citizenInterval = setInterval(() => {
        passedIntervalMs.value += 100;

        checkRecruitmentTime();
      }, 100);
    }
  });

  if (citizensCanBeRecruited.value) {
    citizenInterval = setInterval(() => {
      passedIntervalMs.value += 100;

      checkRecruitmentTime();
    }, 100);
  }

  return {
    level,
    upgrade,
    upgradeable,
    passedIntervalMs,
    citizenIntervalTime,
    citizensCanBeRecruited,
    citizenIntervalMultiplier,
  };
});

export default useTownHall;
