<style lang="scss" scoped>
.fb-resources {
  @apply grid grid-cols-3 h-max gap-2;
}
</style>

<template>
  <div class="fb-resources">
    <fb-resources-happiness />
    <fb-resources-item name="food" />
    <fb-resources-item name="gold" />
    <fb-resources-item name="wood" />
    <fb-resources-item name="iron" />
    <fb-resources-item name="labour" />
  </div>
</template>

<script setup lang="ts">
import FbResourcesItem from './FbResourcesItem.vue';
import FbResourcesHappiness from './FbResourcesHappiness.vue';
</script>
