<template>
  <fb-popover-details title="Happiness" :data="data">
    <div
      class="fb-resources-happiness"
      :class="`fb-resources-happiness-${currentHappinessRange.value}`"
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
import useHappinessStore, { BASE_HAPPINESS } from '@/stores/happiness';
import weightNumber from '@/utils/weightNumber';
import { translate } from '@/locale';
import type { MessageKey } from '@/locale/messages/en';
import formatNumber from '@/utils/formatNumber';
import FbPopoverDetails from './FbPopoverDetails.vue';
import type { Item } from './FbPopoverDetails.vue';

const happinessStore = useHappinessStore();

const ranges = [
  { value: 100, icon: 'grin-tears' },
  { value: 90, icon: 'laugh-beam' },
  { value: 80, icon: 'smile-beam' },
  { value: 75, icon: 'meh' },
  { value: 50, icon: 'frown' },
  { value: 25, icon: 'flushed' },
  { value: 0, icon: 'angry' },
] as const;

type Range = {
  value: typeof ranges[number]['value'],
  icon: typeof ranges[number]['icon'],
};

const currentHappinessRange = computed(
  () => ranges.find(
    (range) => happinessStore.happiness >= range.value,
  ) as Range,
);

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

    &-100 {
      @apply border-green-600 text-green-600;
    }

    &-90 {
      @apply border-lime-600 text-lime-600;
    }

    &-80 {
      @apply border-cyan-600 text-cyan-600;
    }

    &-75 {
      @apply border-amber-600 text-amber-600;
    }

    &-50 {
      @apply border-orange-600 text-orange-600;
    }

    &-25 {
      @apply border-pink-600 text-pink-600;
    }

    &-0 {
      @apply border-red-600 text-red-600;
    }

    &-icon {
      @apply mr-2 text-current;
    }

    &-value {
      @apply text-base flex items-center justify-between flex-1;
    }
  }
</style>
