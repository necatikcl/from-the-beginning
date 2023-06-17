import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, watch } from 'vue';

import useNumberMap from '@/composables/useNumberMap';

import type { Building } from '../../config/buildings';
import useLabourStore from '../labour';
import useResources, { type ResourceKey } from '../resources';
import useTownHall from '../townHall';

import {
  useActiveLabour,
  useAvailableBuildings,
  getBuildingByKey,
  getBuildingResourceRequirements,
  getBuildingLabourRequirement,
  getBuildingRevenue,
  type LabourProgress,
} from './utils';

const useBuildings = defineStore('buildings', () => {
  const owned = useStorage<Building['key'][]>('buildings.owned', []);

  const townHall = useTownHall();
  const resources = useResources();
  const labour = useLabourStore();
  const availableBuildings = useAvailableBuildings(owned);

  const buildingOutputMultiplier = useNumberMap('buildings.buildingOutputMultiplier', { base: 1 });

  const {
    activeLabour,
    labourProgresses,
    hasProgress,
    isPaused,
  } = useActiveLabour();

  const canAfford = (key: Building['key']) => {
    const resourceRequirements = getBuildingResourceRequirements(key);

    return resourceRequirements.every(
      ([resourceKey, amount]: [ResourceKey, number]) => resources[resourceKey].value >= amount,
    );
  };

  const canBuild = (key: Building['key']) => {
    const building = getBuildingByKey(key);
    if (!building) return false;

    return townHall.level >= (building.requirements.level || 0);
  };

  const getBuildingLabourRemaining = (key: Building['key']) => {
    const progress = labourProgresses[key];
    const total = getBuildingLabourRequirement(key) as number;

    if (!progress) return total;

    return total - progress.value;
  };

  const addRevenues = (key: string, revenues: [ResourceKey, number][]) => {
    revenues.forEach(([resourceKey, amount]: [ResourceKey, number]) => {
      const multiplier = buildingOutputMultiplier.total.value;
      resources[resourceKey].setRevenue(`buildings.${key}`, amount * multiplier);
    });
  };

  const removeRevenues = (key: string, revenues: [ResourceKey, number][]) => {
    revenues.forEach(([resourceKey]: [ResourceKey, number]) => {
      resources[resourceKey].setRevenue(`buildings.${key}`, 0);
    });
  };

  watch(buildingOutputMultiplier.total, () => {
    owned.value.forEach((key) => {
      const revenues = getBuildingRevenue(key);

      addRevenues(key, revenues);
    });
  });

  const completeBuilding = (key: Building['key']) => {
    delete labourProgresses[key];

    owned.value.push(key);

    let paused = false;

    const revenues = getBuildingRevenue(key);
    addRevenues(key, revenues);

    resources.addTickListener(() => {
      revenues.forEach(([resourceKey, amount]: [ResourceKey, number]) => {
        const newPauseState = amount < 0 && resources[resourceKey].value < (amount * -1);

        if (newPauseState === paused) return;
        paused = newPauseState;

        if (paused) {
          removeRevenues(key, revenues);
        } else {
          addRevenues(key, revenues);
        }
      });
    });
  };

  const labourTickFn = (key: Building['key']) => () => {
    const totalRequirement = getBuildingLabourRequirement(key) as number;

    const labourProgress = labourProgresses[key] as LabourProgress;

    labourProgress.value += labour.value;

    if (labourProgress.value >= totalRequirement) {
      resources.removeTickListener(labourProgress.tickHook);
      completeBuilding(key);
    }
  };

  const startBuilding = (key: Building['key']) => {
    if (!hasProgress(key)) {
      const affordable = canAfford(key);

      if (owned.value.includes(key) || !affordable) {
        return;
      }

      const resourceRequirements = getBuildingResourceRequirements(key);

      resourceRequirements.forEach(([resourceKey, amount]) => {
        resources[resourceKey].value -= amount;
      });
    }

    const labourProgress = labourProgresses[key] || {
      value: 0,
      tickHook: labourTickFn(key),
    };

    if (!labourProgress.tickHook) {
      labourProgress.tickHook = labourTickFn(key);
    }

    activeLabour.value = key;
    resources.addTickListener(labourProgress.tickHook);

    labourProgresses[key] ||= labourProgress;
  };

  const cancelBuilding = (key: Building['key']) => {
    if (!hasProgress(key)) return;

    const { tickHook } = labourProgresses[key] as LabourProgress;

    activeLabour.value = undefined;
    resources.removeTickListener(tickHook);
  };

  const buildingsOwned = computed(
    () => owned.value.map(getBuildingByKey).filter(Boolean) as Building[],
  );

  if (activeLabour.value) {
    const { tickHook } = labourProgresses[activeLabour.value] as LabourProgress;

    resources.removeTickListener(tickHook);

    startBuilding(activeLabour.value);
  }

  return {
    buildingOutputMultiplier,
    activeLabour,
    owned,
    availableBuildings,
    buildingsOwned,
    labourProgresses,
    canBuild,
    getBuildingByKey,
    getBuildingResourceRequirements,
    getBuildingLabourRequirement,
    getBuildingLabourRemaining,
    startBuilding,
    cancelBuilding,
    canAfford,
    hasProgress,
    isPaused,
  };
});

export default useBuildings;
