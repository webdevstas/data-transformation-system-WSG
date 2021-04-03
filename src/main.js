import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'
import gsap from './plugins/gsap'

createApp(App)
  .use(store)
  .use(router)
  .use(axios)
  .use(gsap)
  .mount('#app')
