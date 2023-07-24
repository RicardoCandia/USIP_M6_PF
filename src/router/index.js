import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InicioView from '../views/InicioView.vue'
import EmpresaView from '../views/EmpresaView.vue'
import ConductorView from '../views/ConductorView.vue'
import VehiculoView from '../views/VehiculoView.vue'
import ContratoView from '../views/ContratoView.vue'
import SolicitudView from '../views/SolicitudView.vue'
import SeguimientoView from '../views/SeguimientoView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'inicio',
    component: InicioView
  },
  {
    path: '/empresa',
    name: 'empresa',
    component: EmpresaView
  },
  {
    path: '/conductor',
    name: 'conductor',
    component: ConductorView
  },
  {
    path: '/vehiculo',
    name: 'vehiculo',
    component: VehiculoView
  },
  {
    path: '/contrato',
    name: 'contrato',
    component: ContratoView
  },
  {
    path: '/solicitud',
    name: 'solicitud',
    component: SolicitudView
  },
  {
    path: '/seguimiento',
    name: 'seguimiento',
    component: SeguimientoView
  },
  {
    path: '/seguimiento/:id',
    name: 'seguimiento',
    component: SeguimientoView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
