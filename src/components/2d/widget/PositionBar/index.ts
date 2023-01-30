import { App } from 'vue'
import PositionBar from './src/index.vue'
export default {
  install(app: App) {
    app.component('arsc-2d-position-bar', PositionBar)
  }
}
