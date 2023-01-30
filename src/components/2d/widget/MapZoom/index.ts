import { App } from 'vue'
import MapZoom from './src/index.vue'
export default {
  install(app: App) {
    app.component('arsc-2d-map-zoom', MapZoom)
  }
}
