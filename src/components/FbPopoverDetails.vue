<template>
  <div
    class="fb-popover"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <slot />
    <div class="fb-popover-content" v-if="hover">
      <div class="fb-popover-title">{{title}}</div>
      <div class="fb-popover-items">
        <div
          class="fb-popover-item"
          :class="{
            'fb-popover-seperator': item.seperator,
          }"
          v-for="(item, index) in data"
          :key="index">
          <div v-if="!item.seperator && item.label" class="fb-popover-item-label">
            <fb-resource-icon v-if="item.resourceKey" :name="item.resourceKey">
              <span v-html="item.label" />
            </fb-resource-icon>
            <fb-town-hall-image v-if="item.townHall" />
            <span v-if="!item.resourceKey" v-html="item.label" />
          </div>
          <div v-if="item.value" class="fb-popover-item-value" :class="`fb-popover-item-value-${item.type}`">{{ item.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ResourceKey } from '@/stores/resources';
import { ref } from 'vue';
import FbResourceIcon from './FbResourceIcon.vue';
import FbTownHallImage from './FbTownHallImage.vue';

export interface Item {
  seperator?: boolean,
  label?: string,
  value?: number | string,
  type?: 'danger' | 'success' | 'secondary',
  resourceKey?: ResourceKey,
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
    @apply relative;

    &-content {
      @apply
      min-w-48
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
      @apply flex items-center justify-between;

      &-label {
        @apply mr-4 flex items-center;
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
      @apply border-t border-gray-200 my-2;
    }

    &-title {
      @apply font-bold text-xl mb-2;
    }
  }
</style>
