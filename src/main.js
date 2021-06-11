import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'vite-plugin-vuedoc/style.css';
import packages from './components/packages/index';
import './assets/scss/app.scss';
createApp(App).use(router).use(packages).mount('#app');
//# sourceMappingURL=main.js.map