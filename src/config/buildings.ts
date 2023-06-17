import type { ResourceKey } from '../stores/resources';

interface BuildingsUnstrictKeys {
  key: string,
  requirements: {
    labour: number,
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
      labour: 100,
      level: 1,
      resources: {
        food: 200,
        gold: 10,
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
      labour: 170,
      level: 2,
      resources: {
        food: 250,
        gold: 100,
      },
    },
    revenue: {
      gold: 5,
    },
  },
] as const;

export default BUILDINGS;

export type Building = BuildingsUnstrictKeys & {
  key: typeof BUILDINGS[number]['key'],
};
