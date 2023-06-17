import { defineStore } from 'pinia';

import useNumberMap from '@/composables/useNumberMap';

const useLabourStore = defineStore('labour', () => {
  const {
    data: impacts,
    total: value,
    deleteItem: deleteImpact,
    setItem: setImpact,
    getFilteredTotal: getFilteredImpacts,
  } = useNumberMap('labour');

  return {
    impacts,
    value,
    setImpact,
    deleteImpact,
    getFilteredImpacts,
  };
});

export default useLabourStore;
