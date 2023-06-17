<template>
  <button
    type="button"
    class="fb-buildings-box"
    :class="{
      'fb-buildings-box-owned': owned,
      'fb-buildings-box-buildable': buildable,
    }"
    :disabled="!onProgress && !affordable"
    @click="handleClick"
  >
    <div class="fb-buildings-box-title">
      {{ title }}
    </div>
    <div class="fb-buildings-box-description">
      <fb-resource-icon
        v-for="value, key in building.revenue"
        :key="key"
        :name="key"
      >
        {{ formatRevenue(value) }}
      </fb-resource-icon>
    </div>

    <div
      v-if="!buildable"
      class="fb-buildings-box-lock"
    >
      <fb-icon icon="lock" />
    </div>

    <div
      v-else-if="!owned && !affordable && !onProgress"
      class="fb-buildings-box-lock"
    >
      <fb-icon icon="store-slash" />
    </div>

    <div
      v-if="onProgress"
      class="fb-buildings-box-progress"
    >
      <div class="fb-buildings-box-progress-remaining">
        <fb-icon :icon="!paused ? 'screwdriver-wrench' : 'pause'" /> <br>
        {{ processRemaining }}
      </div>
      <div
        class="fb-buildings-box-progress-bar"
        :style="{
          height: `${processProgress}%`,
        }"
      />
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { Building } from '@/config/buildings';
import useBuildings from '@/stores/buildings';
import useResources from '@/stores/resources';
import formatMs from '@/utils/formatMs';

export interface Props {
  building: Building,
  owned?: boolean,
  title?: string
}

const props = defineProps<Props>();
const buildings = useBuildings();
const resources = useResources();

const buildable = computed(() => buildings.canBuild(props.building.key));
const affordable = computed(() => buildings.canAfford(props.building.key));
const paused = computed(() => buildings.isPaused(props.building.key));
const onProgress = computed(() => buildings.hasProgress(props.building.key));

const labourRequirement = computed(
  () => buildings.getBuildingLabourRequirement(props.building.key) as number,
);

const labourRemaining = computed(
  () => buildings.getBuildingLabourRemaining(props.building.key) as number,
);

const processProgress = computed(
  () => (1 - (labourRemaining.value / labourRequirement.value)) * 100,
);

const processRemainingTime = computed(() => {
  const remainingTicks = labourRemaining.value / resources.labour.revenuePerSecond;

  return formatMs(remainingTicks * 1000);
});

const processRemaining = computed(() => {
  if (paused.value) return 'Paused';
  if (resources.labour.revenuePerSecond === 0) return 'No labour';

  return processRemainingTime.value;
});

const handleClick = () => {
  if (buildings.activeLabour === props.building.key) {
    buildings.cancelBuilding(props.building.key);
  } else {
    buildings.startBuilding(props.building.key);
  }
};

const formatRevenue = (value?: number) => {
  if (!value) return value;
  if (value <= 0) return value;

  return `+${value}`;
};
</script>

<style lang="scss" scoped>
  .fb-buildings-box {
    @apply w-full relative p-4 rounded-lg border border-gray-200 not-disabled:hover:bg-gray-100 transition-colors flex flex-col;

    &:not(&-buildable) {
      @apply filter grayscale pointer-events-none;
    }

    &-title {
      @apply text-lg;
    }

    &-lock {
      @apply absolute bottom-2 right-2 bg-gray-300 text-gray-700 w-6 h-6 rounded-full;
    }

    &-owned {
      @apply pointer-events-none;
    }

    &-description {
      @apply flex flex-wrap;

      & > * {
        @apply mr-2;

        &:not(:last-child)::after {
          content: ',';
          color: black;
        }
      }

    }

    &-progress {
      @apply absolute top-2 right-2 w-1 rounded-3xl bg-gray-300;
      height: calc(100% - 1rem);

      &-bar {
        @apply absolute bottom-0 right-0 w-full rounded-3xl bg-gray-500;
      }

      &-remaining {
        @apply absolute bottom-0 right-3 text-xs text-gray-500 text-right;
      }
    }
  }
</style>
