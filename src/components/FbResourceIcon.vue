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
import type { ResourceKey } from '@/stores/resources';

export interface Props {
  name: ResourceKey
}

defineProps<Props>();

type Data = {
  [key in ResourceKey]: { icon: string, color: string }
};

const data: Data = {
  food: {
    icon: 'wheat-awn',
    color: 'cyan',
  },
  gold: {
    icon: 'coins',
    color: 'yellow',
  },
  wood: {
    icon: 'tree',
    color: 'green',
  },
  iron: {
    icon: 'mountain',
    color: 'pink',
  },
  labour: {
    icon: 'screwdriver-wrench',
    color: 'indigo',
  },
};
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
