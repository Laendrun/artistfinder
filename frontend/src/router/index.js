import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import SigninView from '@/views/SigninView.vue'
import ProfileView from '@/views/ProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/signin',
    name: 'signin',
    component: SigninView,
    beforeEnter: (to, from, next) => {
      let isLoggedIn = true;
      if (localStorage.getItem('Authorization') === null) {
        isLoggedIn = false;
      }
      
      if (!isLoggedIn) {
        next();
      } else {
        next({path: '/profile'})
      }
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    beforeEnter: (to, from, next) => {
      let isLoggedIn = true;
      if (localStorage.getItem('Authorization') === null) {
        isLoggedIn = false;
      }
      
      if (isLoggedIn) {
        next();
      } else {
        next({path: '/signin'})
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
