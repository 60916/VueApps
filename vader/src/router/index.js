import { createRouter, createWebHistory } from 'vue-router'
import ForecastView from '../views/ForecastViews.vue'
import LocationsViews from '@/views/LocationsViews.vue'
//import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ForecastView,
    },
    {
      path: '/locations',
      name: 'Locations',
      component: LocationsViews,
    },
    {
      path: '/forecast/:location',
      name: 'forecast',
      component: ForecastView,
      props: true,
    },
  ],
})

export default router
