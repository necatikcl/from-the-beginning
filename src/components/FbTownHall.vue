<template>
  <div class="fb-town-hall">
    <fb-town-hall-image />
    <div class="fb-town-hall-content">
      <div class="fb-town-hall-level">
        {{ translate("buildings.townHall.level", townHall.level) }}
        <fb-button
          type="warning"
          :disabled="!townHall.upgradeable"
          @click="townHall.upgrade"
        >
          {{ translate("upgrade") }}
        </fb-button>
      </div>
      <div class="fb-town-hall-citizen">
        <fb-icon icon="user-group" />{{ citizens.count }}
        - {{ citizenRecruitmentLabel }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { translate } from '@/locale';
import useCitizens from '@/stores/citizens';
import useTownHall from '@/stores/townHall';
import formatNumber from '@/utils/formatNumber';

const townHall = useTownHall();
const citizens = useCitizens();

const nextCitizenSeconds = computed(
  () => (townHall.citizenIntervalTime - townHall.passedIntervalMs) / 1000,
);

const citizenRecruitmentLabel = computed(() => {
  if (townHall.citizensCanBeRecruited) {
    return translate('buildings.townHall.recruiting', formatNumber(nextCitizenSeconds.value, 'compact'));
  }

  return 'Max population in this level';
});
</script>

<style lang="scss" scoped>
  .fb-town-hall {
    @apply flex items-center bg-gray-100 p-8 rounded-lg;

    img {
      @apply w-18 mr-8;
    }

    &-level {
      @apply text-3xl flex items-center;

      .fb-button {
        @apply ml-4;
      }
    }

    &-citizen {
      @apply text-base flex items-center;

      &-label {
        @apply text-gray-500 ml-2 mr-1;
      }

      .fb-icon {
        @apply mr-1 text-gray-400;
      }
    }
  }
</style>
