import { App } from 'vue'
import BaseLayerSwitch from './src/index.vue'
export default {
  install(app: App) {
    app.component('arsc-2d-base-layer-switch', BaseLayerSwitch)
  }
}
