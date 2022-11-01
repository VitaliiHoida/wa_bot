import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ActualCourses from '@/views/ActualCourses.vue'
import ComingCourses from '@/views/ComingCourses.vue'
import CoursesOverview from '@/views/CoursesOverview.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/actual',
    name: 'actual',
    component: ActualCourses
  },
  {
    path: '/coming',
    name: 'coming',
    component: ComingCourses
  },
  {
    path: '/overview',
    name: 'overview',
    component: CoursesOverview
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
