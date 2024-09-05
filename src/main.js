import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/style/main.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // استفاده از bootstrap.bundle.min.js

import 'bootstrap-icons/font/bootstrap-icons.css';

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

createApp(App)
  .use(ToastPlugin)
  .use(store)
  .use(router)
  .mount('#app');
