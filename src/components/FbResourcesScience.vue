<template>
  <fb-popover-details
    :title="translate('resources.science')"
    :data="data"
  >
    <div class="fb-resources-science">
      <div class="fb-resources-science-icon">
        <fb-symbol name="science" />
      </div>
      <div class="fb-resources-science-value">
        {{ formattedValue }}
      </div>
    </div>
  </fb-popover-details>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { MessageKey, translate } from '@/locale';
import useScienceStore from '@/stores/science';
import { getObjectEntries } from '@/utils/getObjectEntries';
import weightNumber from '@/utils/weightNumber';

import type { Item } from './FbPopoverDetails.vue';

const science = useScienceStore();

const formattedValue = computed(() => {
  if (science.value === 0) return '0';

  return `+${formatNumber(science.value, 'compact')}`;
});

const data = computed(() => {
  const items: Item[] = [];

  getObjectEntries(science.revenues).forEach(([_key, value]) => {
    const key = _key as MessageKey;
    const { type, text } = weightNumber(value);

    if (key === 'resources.happiness') {
      items.push({ seperator: true });
    }

    items.push({
      icon: key === 'resources.happiness' ? 'happiness' : undefined,
      label: translate(key),
      type,
      value: text,
    });
  });

  return items;
});
</script>

<style lang="scss" scoped>
  .fb-resources-science {
    @apply p-4 rounded-lg bg-gray-100 text-xl flex items-center h-66px;

    &-icon {
      @apply mr-2;
    }

    &-value {
      @apply text-base flex items-center justify-between flex-1;
    }
  }
</style>
