import fixNumber from '@/utils/fixNumber';
import {
  computed, ref, type ComputedRef, type Ref,
} from 'vue';

type Data = { [key: string]: number };
export interface NumberMap {
  data: Ref<Data>,
  total: ComputedRef<number>,
  deleteItem: (key: string) => void,
  setItem: (key: string, val: number, allowZeroRevenue?: boolean) => void,
  getFilteredTotal: (
    excludeKey: string | ((key: string) => boolean),
    filterKey: (val: number) => boolean
  ) => number,
}

const useNumberMap = (defaultData?: Data): NumberMap => {
  const data = ref<Data>(defaultData || {});

  const total = computed(() => Object.values(data.value)
    .reduce((acc, value) => acc + value, 0));

  const getFilteredTotal: NumberMap['getFilteredTotal'] = (excludeKey, filterValue = () => true) => Object.entries(data.value)
    .reduce((acc, [key, value]) => {
      const excluded = typeof excludeKey === 'string' ? key === excludeKey : excludeKey(key);

      if (!filterValue(value) || excluded) return acc;

      return acc + value;
    }, 0);

  const deleteItem: NumberMap['deleteItem'] = (key) => {
    delete data.value[key];
  };

  const setItem: NumberMap['setItem'] = (key, val, allowZeroRevenue = false) => {
    const value = fixNumber(val);

    if (!allowZeroRevenue && value === 0) {
      deleteItem(key);
      return;
    }

    data.value[key] = value;
  };

  return {
    data, total, deleteItem, setItem, getFilteredTotal,
  };
};

export default useNumberMap;
