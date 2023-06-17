import { useStorage } from '@vueuse/core';
import {
  computed, reactive,
} from 'vue';
import type { Ref } from 'vue';

import storage from '@/utils/storage';

import BUILDINGS, { type Building } from '../../config/buildings';
import type { ResourceKey, TickListener } from '../resources';

export interface LabourProgress {
  value: number,
  tickHook: TickListener
}

export type LabourProgresses = {
  [key in Building['key']]?: LabourProgress
};

export const useActiveLabour = () => {
  const activeLabour = useStorage<Building['key']>('buildings.activeLabour', null);
  const labourProgresses = reactive<LabourProgresses>(storage.get('buildings.labourProgresses') || {});

  watch(labourProgresses, () => {
    storage.set('buildings.labourProgresses', labourProgresses);
  });

  const hasProgress = (key: Building['key']) => labourProgresses[key] !== undefined;
  const isPaused = (key: Building['key']) => hasProgress(key) && activeLabour.value !== key;

  return {
    activeLabour,
    labourProgresses,
    hasProgress,
    isPaused,
  };
};

export const getBuildingByKey = (key: Building['key']) => BUILDINGS
  .find((building) => building.key === key) as Building;

export const getBuildingResourceRequirements = (key: Building['key']) => {
  const building = getBuildingByKey(key);

  if (!building) return [] as [ResourceKey, number][];

  const resourceRequirements = { ...(building.requirements.resources || {}) };

  // @ts-ignore
  delete resourceRequirements.labour;

  return Object.entries(resourceRequirements) as [ResourceKey, number][];
};
export const getBuildingRevenue = (key: Building['key']) => {
  const building = getBuildingByKey(key);

  if (!building) return [] as [ResourceKey, number][];

  const revenues = { ...(building.revenue || {}) };

  return Object.entries(revenues) as [ResourceKey, number][];
};

export const getBuildingLabourRequirement = (key: Building['key']) => getBuildingByKey(key)
  ?.requirements.labour;

export const useAvailableBuildings = (owned: Ref<Building['key'][]>) => computed(
  () => BUILDINGS.filter((item) => !owned.value.includes(item.key)),
);
