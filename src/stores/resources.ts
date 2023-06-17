import { defineStore } from 'pinia';
import { computed, nextTick, ref } from 'vue';

import useNumberMap from '@/composables/useNumberMap';

const INITIAL_RESOURCES = {
  food: 250,
  gold: 100,
  labour: 100,
} as const;

export type ResourceKey = keyof typeof INITIAL_RESOURCES;
export const resourceKeys = Object.keys(INITIAL_RESOURCES) as ResourceKey[];

export const resourceHandler = (key: ResourceKey) => {
  const resource = ref<number>(INITIAL_RESOURCES[key]);

  const {
    data: revenues,
    total: revenuePerSecond,
    setItem: setRevenue,
    deleteItem: deleteRevenue,
    getFilteredTotal: getFilteredTotalRevenue,
  } = useNumberMap();

  const {
    data: capacities,
    total: capacity,
    setItem: setCapacity,
    deleteItem: deleteCapacity,
  } = useNumberMap();

  const value = computed({
    get() {
      return resource.value;
    },
    set(val: number) {
      resource.value = Math.min(val, capacity.value);

      if (resource.value < 0) {
        nextTick(() => {
          value.value = 0;
        });
      }
    },
  });

  return {
    value,
    capacity,
    capacities,
    revenues,
    revenuePerSecond,
    setRevenue,
    getFilteredTotalRevenue,
    deleteRevenue,
    setCapacity,
    deleteCapacity,
  };
};

export type TickListener = () => void;

const useResources = defineStore('resources', () => {
  const food = resourceHandler('food');
  const gold = resourceHandler('gold');
  const labour = resourceHandler('labour');

  const ALL_RESOURCES = [food, gold, labour];

  const tickHooks: TickListener[] = [];

  const addTickListener = (fn: TickListener) => tickHooks.push(fn);
  const removeTickListener = (fn: TickListener) => tickHooks.splice(tickHooks.indexOf(fn), 1);

  const tick = () => {
    ALL_RESOURCES.forEach(({ value, revenuePerSecond }) => {
      value.value += revenuePerSecond.value;
    });

    tickHooks.forEach((fn) => fn());
  };

  let interval = 0;

  clearInterval(interval);
  interval = window.setInterval(tick, 1000);

  return {
    food,
    gold,
    labour,
    tick,
    addTickListener,
    removeTickListener,
  };
});

export default useResources;
