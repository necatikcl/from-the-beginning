<template>
  <div class="fb-jobs">
    <div class="fb-jobs-grid">
      <fb-jobs-box
        :subtitle="translate('citizens.idle')"
        :count="citizens.idle"
        fixed
      />
      <fb-jobs-box
        resource-key="food"
        job-key="farmers"
      />
      <fb-jobs-box
        resource-key="gold"
        job-key="merchants"
      />
      <fb-jobs-box
        resource-key="wood"
        job-key="lumberjacks"
      />
      <fb-jobs-box
        resource-key="iron"
        job-key="miners"
      />
      <fb-jobs-box
        resource-key="labour"
        job-key="builders"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useCitizens from '@/stores/citizens';

const citizens = useCitizens();
</script>

<style lang="scss" scoped>
.fb-jobs {
  &-grid {
    @apply grid grid-cols-6 gap-4;
  }
}
</style>
