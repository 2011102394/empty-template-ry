import { App } from 'vue'
import Map from './Map'
import BaseLayerSwitch from './widget/BaseLayeSwitch'
const components = [Map, BaseLayerSwitch]
export default {
  install(app: App) {
    components.forEach((item) => {
      app.use(item)
    })
  }
}
