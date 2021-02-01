import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/main';
import FlightsListing from '../views/flights-listing';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
  }, {
    path: '/flights',
    name: 'flights-listing',
    component: FlightsListing,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
