import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import {
  reactive, watch, computed, watchEffect,
} from 'vue';

import useNumberMap, { type NumberMap } from '@/composables/useNumberMap';
import { getObjectEntries } from '@/utils/getObjectEntries';
import storage from '@/utils/storage';

import useHappinessStore from './happiness';
import useLabourStore from './labour';
import useResources, { type ResourceKey } from './resources';

export const jobKeys = ['farmers', 'merchants', 'builders'] as const;

type JobList = typeof jobKeys;
export type Job = JobList[number];

export const jobResourceMap: {
  [K in Job]: ResourceKey | 'labour';
} = {
  farmers: 'food',
  merchants: 'gold',
  builders: 'labour',
} as const;

const useCitizens = defineStore('citizens', () => {
  const resources = useResources();
  const labour = useLabourStore();
  const happinessStore = useHappinessStore();

  const citizenCount = useStorage('citizens.citizenCount', 5);

  const jobs = reactive<{ [K in Job]: number }>(storage.get('citizens.jobs') || {
    farmers: 0,
    merchants: 0,
    builders: 0,
  });

  watch(jobs, () => storage.set('citizens.jobs', jobs));

  const jobIncrements: { [key in Job]: NumberMap } = {
    farmers: useNumberMap('citizens.farmersIncrements', { base: 2 }),
    merchants: useNumberMap('citizens.merchantsIncrements', { base: 1 }),
    builders: useNumberMap('citizens.buildersIncrements', { base: 1 }),
  } as const;

  const citizensWithJobs = computed(() => Object.values(jobs).reduce((acc, val) => acc + val, 0));

  const idleIncrements = useNumberMap('idle.increments', { base: 1 });
  const foodConsumption = useNumberMap('citizens.foodConsumption', { base: -0.9 });
  const populationPenalty = useNumberMap('citizens.populationPenalty', { base: -0.2 });

  const idle = computed(() => {
    const idleCount = citizenCount.value - citizensWithJobs.value;

    return idleCount > 0 ? idleCount : 0;
  });

  watchEffect(() => {
    if (idle.value === 0 && citizensWithJobs.value > citizenCount.value) {
      const temporaryJobsArray = Object.entries(jobs).filter(([key]) => key !== 'idle');

      for (let i = 0; i < citizensWithJobs.value - citizenCount.value; i += 1) {
        const jobWithMaxCount = temporaryJobsArray.reduce(
          (acc, [key, count]) => (count > acc.count ? { key, count } : acc),
          { key: '', count: 0 },
        );

        if (!jobWithMaxCount.key) break;

        jobs[jobWithMaxCount.key as Job] -= 1;
      }
    }
  });

  watch([citizenCount, populationPenalty.total], () => {
    happinessStore.setHappinessImpact('citizens.population', citizenCount.value * populationPenalty.total.value);
  }, { immediate: true });

  watch([citizenCount, foodConsumption.total], () => {
    resources.food.setRevenue('citizens', citizenCount.value * foodConsumption.total.value);
  }, { immediate: true });

  resources.addTickListener(() => {
    if (resources.food.value < 0) {
      citizenCount.value -= 1;
    }
  });

  watch([idle, idleIncrements.total], () => resources.food.setRevenue('citizens.idle', idle.value * idleIncrements.total.value), { immediate: true });

  watchEffect(() => {
    getObjectEntries(jobResourceMap).forEach(
      ([jobKey, resourceKey]) => {
        const key = `citizens.${jobKey}`;
        const value = jobs[jobKey] * jobIncrements[jobKey].total.value;

        if (jobKey === 'builders') {
          labour.setImpact(key, value);
        } else {
          resources[resourceKey as ResourceKey].setRevenue(key, value);
        }
      },
    );
  });

  const assignJob = (jobName: Job, count: number) => {
    if (count < 0) {
      assignJob(jobName, 0);

      return;
    }

    const currentCount = jobs[jobName] || 0;
    const maxCount = currentCount + idle.value;

    jobs[jobName] = Math.min(count, maxCount);
  };

  const incrementJob = (jobName: Job, by = 1) => assignJob(jobName, jobs[jobName] + by);

  return {
    idle,
    foodConsumption,
    populationPenalty,
    idleIncrements,
    count: citizenCount,
    jobs,
    jobIncrements,
    assignJob,
    incrementJob,
  };
});

export default useCitizens;
