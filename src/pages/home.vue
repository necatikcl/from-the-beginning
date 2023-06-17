<template>
  <div class="grid grid-cols-2 gap-4">
    <fb-town-hall />
    <fb-resources />
  </div>
  <fb-tabs :items="items" />
  <template v-if="isDev">
    <button
      class="fixed bottom-4 left-4"
      @click="clearStorage"
    >
      Reset
    </button>
    <br>
    <br>
    <br>
    <br>
    <br>
    locale: {{ locale }}
    <br>
    <br>
    citizens:
    {{ citizens }}
    <br>
    <br>
    resources:
    {{ resources }}
    <br>
    <br>
    buildings:
    {{ buildings }}
    <br>
    <br>
    happiness:
    {{ happiness }}
    <br>
    <br>
    townHall:
    {{ townHall }}
    <br>
    <br>
  </template>
</template>

<script setup lang="ts">

import FbBuildings from '@/components/FbBuildings.vue';
import FbJobs from '@/components/FbJobs.vue';
import FbLaws from '@/components/FbLaws.vue';
import { type Item } from '@/components/FbTabs.vue';
import { locale } from '@/locale';
import useBuildings from '@/stores/buildings';
import useCitizens from '@/stores/citizens';
import useHappinessStore from '@/stores/happiness';
import useResources from '@/stores/resources';
import useTownHall from '@/stores/townHall';

const isDev = import.meta.env.DEV;

const citizens = useCitizens();
const resources = useResources();
const buildings = useBuildings();
const happiness = useHappinessStore();
const townHall = useTownHall();

const items: Item[] = [
  {
    key: 'jobs',
    component: FbJobs,
  },
  {
    key: 'buildings',
    component: FbBuildings,
  },
  {
    key: 'laws',
    component: FbLaws,
  },
  {
    key: 'science',
  },
  {
    key: 'religion',
  },
];

const clearStorage = () => {
  localStorage.clear();
  window.location.reload();
};

// @ts-ignore
window.admin = {
  resources,
  citizens,
  locale,
  passTime: () => {
    for (let i = 0; i < 20; i += 1) {
      resources.tick();
    }
  },
};
</script>
