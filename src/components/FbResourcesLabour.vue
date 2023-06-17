<template>
  <fb-popover-details
    :title="translate('resources.labour')"
    :data="data"
  >
    <div class="fb-resources-labour">
      <div class="fb-resources-labour-icon">
        <fb-symbol name="labour" />
      </div>
      <div class="fb-resources-labour-value">
        {{ formattedValue }}
      </div>
    </div>
  </fb-popover-details>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { MessageKey, translate } from '@/locale';
import useBuildingsStore from '@/stores/buildings';
import useLabourStore from '@/stores/labour';
import { getObjectEntries } from '@/utils/getObjectEntries';
import weightNumber from '@/utils/weightNumber';

import type { Item } from './FbPopoverDetails.vue';

const labour = useLabourStore();
const buildingsStore = useBuildingsStore();

const formattedValue = computed(() => {
  if (labour.value === 0) return '0';

  return `+${formatNumber(labour.value, 'compact')}`;
});

const remainingBuildingSeconds = computed(() => {
  if (!buildingsStore.activeLabour) return '';

  const labourRemaining = buildingsStore.getBuildingLabourRemaining(buildingsStore.activeLabour);
  const remainingTicks = labourRemaining / labour.value;

  if (labour.value === 0) return translate('labour.emptyShort');

  return formatMs(remainingTicks * 1000);
});

const data = computed(() => {
  const items: Item[] = [];

  getObjectEntries(labour.revenues).forEach(([_key, value]) => {
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

  if (items.length === 0) {
    items.push({
      label: translate('labour.empty'),
      type: 'secondary',
    });
  }

  if (buildingsStore.activeLabour) {
    items.push(
      { seperator: true },
      {
        label: `
          <small><b>${translate('building')}:</b> ${translate(`buildings.${buildingsStore.activeLabour}`)}<br>${remainingBuildingSeconds.value}</small>
          `,
        type: 'secondary',
        // value: '18:32',
      },
    );
  }

  return items;
});
</script>

<style lang="scss" scoped>
  .fb-resources-labour {
    @apply p-4 rounded-lg bg-gray-100 text-xl flex items-center h-66px;

    &-icon {
      @apply mr-2;
    }

    &-value {
      @apply text-base flex items-center justify-between flex-1;
    }
  }
</style>
