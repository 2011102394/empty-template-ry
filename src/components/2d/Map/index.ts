import { App } from 'vue'
import Map from './src/index.vue'
export default {
  install(app: App) {
    app.component('arsc-2d-map', Map)
  }
}
