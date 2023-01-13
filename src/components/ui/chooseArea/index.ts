import { App } from 'vue'
import ChooseArea from './src/index.vue'

export default {
  install(app: App) {
    app.component('arsc-choose-area', ChooseArea)
  }
}
