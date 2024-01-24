import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import store from './store.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'

createApp(App).use(store).use(router).mount('#app') 