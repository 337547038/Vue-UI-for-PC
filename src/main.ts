import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import 'vite-plugin-vuedoc/style.css'
import packages from './packages/index'
import './assets/scss/app.scss'
// const app = createApp(App)

// app.use(router).mount('#app')
createApp(App).use(router).use(packages).mount('#app')

