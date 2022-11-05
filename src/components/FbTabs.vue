<template>
  <div class="fb-tabs">
    <div class="fb-tabs-buttons">
      <button
        type="button"
        class="fb-tabs-button"
        :class="{
          'fb-tabs-button-active': activeTab === item.key,
        }"
        v-for="item in items"
        :key="item.key"
        @click="activeTab = item.key"
      >
        {{ translate(`tabs.${item.key}`) }}
      </button>
    </div>
    <div class="fb-tabs-content">
      <div class="fb-tabs-content-title" v-if="activeTabComponent">
        {{ translate(`tabs.${activeTab}`) }}
      </div>
      <keep-alive>
        <component :is="activeTabComponent" />
      </keep-alive>
      <div class="fb-tabs-empty" v-if="!activeTabComponent">
        <div class="fb-tabs-empty-icon">
          <fb-icon icon="charging-station" />
        </div>
        <div class="fb-tabs-empty-title">Coming soon</div>
        <div class="fb-tabs-empty-description">Sorry, but I am still working on this :C</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Component } from 'vue';

import { translate } from '@/locale';

export interface Item {
  key: 'jobs' | 'buildings' | 'laws' | 'science' | 'religion';
  component?: Component;
}

export interface Props {
  items: Item[]
}

const props = defineProps<Props>();

const activeTab = ref(props.items[0].key);

const activeTabComponent = computed(
  () => props.items.find((item) => item.key === activeTab.value)?.component,
);
</script>

<style scoped lang="scss">
.fb-tabs-button {
  @apply
  uppercase
  font-bold
  text-sm
  text-gray-500
  mb-3
  py-3
  px-5
  bg-gray-100
  hover:bg-gray-200
  mr-2
  rounded-lg;

  &-active {
    @apply
    pointer-events-none
    bg-orange-100
    text-orange-600;
  }
}

.fb-tabs-buttons {
  @apply flex items-center py-4;
}

.fb-tabs-content-title {
  @apply text-3xl mb-4;
}

.fb-tabs-empty {
  @apply w-full p-16 flex items-center justify-center flex-col border border-gray-300 rounded-md text-gray-600;

  &-title {
    @apply text-4xl font-bold mb-2 text-gray-400;
  }

  &-description {
    @apply text-gray-300;
  }

  &-icon {
    @apply text-7xl mb-4;
  }
}
</style>
