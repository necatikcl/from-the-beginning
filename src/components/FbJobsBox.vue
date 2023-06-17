<template>
  <div class="fb-jobs-box">
    <div class="fb-jobs-box-icon">
      <fb-symbol
        v-if="resourceKey"
        :name="resourceKey"
      />
      <fb-icon
        v-else
        icon="bed"
      />
    </div>
    <div class="fb-jobs-box-subtitle">
      {{ computedSubtitle }}
    </div>

    <div class="fb-jobs-box-footer">
      <fb-button
        v-if="jobKey"
        :disabled="computedCount === 0"
        equal-padding
        type="secondary"
        size="sm"
        class="mr-1"
        @click="() => handleDecrement(5)"
      >
        <fb-icon icon="minus" />5
      </fb-button>
      <fb-button
        v-if="jobKey"
        :disabled="computedCount === 0"
        equal-padding
        type="danger"
        size="sm"
        @click="() => handleDecrement(1)"
      >
        <fb-icon icon="minus" />
      </fb-button>
      <div class="fb-jobs-box-count">
        {{ computedCount }}
      </div>
      <fb-button
        v-if="jobKey"
        :disabled="disabled"
        equal-padding
        type="success"
        size="sm"
        class="mr-1"
        @click="() => handleIncrement(1)"
      >
        <fb-icon icon="plus" />
      </fb-button>
      <fb-button
        v-if="jobKey"
        :disabled="disabled"
        equal-padding
        type="secondary"
        size="sm"
        @click="() => handleIncrement(5)"
      >
        <fb-icon icon="plus" />5
      </fb-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { translate } from '@/locale';
import type { Job } from '@/stores/citizens';
import useCitizens from '@/stores/citizens';
import type { ResourceKey } from '@/stores/resources';

export interface Props {
  subtitle?: string,
  count?: number,
  resourceKey?: ResourceKey,
  jobKey?: Job,
}

const props = defineProps<Props>();

const citizens = useCitizens();

const computedSubtitle = computed(() => {
  if (props.subtitle) return props.subtitle;

  if (props.jobKey) return translate(`citizens.${props.jobKey}`);

  return '';
});

const computedCount = computed(() => {
  if (props.jobKey) return citizens.jobs[props.jobKey];

  return props.count;
});

const disabled = computed(() => {
  if (props.jobKey) return citizens.idle === 0;

  return false;
});

const handleIncrement = (by = 1) => {
  if (!props.jobKey) return;

  citizens.incrementJob(props.jobKey, by);
};

const handleDecrement = (by = 1) => {
  if (!props.jobKey) return;

  citizens.incrementJob(props.jobKey, -by);
};
</script>

<style lang="scss" scoped>
  .fb-jobs-box {
    @apply p-4 rounded-lg border border-gray-200 flex flex-col items-center select-none;

    &-icon {
      @apply text-4xl mb-3 text-gray-400;
    }

    &-subtitle {
      @apply text-gray-400;
    }

    &-count {
      @apply text-2xl font-bold mx-2 w-8 text-center;
    }

    &-footer {
      @apply flex items-center;
    }

    &:not(:hover) {
      .fb-button:first-child, .fb-button:last-child {
        opacity: 0;
      }
    }
  }
</style>
