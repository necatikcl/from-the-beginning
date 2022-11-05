import {
  computed, reactive, ref,
} from 'vue';
import type { Ref } from 'vue';
import BUILDINGS, { type Building } from '../buildingList';

import type { ResourceKey, TickListener } from '../../resources';

export interface LabourProgress {
  value: number,
  tickHook: TickListener
}

export type LabourProgresses = {
  [key in Building['key']]?: LabourProgress
};

export const useActiveLabour = () => {
  const activeLabour = ref<Building['key']>();
  const labourProgresses = reactive<LabourProgresses>({});

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
  ?.requirements.resources.labour;

export const useAvailableBuildings = (owned: Ref<Building['key'][]>) => computed(
  () => BUILDINGS.filter((item) => !owned.value.includes(item.key)),
);
