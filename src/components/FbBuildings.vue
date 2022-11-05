<style lang="scss" scoped>
  .fb-buildings {
    @apply mt-8;

    &-title {
      @apply uppercase font-bold text-sm text-gray-500 mb-3;
    }

    &-grid {
      @apply grid grid-cols-6 gap-4 mb-4;
    }
  }
  </style>

<template>
  <div class="fb-buildings">
    <template v-if="buildings.availableBuildings.length > 0">
      <div class="fb-buildings-title">Buildings</div>
      <div class="fb-buildings-grid">
        <fb-buildings-box
          v-for="building in buildings.availableBuildings"
          :key="building.key"
          :building="building"
        />
      </div>
    </template>
    <template v-if="buildings.owned.length > 0">
      <div class="fb-buildings-title">Buildings owned</div>
      <div class="fb-buildings-grid">
        <fb-buildings-box
          v-for="building in buildings.buildingsOwned"
          :key="building.key"
          :building="building"
          owned
        />
      </div></template>
  </div>
</template>

<script setup lang="ts">
import useBuildings from '@/stores/buildings/base';
import FbBuildingsBox from './FbBuildingsBox.vue';

const buildings = useBuildings();
</script>
