import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Help from '../views/Help.vue'
import FlightManager from '../views/FlightManager.vue'
import UserManager from '../views/UserManager.vue'
import UserDetails from '../views/UserDetails.vue'
import TicketManager from '../views/TicketManager.vue'
// import TicketDetails from '../views/TicketDetails.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/help',
    name: 'help',
    component: Help
  },
  {
    path: '/users',
    name: 'users',
    component: UserManager
  },
  {
    path: '/users/:id',
    name: 'user',
    params: 'id',
    component: UserDetails
  },
  {
    path: '/flights/',
    name: 'flights',
    component: FlightManager
  },
  {
    path: '/flights/:id',
    name: 'flight',
    params: 'id',
    component: FlightManager
  },
  {
    path: '/tickets/',
    name: 'tickets',
    component: TicketManager
  },
  {
    path: '/tickets/:id',
    name: 'ticket',
    params: 'id',
    component: TicketManager
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
