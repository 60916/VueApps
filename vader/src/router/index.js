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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LocationsViews,
    },
  ],
})

export default router
