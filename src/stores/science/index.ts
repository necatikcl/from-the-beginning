import { defineStore } from 'pinia';

import useNumberMap from '@/composables/useNumberMap';

const useScienceStore = defineStore('science', () => {
  const {
    data: revenues,
    total: value,
    deleteItem: deleteRevenue,
    setItem: setRevenue,
    getFilteredTotal: getFilteredTotalRevenue,
  } = useNumberMap('science');

  return {
    revenues,
    value,
    setRevenue,
    deleteRevenue,
    getFilteredTotalRevenue,
  };
});

export default useScienceStore;
