import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

let publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

let privateRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

privateRoutes = privateRoutes.map(route => {
  route.beforeEnter = (to, from, next) => {
    if(store.state.loginUser === null) {
      next(false);
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
