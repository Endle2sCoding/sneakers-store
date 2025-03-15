import { createApp } from 'vue'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import Home from './pages/Home.vue';
import { createRouter } from 'vue-router';

import Favorites from './pages/Favorites.vue';
import { createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name:'Home', component: Home },
  { path: '/favorites',name:"Favorites", component: Favorites },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app=createApp(App);
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
