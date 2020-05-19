import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CountryArea from '../views/CountryArea.vue';
import InsertAirPollution from '../views/InsertAirPollution.vue'
import HistoryPM25byCountry from '../views/HistoryPM25byCountry.vue'

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
  },
  {
    path: '/history_pm25_country',
    name: 'HistoryPM25byCountry',
    component: HistoryPM25byCountry
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
