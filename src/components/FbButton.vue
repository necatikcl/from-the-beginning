<template>
  <button
    type="button"
    class="fb-button"
    :class="[
      `fb-button-${type}`,
      `fb-button-${size}`,
      {
        'fb-button-disabled': disabled,
        'fb-button-equal-padding': equalPadding,
      },
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
export interface Props {
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  disabled?: boolean,
  equalPadding?: boolean,
  size?: 'sm' | 'base'
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
  .fb-button {
    @apply
    text-base py-1 px-3 rounded-full
    transition-colors
    flex items-center justify-center
    active:ring-width-3
    select-none;

    &-sm {
      @apply text-sm py-0.5 px-2 h-6 min-w-6;
    }

    &-equal-padding {
      @apply px-1;
    }

    &-warning {
      @apply
      bg-orange-400
      hover:bg-orange-500
      ring-orange-300
      text-white;
    }

    &-success {
      @apply
      bg-green-400
      hover:bg-green-500
      ring-green-300
      text-white;
    }

    &-danger {
      @apply
      bg-red-400
      hover:bg-red-500
      ring-red-300
      text-white;
    }

    &-secondary {
      @apply
      bg-gray-200
      hover:bg-gray-300
      ring-gray-300
      text-gray-600;
    }

    &-disabled {
      @apply pointer-events-none bg-gray-300 text-gray-400;
    }

    :deep(.fb-icon) {
      font-size: .8em;
    }

  }
</style>
