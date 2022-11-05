import {
  ref, watch, computed,
} from 'vue';
import { defineStore } from 'pinia';

import useCitizens from '@/stores/citizens';
import useConfig from './config';
import useResources, { resourceKeys } from '../../resources';

const useTownHall = defineStore('townHall', () => {
  const resources = useResources();
  const citizens = useCitizens();
  const config = useConfig();

  const level = ref(1);

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

  const citizenIntervalTime = computed(() => config[level.value].citizenInterval);
  const citizensCanBeRecruited = computed(() => config[level.value].citizens > citizens.count);

  let citizenInterval = 0;

  watch([citizenIntervalTime, citizensCanBeRecruited], () => {
    clearInterval(citizenInterval);

    if (!citizensCanBeRecruited.value) {
      return;
    }

    // @ts-ignore
    citizenInterval = setInterval(() => {
      const byPercentage = citizens.count * 0.05;
      const addition = byPercentage > 1 ? Math.floor(byPercentage) : 1;

      citizens.count = Math.min(citizens.count + addition, config[level.value].citizens);
    }, citizenIntervalTime.value);
  }, { immediate: true });

  return {
    level,
    upgrade,
    upgradeable,
    citizenIntervalTime,
    citizensCanBeRecruited,
  };
});

export default useTownHall;
