<template>
  <fb-popover-details
    v-if="!owned && !hasProgress"
    :data="data"
    :title="title"
  >
    <fb-buildings-box-inner
      :building="building"
      :owned="owned"
      :title="title"
    />
  </fb-popover-details>
  <fb-buildings-box-inner
    v-else
    :building="building"
    :owned="owned"
    :title="title"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { Building } from '@/config/buildings';
import { translate } from '@/locale';
import useBuildings from '@/stores/buildings';
import useResources from '@/stores/resources';
import useTownHall from '@/stores/townHall';

import { type Item } from './FbPopoverDetails.vue';

export interface Props {
  building: Building,
  owned?: boolean
}

const props = defineProps<Props>();
const resources = useResources();
const buildings = useBuildings();
const townHall = useTownHall();

const hasProgress = computed(() => buildings.hasProgress(props.building.key));

const resourceRequirements = computed(
  () => buildings.getBuildingResourceRequirements(props.building.key),
);

const data = computed<Item[]>(() => {
  const levelRequirement = props.building.requirements.level;

  return [
    ...resourceRequirements.value.map<Item>(([key, value]) => ({
      resourceKey: key,
      label: translate(`resources.${key}`),
      value,
      type: resources[key].value < value ? 'danger' : 'success',
    })),
    {
      seperator: true,
    },
    {
      resourceKey: 'labour',
      label: translate('resources.labour'),
      value: props.building.requirements.resources.labour,
    },
    {
      seperator: true,
    },
    {
      townHall: true,
      label: translate('level'),
      value: levelRequirement,
      type: townHall.level < levelRequirement ? 'danger' : 'success',
    },
  ];
});

const title = computed(() => translate(`buildings.${props.building.key}`));
</script>
