

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Pedidos from '../views/Pedidos'
import Galeria from '../views/Galeria'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Pedidos',
    name: 'Pedidos',
    component: Pedidos
  },
  
  {
    path: '/Galeria',
    name: 'Galeria',
    component: Galeria
  },
  
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
