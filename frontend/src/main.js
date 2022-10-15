import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.css"
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
/*

*/
const app = createApp(App)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: '475355472399-91pnjujdun95tchfln0o8o73grb8uft0.apps.googleusercontent.com'
})
app.mount('#app')

import "bootstrap"