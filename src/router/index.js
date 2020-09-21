import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/Home/Home')
const Discuss = () => import('../views/Disscuss/Discuss')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/discuss',
      name: 'discuss',
      component: Discuss
    }
  ]
})
