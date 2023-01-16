import { App } from 'vue'
import Map from './Map'
const components = [Map]
export default {
  install(app: App) {
    components.forEach((item) => {
      app.use(item)
    })
  }
}
