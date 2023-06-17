import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import FbIcon from './components/FbIcon.vue';
import router from './router';

import 'virtual:windi.css';

import './assets/styles/main.scss';

library.add(fas);

const app = createApp(App);

// @ts-ignore
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.component('FbIcon', FbIcon);

app.use(createPinia());
app.use(router);

app.mount('#app');
