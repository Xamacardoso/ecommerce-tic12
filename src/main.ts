import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'primeicons/primeicons.css';

import App from './App.vue'
import router from './router'
import setPrimeVue from './modules/primevue.module'

const app = createApp(App);

app.use(createPinia());
app.use(router);

// modulo separado para as configs do primevue
setPrimeVue(app);

app.mount('#app');
