import { App } from 'vue'
import Map from './Map'
import BaseLayerSwitch from './widget/BaseLayeSwitch'
import MapZoom from './widget/MapZoom'
const components = [Map, BaseLayerSwitch, MapZoom]
export default {
  install(app: App) {
    components.forEach((item) => {
      app.use(item)
    })
  }
}
