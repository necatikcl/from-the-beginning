<style lang="scss" scoped>
.fb-badge {
  @apply text-sm uppercase py-1 px-2 rounded-full;

  &-success {
    @apply bg-green-100 text-green-800 border-green-400 border;
  }

  &-danger {
    @apply bg-red-100 text-red-800 border-red-400 border;
  }

  &-secondary {
    @apply bg-gray-200 text-gray-600 border-gray-300 border;
  }
}
</style>

<template>
  <span class="fb-badge" :class="`fb-badge-${type}`">
    <slot />
  </span>
</template>

<script setup lang="ts">
export interface Props {
  type?: 'danger' | 'success' | 'secondary'
}

defineProps<Props>();
</script>
