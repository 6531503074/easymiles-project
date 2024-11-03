import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './pages/LoginPage.vue';
import SignUpPage from './pages/SignUpPage.vue';
import HomePage from './pages/HomePage.vue';
import CatePage from './pages/CategoryPage.vue';
import DetailPage from './pages/DetailPage.vue';
import EditProfilePage from './pages/EditProfilePage.vue';
const routes = [
  {
    path: '/EditProfilePage',
    name: 'EditProfilePage',
    component: EditProfilePage,
  },
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpPage,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage, 
  },
  {
    path: '/category',
    name: 'Category',
    component: CatePage, 
  },
  {
    path: '/detail',
    name: 'Detail',
    component: DetailPage, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
