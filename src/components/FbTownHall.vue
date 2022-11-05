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
        <fb-icon icon="user-group" />{{citizens.count}}
        - {{ citizenRecruitmentLabel }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

import useCitizens from '@/stores/citizens';
import { translate } from '@/locale';
import useTownHall from '@/stores/townHall';
import formatNumber from '@/utils/formatNumber';
import FbButton from './FbButton.vue';
import FbTownHallImage from './FbTownHallImage.vue';

const townHall = useTownHall();
const citizens = useCitizens();

const nextCitizenSeconds = ref(0);

let citizenInterval = 0;
watch(() => [citizens.count, townHall.citizenIntervalTime, townHall.citizensCanBeRecruited], () => {
  clearInterval(citizenInterval);

  if (!townHall.citizensCanBeRecruited) {
    nextCitizenSeconds.value = -1;
    return;
  }

  nextCitizenSeconds.value = townHall.citizenIntervalTime / 1000;

  citizenInterval = setInterval(() => {
    nextCitizenSeconds.value -= 1;
  }, 1000);
}, { immediate: true });

const citizenRecruitmentLabel = computed(() => {
  if (townHall.citizensCanBeRecruited) {
    return translate('buildings.townHall.recruiting', formatNumber(nextCitizenSeconds.value, 'compactInteger'));
  }

  return 'Max population in this level';
});
</script>
