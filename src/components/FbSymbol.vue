<template>
  <div
    class="fb-symbol"
    :class="{
      [`fb-symbol-${data[name].color}`]: name !== 'happiness',
      [`happiness-${currentHappinessRange.value}`]: name === 'happiness',
    }"
  >
    <fb-icon :icon="icon" />
    <div
      v-if="$slots.default"
      class="fb-symbol-text"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHappinessRange } from '@/stores/happiness/composables';

const data = {
  food: {
    icon: 'wheat-awn',
    color: 'cyan',
  },
  gold: {
    icon: 'coins',
    color: 'yellow',
  },
  labour: {
    icon: 'screwdriver-wrench',
    color: 'indigo',
  },
  happiness: {
    icon: '',
    color: 'green',
  },
  science: {
    icon: 'flask',
    color: 'blue',
  },
} as const;

type Data = typeof data;

export type ColoredIconName = keyof Data;

export interface Props {
  name: ColoredIconName
}

const props = defineProps<Props>();

const currentHappinessRange = useHappinessRange();

const icon = computed(() => {
  if (props.name === 'happiness') {
    return currentHappinessRange.value.icon;
  }

  return data[props.name].icon;
});
</script>

<style lang="scss" scoped>
  .fb-symbol {
    @apply flex items-center;

    &-text {
      @apply ml-1;
    }

    &-cyan {
      @apply text-cyan-500;
    }

    &-yellow {
      @apply text-yellow-500;
    }

    &-indigo {
      @apply text-indigo-500;
    }

    &-blue {
      @apply text-blue-500;
    }
  }
</style>
