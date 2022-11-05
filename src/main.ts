import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faTractor,
  faBed,
  faLandmark,
  faPlus,
  faMinus,
  faUserGroup,
  faAppleAlt,
  faCoins,
  faTree,
  faMountain,
  faWheatAwn,
  faCubes,
  faMountainSun,
  faVolcano,
  faBoxesStacked,
  faLock,
  faStoreSlash,
  faScrewdriverWrench,
  faPause,
  faSmileBeam,
  faGrinTears,
  faLaughBeam,
  faMeh,
  faFrown,
  faFlushed,
  faAngry,
  faHandFist,
  faCheckCircle,
  faLeaf,
  faCity,
  faChargingStation,
} from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import FbIcon from './components/FbIcon.vue';
import router from './router';

import 'virtual:windi.css';

import './assets/main.css';

library.add(
  faTractor,
  faBed,
  faLandmark,
  faPlus,
  faMinus,
  faUserGroup,
  faAppleAlt,
  faCoins,
  faTree,
  faMountain,
  faWheatAwn,
  faCubes,
  faMountainSun,
  faVolcano,
  faBoxesStacked,
  faLock,
  faStoreSlash,
  faScrewdriverWrench,
  faPause,
  faGrinTears,
  faLaughBeam,
  faSmileBeam,
  faMeh,
  faFrown,
  faFlushed,
  faAngry,
  faLock,
  faHandFist,
  faCheckCircle,
  faLeaf,
  faCity,
  faChargingStation,
);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('fb-icon', FbIcon);

app.use(createPinia());
app.use(router);

app.mount('#app');
