import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/global.css'

import App from './App.vue'
import Welcome from './views/Welcome.vue'
import Dashboard from './views/Dashboard.vue'
import Assessment from './views/Assessment.vue'
import Results from './views/Results.vue'

const routes = [
  { path: '/', name: 'welcome', component: Welcome },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
  { path: '/assessment/:section', name: 'assessment', component: Assessment, props: true },
  { path: '/results', name: 'results', component: Results }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const pinia = createPinia()
const app = createApp(App)

// Register Element Plus icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')