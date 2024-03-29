import { defineStore } from 'pinia';

import useNumberMap from '@/composables/useNumberMap';

const useLabourStore = defineStore('labour', () => {
  const {
    data: revenues,
    total: value,
    deleteItem: deleteRevenue,
    setItem: setRevenue,
    getFilteredTotal: getFilteredTotalRevenue,
  } = useNumberMap('labour');

  return {
    revenues,
    value,
    setRevenue,
    deleteRevenue,
    getFilteredTotalRevenue,
  };
});

export default useLabourStore;
