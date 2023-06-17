<template>
  <fb-popover-details
    :title="title"
    :data="data"
  >
    <div class="fb-resources-item">
      <div class="fb-resources-item-icon">
        <fb-symbol :name="name" />
      </div>
      <div class="fb-resources-item-value">
        {{ formatNumber(resource.value, 'compact') }}

        <fb-badge
          v-if="resource.value === resource.capacity"
          type="secondary"
        >
          <fb-icon icon="boxes-stacked" />
        </fb-badge>
        <fb-badge
          v-else-if="resource.revenuePerSecond !== 0"
          :type="revenueWeight.type"
        >
          {{ revenueWeight.text }}
        </fb-badge>
      </div>
    </div>
  </fb-popover-details>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { MessageKey, translate } from '@/locale';
import type { ResourceKey } from '@/stores/resources';
import useResources from '@/stores/resources';
import formatNumber from '@/utils/formatNumber';
import weightNumber from '@/utils/weightNumber';

import { type Item } from './FbPopoverDetails.vue';

export interface Props {
  name: ResourceKey,
}

const props = defineProps<Props>();
const resources = useResources();

const resource = computed(() => resources[props.name]);

const revenueWeight = computed(() => weightNumber(resource.value.revenuePerSecond));

type DataItem = {
  happiness: boolean
} & Item

const data = computed<DataItem[]>(() => {
  const revenuesEntries = Object.entries(resource.value.revenues) as [MessageKey, number][];

  const revenues = revenuesEntries.flatMap(([key, value]): DataItem[] | DataItem | boolean => {
    const { text, type } = weightNumber(value);

    const item = {
      label: translate(key),
      value: text,
      type,
    };

    if (key === 'resources.happiness') {
      return [
        { ...item, happiness: true },
        { seperator: true, happiness: true },
      ] as DataItem[];
    }

    return item as DataItem;
  }).filter(Boolean);

  revenues.sort((a: any) => (a.value < 0 ? 1 : -1));
  revenues.sort((a: any) => (a.happiness ? 0 : -1));

  return [
    {
      label: translate('resources.capacity'),
      value: formatNumber(resource.value.capacity, 'compact'),
    },
    revenues.length > 0 && {
      seperator: true,
    },
    ...revenues,
    ...(resource.value.revenuePerSecond > 0 ? [
      { seperator: true },
      {
        label: translate('revenue/s'),
        value: revenueWeight.value.text,
        type: revenueWeight.value.type,
      },
    ] : []),
  ] as DataItem[];
});

const title = computed(() => translate(`resources.${props.name}`));
</script>

<style lang="scss" scoped>
  .fb-resources-item {
    @apply p-4 rounded-lg bg-gray-100 text-xl flex items-center h-66px;

    &-icon {
      @apply mr-2;
    }

    &-value {
      @apply text-base flex items-center justify-between flex-1;
    }
  }
</style>
