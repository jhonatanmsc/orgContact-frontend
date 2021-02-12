import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Politics from '../views/Politics.vue'
import Terms from '../views/Terms.vue'

Vue.use(VueRouter)

let publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/politicas',
    name: 'Politicas de privacidade',
    component: Politics
  },
  {
    path: '/termos',
    name: 'Termos de uso',
    component: Terms
  }
]

let privateRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/graficos',
    name: 'Gráficos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

privateRoutes = privateRoutes.map(route => {
  route.beforeEnter = (to, from, next) => {
    if(localStorage.getItem('idToken') === null) {
      next({
        name: 'Login'
      });
    } else {
      next();
    }
  }
  return route;
})

const routes = publicRoutes.concat(privateRoutes);

const router = new VueRouter({
  routes
})

export default router
