import useBuildings from '@/stores/buildings';
import { watchEffect } from 'vue';
import type { LawArticle } from '../types';

interface Props extends LawArticle {
  additionalProduction?: number,
}

export default ({
  key,
  active,
  additionalProduction = 1,
}: Props) => {
  const LAW_KEY = `laws.${key}` as const;
  const building = useBuildings();

  watchEffect(() => {
    let newValue = 0;

    if (active.value) {
      newValue = additionalProduction;
    }

    building.buildingOutputMultiplier.setItem(LAW_KEY, newValue);
  });
};
