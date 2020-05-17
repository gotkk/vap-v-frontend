import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CountryArea from '../views/CountryArea.vue';
import InsertAirPollution from '../views/InsertAirPollution.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/country_area',
    name: 'CountryArea',
    component: CountryArea
  },
  {
    path: '/insert_airpollution',
    name: 'InsertAirPollution',
    component: InsertAirPollution
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
