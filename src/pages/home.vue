<template>
  <div class="grid grid-cols-2 gap-4">
    <fb-town-hall />
    <fb-resources />
  </div>
  <fb-tabs :items="items" />
  <!-- <fb-jobs />
  <fb-buildings /> -->
  <br>
  <br>
  <br>
  <br>
  <br>
  locale: {{locale}}
  <br>
  <br>
  citizens:
  {{ citizens }}
  <br>
  <br>
  resources:
  {{resources}}
  <br>
  <br>
  buildings:
  {{buildings}}
  <br>
  <br>
  happiness:
  {{happiness}}
  <br>
  <br>
  townHall:
  {{townHall}}
  <br>
  <br>

  {{ count * 2 }}
</template>

<script setup lang="ts">
import useCitizens from '@/stores/citizens';
import useResources from '@/stores/resources';

import FbTownHall from '@/components/FbTownHall.vue';
import FbJobs from '@/components/FbJobs.vue';
import FbResources from '@/components/FbResources.vue';
import FbBuildings from '@/components/FbBuildings.vue';
import FbLaws from '@/components/FbLaws.vue';
import FbTabs, { type Item } from '@/components/FbTabs.vue';
import { locale } from '@/locale';
import { ref } from 'vue';
import useBuildings from '@/stores/buildings';
import useHappinessStore from '@/stores/happiness';
import useTownHall from '@/stores/townHall';

const citizens = useCitizens();
const resources = useResources();
const buildings = useBuildings();
const happiness = useHappinessStore();
const townHall = useTownHall();

const count = ref(2);

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
