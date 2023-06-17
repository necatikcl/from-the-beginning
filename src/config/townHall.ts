import createConfig from '@/utils/createConfig';

import type { ResourceKey } from '../stores/resources';

interface Level {
  capacities: {
    [K in ResourceKey]: number
  },
  revenue: {
    [K in ResourceKey]: number
  },
  citizens: number,
}

interface Config {
  [key: number]: Level
}

export default createConfig<Config>(() => ({
  1: {
    capacities: {
      food: 250,
      gold: 100,
    },
    revenue: {
      food: 2,
      gold: 1,
    },
    citizens: 10,
  },
  2: {
    capacities: {
      food: 1000,
      gold: 300,
    },
    revenue: {
      food: 5,
      gold: 4,
    },
    citizens: 25,
  },
  3: {
    capacities: {
      food: 5000,
      gold: 1000,
    },
    revenue: {
      food: 20,
      gold: 10,
    },
    citizens: 100,
  },
  4: {
    capacities: {
      food: 25000,
      gold: 5000,
    },
    revenue: {
      food: 50,
      gold: 25,
    },
    citizens: 1000,
  },
}));
