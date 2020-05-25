import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CountryArea from '../views/CountryArea.vue';
import InsertAirPollution from '../views/InsertAirPollution.vue'
import HistoryPM25byCountry from '../views/HistoryPM25byCountry.vue'
import TotalPopulation from '../views/TotalPopulation.vue';
import AllPointAllCountry from '../views/AllPointAllCountry.vue';
import ClosestBangkok from '../views/ClosestBangkok.vue';
import NeighborThailand from '../views/NeighborThailand.vue';
import MBRThailand from '../views/MBRThailand.vue';
import HighestNo from '../views/HighestNo.vue';
import LowIncome from '../views/LowIncome.vue';
import CityPM25than50 from '../views/CityPM25than50.vue';
import AvgPM25ByCountry from '../views/AvgPM25ByCountry.vue';

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
  },
  {
    path: '/total_population',
    name: 'TotalPopulation',
    component: TotalPopulation
  },
  {
    path: '/all_point_all_country',
    name: 'AllPointAllCountry',
    component: AllPointAllCountry
  },
  {
    path: '/closest_bangkok',
    name: 'ClosestBangkok',
    component: ClosestBangkok
  },
  {
    path: '/neighbor_thailand',
    name: 'NeighborThailand',
    component: NeighborThailand
  },
  {
    path: '/mbr_thailand',
    name: 'MBRThailand',
    component: MBRThailand
  },
  {
    path: '/highest_city',
    name: 'HighestNo',
    component: HighestNo
  },
  {
    path: '/low_income',
    name: 'LowIncome',
    component: LowIncome
  },
  {
    path: '/city_pm25_2015',
    name: 'CityPM25than50',
    component: CityPM25than50
  },
  {
    path: '/avg_pm25_country',
    name: 'AvgPM25ByCountry',
    component: AvgPM25ByCountry
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
