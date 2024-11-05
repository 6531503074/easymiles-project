import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './pages/LoginPage.vue';
import SignUpPage from './pages/SignUpPage.vue';
import HomePage from './pages/HomePage.vue';
import CatePage from './pages/CategoryPage.vue';
import DetailPage from './pages/DetailPage.vue';
import EditProfilePage from './pages/EditProfilePage.vue';
import SecurityPage from './pages/SecurityPage.vue';
import HelpPage from './pages/HelpPage.vue';
import PaymentPage from './pages/PaymentPage.vue';
import FavoritePage from './pages/FavoritePage.vue';
const routes = [
  {
    path: '/HelpPage',
    name: 'HelpPage',
    component: HelpPage,
  },
  {
    path: '/SecurityPage',
    name: 'SecurityPage',
    component: SecurityPage,
  },
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
  {
    path: '/payment',
    name: 'Payment',
    component: PaymentPage, 
  },
  {
    path: '/FavoritePage',
    name: 'FavoritePage',
    component: FavoritePage, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
