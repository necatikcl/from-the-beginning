<template>
  <div class="fb-laws">
    <div class="fb-laws-grid">
      <fb-laws-item
        v-for="law in laws.items"
        :key="law.key"
        :law-key="law.key"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useLaws from '@/stores/laws';

const laws = useLaws();
</script>

<style lang="scss" scoped>
.fb-laws {
  &-grid {
    @apply grid grid-cols-4 gap-4;
  }
}
</style>
