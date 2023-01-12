import { createApp } from 'vue'
import '@/styles/index.scss'
import router from '@/router/index'
import App from './App.vue'
import '@/assets/fonts/font.css'
const app = createApp(App)
app.use(router)
app.mount('#app')
