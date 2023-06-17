<template>
  <div
    class="fb-resource-icon"
    :class="`fb-resource-icon-${data[name].color}`"
  >
    <fb-icon :icon="data[name].icon" />
    <div
      v-if="$slots.default"
      class="fb-resource-icon-text"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
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
} as const;

type Data = typeof data;

export type ColoredIconName = keyof Data;

export interface Props {
  name: ColoredIconName
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
  .fb-resource-icon {
    @apply flex items-center;

    &-text {
      @apply ml-2;
    }

    &-cyan {
      @apply text-cyan-500;
    }

    &-yellow {
      @apply text-yellow-500;
    }

    &-green {
      @apply text-green-500;
    }

    &-purple {
      @apply text-purple-500;
    }

    &-pink {
      @apply text-pink-500;
    }

    &-indigo {
      @apply text-indigo-500;
    }
  }
</style>
