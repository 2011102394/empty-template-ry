import { App } from 'vue'
import Map from './Map'
import BaseLayerSwitch from './widget/BaseLayeSwitch'
import MapZoom from './widget/MapZoom'
import MapGrid from './widget/MapGrid'
const components = [Map, BaseLayerSwitch, MapZoom, MapGrid]
export default {
  install(app: App) {
    components.forEach((item) => {
      app.use(item)
    })
  }
}
