<template>
  <div
    class="fb-popover"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <slot />
    <div
      v-show="hover"
      class="fb-popover-content"
    >
      <div class="fb-popover-title">
        {{ title }}
      </div>
      <div class="fb-popover-items">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="fb-popover-item"
          :class="{
            'fb-popover-seperator': item.seperator,
          }"
        >
          <div
            v-if="!item.seperator && item.label"
            class="fb-popover-item-label"
          >
            <fb-symbol
              v-if="item.resourceKey || item.icon"
              :name="item.resourceKey || item.icon"
            >
              <span v-html="item.label" />
            </fb-symbol>
            <fb-town-hall-image v-if="item.townHall" />
            <span
              v-if="!item.resourceKey && !item.icon"
              v-html="item.label"
            />
          </div>
          <div
            v-if="item.value"
            class="fb-popover-item-value"
            :class="`fb-popover-item-value-${item.type}`"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { ResourceKey } from '@/stores/resources';

import { ColoredIconName } from './FbSymbol.vue';

export interface Item {
  seperator?: boolean,
  label?: string,
  value?: number | string,
  type?: 'danger' | 'success' | 'secondary',
  resourceKey?: ResourceKey,
  icon?: ColoredIconName,
  townHall?: boolean
}

export interface Props {
  data: Item[],
  title: string
}

defineProps<Props>();

const hover = ref(false);
</script>

<style lang="scss" scoped>
  .fb-popover {
    @apply relative w-full;

    &-content {
      @apply
      min-w-48 w-full
        pointer-events-none
        absolute
        top-full
        bg-white/50
        backdrop-filter
        backdrop-blur
        p-4
        mt-2
        shadow-lg
        rounded-lg
        z-99;
    }

    &-item {
      @apply flex items-center justify-between text-xs leading-5;

      &-label {
        @apply mr-4 flex items-center;

        :deep(small) {
          @apply block -mt-1 text-gray-600;
        }
      }

      &-value {
        &-danger {
          @apply text-red-600;
        }

        &-success {
          @apply text-green-600;
        }
      }

      img {
        width: 15px;
        margin-right: 7px;
      }
    }

    &-seperator {
      @apply border-t border-gray-200 my-1.5;
    }

    &-title {
      @apply font-bold text-lg mb-2;
    }
  }
</style>
