import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.css"
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faGithub)
library.add(faHeart)
library.add(faInstagram)
library.add(faUser)

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(vue3GoogleLogin, {
  clientId: '475355472399-91pnjujdun95tchfln0o8o73grb8uft0.apps.googleusercontent.com'
});
app.mount('#app');

import "bootstrap";