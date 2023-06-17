<template>
  <div class="fb-resources">
    <fb-resources-happiness />
    <fb-resources-labour />
    <fb-resources-science />
    <fb-resources-item name="food" />
    <fb-resources-item name="gold" />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.fb-resources {
  @apply grid grid-cols-3 h-max gap-2;
}
</style>
