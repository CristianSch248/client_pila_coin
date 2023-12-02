import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard.vue';
import MineraPila from '../views/MineraPila.vue';
import Logs from '../views/Logs.vue';
import Carteira from '../views/Carteira.vue';
import Transferir from '../views/TransferirPila.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  // {
  //   path: '/minera/pila',
  //   name: 'MineraPila',
  //   component: MineraPila
  // },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs
  },
  {
    path: '/carteira',
    name: 'Carteira',
    component: Carteira
  },
  {
    path: '/trasferir',
    name: 'Transferir',
    component: Transferir
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router