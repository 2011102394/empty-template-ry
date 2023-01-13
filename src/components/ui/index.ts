import { App } from 'vue'
import chooseArea from './chooseArea'

const components = [chooseArea]

export default {
  install(app: App) {
    components.forEach((item) => {
      app.use(item)
    })
  }
}
