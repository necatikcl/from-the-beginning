import { defineStore } from 'pinia';
import useResources from '@/stores/resources';
import useCitizens, { jobKeys } from '../citizens';
import increaseFoodConsumption from './articles/increaseFoodConsumption';
import increaseJobProduction from './articles/increaseJobProduction';
import increaseIdleFoodProduction from './articles/increaseIdleFoodProduction';
import createLaw from './utils';
import setHappinesBasedIdle from './articles/setHappinesBasedIdle';
import setHappinessImpact from './articles/setHappinessImpact';
import increaseResourceProduction from './articles/increaseResourceProduction';
import increaseBuildingProductions from './articles/increaseBuildingProductions';
import increasePopulationPenalty from './articles/increasePopulationPenalty';

const diligence = createLaw('diligence', (props) => {
  increaseJobProduction({
    ...props,
    multiplier: 1.2,
    jobsToInclude: [...jobKeys],
  });

  increaseFoodConsumption({
    ...props,
    multiplier: 2,
  });

  increaseIdleFoodProduction({
    ...props,
    multiplier: 0,
  });

  setHappinesBasedIdle({
    ...props,
    value: -2,
  });

  increasePopulationPenalty({
    ...props,
    value: -0.2,
  });
});

const land = createLaw('land', (props) => {
  const resources = useResources();
  const citizens = useCitizens();

  increaseJobProduction({
    ...props,
    multiplier: 2,
    jobsToInclude: ['farmers'],
  });

  increaseJobProduction({
    ...props,
    multiplier: 0.5,
    jobsToInclude: ['lumberjacks'],
    condition: () => resources.wood.value > resources.wood.capacity / 2,
  });

  increaseJobProduction({
    ...props,
    multiplier: 2,
    jobsToInclude: ['lumberjacks'],
    condition: () => resources.wood.value < resources.wood.capacity / 2,
  });

  setHappinessImpact({
    ...props,
    value: () => {
      const fromFarmers = citizens.jobs.farmers * 0.2;

      if (citizens.jobs.lumberjacks > citizens.jobs.farmers) return fromFarmers - 20;
      return fromFarmers;
    },
  });
});

const urbanization = createLaw('urbanization', (props) => {
  const citizens = useCitizens();

  increaseResourceProduction({
    ...props,
    multiplier: 2,
    resourcesToInclude: ['labour'],
  });

  setHappinessImpact({
    ...props,
    value: () => citizens.jobs.farmers * -3,
  });

  setHappinessImpact({
    ...props,
    value: () => citizens.jobs.builders * 0.2,
  });

  increaseBuildingProductions({
    ...props,
    additionalProduction: 0.2,
  });
});

const useLaws = defineStore('diligenceStore', () => {
  const items = [diligence(), land(), urbanization()];

  return { items };
});

export default useLaws;
