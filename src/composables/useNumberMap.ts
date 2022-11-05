import fixNumber from '@/utils/fixNumber';
import { computed, ref } from 'vue';

const useNumberMap = () => {
  const data = ref<{ [key: string]: number }>({});
  const total = computed(() => Object.values(data.value)
    .reduce((acc, value) => acc + value, 0));

  const deleteItem = (key: string) => {
    delete data.value[key];
  };

  const setItem = (key: string, val: number, allowZeroRevenue = false) => {
    const value = fixNumber(val);

    if (!allowZeroRevenue && value === 0) {
      deleteItem(key);
      return;
    }

    data.value[key] = value;
  };

  return {
    data, total, deleteItem, setItem,
  } as const;
};

export default useNumberMap;
