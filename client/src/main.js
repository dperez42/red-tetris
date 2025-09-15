import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { socket } from './services/sockets'
import store from './store/index.js'

const app = createApp(App)

app.provide('$redTetrisSocket', socket); 
app.use(router)
app.use(store)
app.mount('#app')
