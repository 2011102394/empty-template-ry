import { App } from 'vue'
import Map from './Map'
import BaseLayerSwitch from './widget/BaseLayeSwitch'
import MapZoom from './widget/MapZoom'
import MapGrid from './widget/MapGrid'
import PositionBar from './widget/PositionBar'
const components = [Map, BaseLayerSwitch, MapZoom, MapGrid, PositionBar]
export default {
  install(app: App) {
    components.forEach((item) => {
      app.use(item)
    })
  }
}
