import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.css"
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faHeart, faRightFromBracket, faPen, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan, faBan, faUserTie, faUserPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faUserXmark, faUserSlash, faShuffle, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faGithub, faHeart, faInstagram, faUser, faUserTie, faUserPlus, faUserXmark, faUserSlash, faRightFromBracket)
library.add(faPen, faArrowUp, faArrowDown, faTrashCan, faBan, faCheck, faShuffle, faArrowUpRightFromSquare)

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(vue3GoogleLogin, {
  clientId: '475355472399-91pnjujdun95tchfln0o8o73grb8uft0.apps.googleusercontent.com'
});
app.mount('#app');

import "bootstrap";