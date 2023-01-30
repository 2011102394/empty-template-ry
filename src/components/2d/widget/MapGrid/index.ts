import { App } from 'vue'
import MapGrid from './src/index.vue'

export default {
  install(app: App) {
    app.component('arsc-2d-map-grid', MapGrid)
  }
}
