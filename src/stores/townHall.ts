import {
  ref, watch, computed,
} from 'vue';
import { defineStore } from 'pinia';
import useCitizens from '@/stores/citizens';
import useConfig from '../config/townHall';
import useResources, { resourceKeys } from './resources';
import useHappinessStore from './happiness';

const useTownHall = defineStore('townHall', () => {
  const resources = useResources();
  const citizens = useCitizens();
  const config = useConfig();
  const happinessStore = useHappinessStore();

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

  const citizenIntervalTime = computed(() => {
    const value = 20000 * ((140 - happinessStore.happiness) / 100);

    return value - (value % 1000);
  });

  const citizensCanBeRecruited = computed(() => config[level.value].citizens > citizens.count);

  let citizenInterval = 0;
  let passedIntervalMs = 0;

  const checkRecruitmentTime = () => {
    if (passedIntervalMs < citizenIntervalTime.value) return;

    citizens.count += 1;
    passedIntervalMs = 0;
  };

  watch(citizensCanBeRecruited, (newValue) => {
    clearInterval(citizenInterval);
    passedIntervalMs = 0;

    if (newValue) {
      // @ts-ignore
      citizenInterval = setInterval(() => {
        passedIntervalMs += 25;

        checkRecruitmentTime();
      }, 25);
    }
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
