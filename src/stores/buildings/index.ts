import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import useNumberMap from '@/composables/useNumberMap';
import useResources, { type ResourceKey } from '../resources';
import {
  useActiveLabour,
  useAvailableBuildings,
  getBuildingByKey,
  getBuildingResourceRequirements,
  getBuildingLabourRequirement,
  getBuildingRevenue,
  type LabourProgress,
} from './utils';
import type { Building } from '../../config/buildings';
import useTownHall from '../townHall';

const useBuildings = defineStore('buildings', () => {
  const owned = ref<Building['key'][]>([]);

  const townHall = useTownHall();
  const resources = useResources();
  const availableBuildings = useAvailableBuildings(owned);

  const buildingOutputMultiplier = useNumberMap({ base: 1 });

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
    const remaining = getBuildingLabourRemaining(key);

    const addition = Math.min(remaining, resources.labour.value);
    const labourProgress = labourProgresses[key] as LabourProgress;

    labourProgress.value += addition;
    resources.labour.value -= addition;

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

    activeLabour.value = key;
    resources.addTickListener(labourProgress.tickHook);
    resources.labour.setRevenue(key, 0, true);

    labourProgresses[key] ||= labourProgress;
  };

  const cancelBuilding = (key: Building['key']) => {
    if (!hasProgress(key)) return;

    const { tickHook } = labourProgresses[key] as LabourProgress;

    activeLabour.value = undefined;
    resources.removeTickListener(tickHook);
    resources.labour.deleteRevenue(key);
  };

  const buildingsOwned = computed(
    () => owned.value.map(getBuildingByKey).filter(Boolean) as Building[],
  );

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
