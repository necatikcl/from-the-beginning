<template>
  <fb-popover-details
    title="Happiness"
    :data="data"
  >
    <div
      class="fb-resources-happiness"
      :class="`happiness-${currentHappinessRange.value}`"
    >
      <div class="fb-resources-happiness-icon">
        <fb-icon :icon="currentHappinessRange.icon" />
      </div>
      <div class="fb-resources-happiness-value">
        {{ formatNumber(happinessStore.happiness, "compact") }}
      </div>
    </div>
  </fb-popover-details>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { Item } from '@/components/FbPopoverDetails.vue';
import { translate } from '@/locale';
import type { MessageKey } from '@/locale/messages/en';
import useHappinessStore, { BASE_HAPPINESS } from '@/stores/happiness';
import { useHappinessRange } from '@/stores/happiness/composables';
import formatNumber from '@/utils/formatNumber';
import weightNumber from '@/utils/weightNumber';

const happinessStore = useHappinessStore();
const currentHappinessRange = useHappinessRange();

const happinessImpactItems = computed(() => {
  const items: Item[] = [];

  // @ts-ignore
  Object.entries(happinessStore.happinessImpacts).forEach(([key, value]: [MessageKey, number]) => {
    const { type, text } = weightNumber(value);

    items.push({
      label: translate(key),
      type,
      value: text,
    });
  });

  if (items.length > 0) items.push({ seperator: true });

  return items;
});

const data = computed(() => {
  const { type, text } = weightNumber(happinessStore.bonusRevenue / 100, 'percent');

  const items: Item[] = [
    {
      label: translate('happiness.base'),
      value: formatNumber(BASE_HAPPINESS, 'compact'),
    },
    ...happinessImpactItems.value,
    {
      label: `<b>${translate(`happiness.labels.${currentHappinessRange.value.value}`)}</b>`,
      value: 0,
    },
    {
      label: translate('happiness.revenueImpact'),
      value: text,
      type,
    },
  ];

  return items;
});
</script>

<style lang="scss" scoped>
  .fb-resources-happiness {
    @apply p-4 rounded-lg text-xl flex items-center h-66px border border-2;

    &-icon {
      @apply mr-2 text-current;
    }

    &-value {
      @apply text-base flex items-center justify-between flex-1;
    }
  }
</style>
