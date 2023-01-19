import { createApp } from 'vue'
import '@/styles/index.scss'
import router from '@/router/index'
import App from './App.vue'
import '@/assets/fonts/font.css'
import 'element-plus/dist/index.css'
import ArscUI from '@/components/ui'
import ArscMap2D from '@/components/2d'
const app = createApp(App)
app.use(router)
app.use(ArscMap2D)
app.use(ArscUI)
app.mount('#app')
