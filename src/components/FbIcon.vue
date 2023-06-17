<template>
  <font-awesome-icon
    :icon="icon"
    class="fb-icon"
  />
</template>

<script setup lang="ts">
export interface Props {
  icon: string
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
  .fb-icon {
    font-size: 1em;
  }
</style>
