import { defineStore } from 'pinia';

import useResources from '@/stores/resources';

import useCitizens, { jobKeys } from '../citizens';

import increaseBuildingProductions from './articles/increaseBuildingProductions';
import increaseCitizenRecruitmentTime from './articles/increaseCitizenRecruitmentTime';
import increaseFoodConsumption from './articles/increaseFoodConsumption';
import increaseIdleFoodProduction from './articles/increaseIdleFoodProduction';
import increaseJobProduction from './articles/increaseJobProduction';
import increasePopulationPenalty from './articles/increasePopulationPenalty';
import increaseResourceProduction from './articles/increaseResourceProduction';
import setHappinesBasedIdle from './articles/setHappinesBasedIdle';
import setHappinessImpact from './articles/setHappinessImpact';
import createLaw from './utils';

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

const happiness = createLaw('happiness', (props) => {
  increaseJobProduction({
    ...props,
    multiplier: 0.5,
    jobsToInclude: [...jobKeys],
  });

  increasePopulationPenalty({
    ...props,
    value: 0.1,
  });

  increaseCitizenRecruitmentTime({
    ...props,
    additionalMultiplier: -0.25,
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
  const items = [diligence(), land(), urbanization(), happiness()];

  return { items };
});

export default useLaws;
