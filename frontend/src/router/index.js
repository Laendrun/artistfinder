import { createRouter, createWebHistory } from 'vue-router'
import ArtistsListView from '@/views/ArtistsListView.vue'
import HomeView from '@/views/HomeView.vue'
import SigninView from '@/views/SigninView.vue'
import ProfileView from '@/views/ProfileView.vue'
import AdminViewV2 from '@/views/AdminViewV2'
import SignupView from '@/views/SignupView.vue'
import ArtistCard from '@/components/artist_card/ArtistCard.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/artists',
    name: 'artists',
    component: ArtistsListView
  },
  {
    path: '/artists/:id',
    name: 'artists/:id',
    component: ArtistCard
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
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
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminViewV2,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
