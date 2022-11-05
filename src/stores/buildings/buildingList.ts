import type { ResourceKey } from '../resources';

interface BuildingsUnstrictKeys {
  key: string,
  requirements: {
    level: number,
    resources: {
      [key in ResourceKey]?: number
    }
  },
  revenue: {
    [key in ResourceKey]?: number
  }
}

const BUILDINGS = [
  {
    key: 'granary',
    requirements: {
      level: 1,
      resources: {
        food: 200,
        wood: 20,
        gold: 10,
        labour: 100,
      },
    },
    revenue: {
      food: 2,
      gold: -0.5,
    },
  },
  {
    key: 'copperMine',
    requirements: {
      level: 2,
      resources: {
        food: 250,
        wood: 10,
        gold: 100,
        labour: 170,
        iron: 15,
      },
    },
    revenue: {
      gold: 5,
      iron: -0.05,
    },
  },
] as const;

export default BUILDINGS;

export type Building = BuildingsUnstrictKeys & {
  key: typeof BUILDINGS[number]['key'],
};
