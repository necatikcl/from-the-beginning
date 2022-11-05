import {
  ref, reactive, watch, computed,
} from 'vue';
import { defineStore } from 'pinia';
import useResources from './resources';
import useHappinessStore from './happiness';

type JobList = ['farmers', 'merchants', 'lumberjacks', 'miners', 'builders'];
export type Job = JobList[number];

const useCitizens = defineStore('citizens', () => {
  const resources = useResources();
  const citizenCount = ref(15);
  const happinessStore = useHappinessStore();

  const jobs = reactive<{ [K in Job]: number }>({
    farmers: 0,
    merchants: 0,
    lumberjacks: 0,
    miners: 0,
    builders: 0,
  });

  const citizensWithJobs = computed(() => Object.values(jobs).reduce((acc, val) => acc + val, 0));

  const idle = computed(() => {
    const idleCount = citizenCount.value - citizensWithJobs.value;

    return idleCount > 0 ? idleCount : 0;
  });

  const validateCitizenJobCount = () => {
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
  };

  watch(citizenCount, (newCount) => {
    resources.food.setRevenue('citizens', newCount * -0.9);
    happinessStore.setHappinessImpact('citizens.population', newCount * -0.2);

    validateCitizenJobCount();
  }, { immediate: true });

  watch(() => resources.food.value, (food) => {
    if (food < 0) {
      citizenCount.value -= 1;
    }
  });

  watch(idle, () => resources.food.setRevenue('citizens.idle', idle.value), { immediate: true });

  watch(jobs, () => {
    resources.food.setRevenue('citizens.farmers', jobs.farmers * 2);
    resources.labour.setRevenue('citizens.builders', jobs.builders * 1);
    resources.wood.setRevenue('citizens.lumberjacks', jobs.lumberjacks * 0.4);
    resources.gold.setRevenue('citizens.merchants', jobs.merchants);
    resources.iron.setRevenue('citizens.miners', jobs.miners * 0.1);
  }, { immediate: true });

  const assignJob = (jobName: Job, count: number) => {
    if (count < 0) {
      assignJob(jobName, 0);
      return;
    }

    const currentCount = jobs[jobName] || 0;
    const maxCount = currentCount + idle.value;

    jobs[jobName] = Math.min(count, maxCount);
    validateCitizenJobCount();
  };

  const incrementJob = (jobName: Job, by = 1) => assignJob(jobName, jobs[jobName] + by);

  return {
    idle,
    count: citizenCount,
    jobs,
    assignJob,
    incrementJob,
  };
});

export default useCitizens;
