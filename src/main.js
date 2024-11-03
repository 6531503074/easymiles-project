import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { library} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash, faShoppingCart, faHeart, faUser, faGear, faMagnifyingGlass, faBell, faPenToSquare, faLock, faCircleQuestion, faCircleUser } from '@fortawesome/free-solid-svg-icons';


library.add(faGoogle, faEye, faEyeSlash, faHeart, faShoppingCart, faUser, faGear, faMagnifyingGlass, faBell, faPenToSquare, faLock, faCircleQuestion, faCircleUser);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router).mount('#app');
