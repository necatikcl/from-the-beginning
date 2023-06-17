<template>
  <button
    type="button"
    class="fb-laws-item"
    :class="[
      {
        'fb-laws-item-active': law.active,
      },
      `fb-laws-item-${colors[law.key]}`,
    ]"
    @click="law.toggle"
  >
    <div class="fb-laws-item-badge">
      <fb-icon icon="check-circle" />
    </div>
    <div class="fb-laws-item-title">
      <div class="fb-laws-item-icon">
        <fb-icon :icon="icons[lawKey]" />
      </div>
      {{ translate(`laws.${lawKey}`) }}
    </div>
    <ul class="fb-laws-item-features">
      <li
        v-for="feature in features"
        :key="feature"
        class="fb-laws-item-feature"
      >
        {{ feature }}
      </li>
    </ul>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { translate } from '@/locale';
import useLaws from '@/stores/laws';
import type { Law, LawKey } from '@/stores/laws/types';

export interface Props {
  lawKey: LawKey
}

const props = defineProps<Props>();

const lawsStore = useLaws();

const icons: { [K in LawKey]: string } = {
  diligence: 'hand-fist',
  land: 'leaf',
  urbanization: 'city',
  happiness: 'smile-beam',
};

const colors: { [K in LawKey]: string } = {
  diligence: 'orange',
  land: 'green',
  urbanization: 'blue',
  happiness: 'lime',
};

const law = computed(() => lawsStore.items.find((l) => l.key === props.lawKey) as Law);

const features = computed(() => translate(`laws.${props.lawKey}.features`));
</script>

<style lang="scss" scoped>
.fb-laws-item {
  @apply
  bg-white
  rounded-lg
  border
  border-gray-200
  text-left
  flex flex-col
  hover:border-gray-300
  hover:bg-gray-50;

  &-title {
    @apply text-xl flex items-center p-4 border-b border-gray-200 w-full;
  }

  &-icon {
    @apply text-2xl mr-3;
  }

  &-active {
    .fb-laws-item {
      &-badge {
        @apply scale-100;
      }
    }
  }

  &-badge {
    @apply absolute top-1 right-2 transform scale-0 transition-transform;
  }

  &-features {
    @apply rounded-sm p-4;
  }

  &-feature {
    @apply text-xs;

    &:not(:last-child) {
      @apply mb-1;
    }
  }

  &-feature:before {
    content: '⋅ '
  }

  &-orange {
    .fb-laws-item {
      &-icon, &-badge {
        @apply text-orange-500;
      }
    }

    &.fb-laws-item-active {
      @apply border-orange-500 hover:border-orange-600;
    }
  }

  &-green {
    .fb-laws-item {
      &-icon, &-badge {
        @apply text-green-500;
      }
    }

    &.fb-laws-item-active {
      @apply border-green-500 hover:border-green-600;
    }
  }

  &-blue {
    .fb-laws-item {
      &-icon, &-badge {
        @apply text-blue-500;
      }
    }

    &.fb-laws-item-active {
      @apply border-blue-500 hover:border-blue-600;
    }
  }

  &-lime {
    .fb-laws-item {
      &-icon, &-badge {
        @apply text-lime-400;
      }
    }

    &.fb-laws-item-active {
      @apply border-lime-400 hover:border-lime-600;
    }
  }
}
</style>
