import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ViewMovie from '../views/ViewMovie.vue'
import MyList from '../views/MyList.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/search',
        name: 'search',
        component: HomeView,
      }
    ],
  },
  {
    path: '/mylist',
    name: 'my-list',
    component: MyList,
  },
  {
    path: '/view/:id',
    name: 'view-movie',
    component: ViewMovie,
  },
  {
    path: '/signin',
    name: 'sign-in',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SignIn.vue')
  },
  { 
    path: '/:notfound(.*)',
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
