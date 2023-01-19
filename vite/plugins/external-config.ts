import { viteExternalsPlugin } from 'vite-plugin-externals'
export default function createExternalConfig() {
  return viteExternalsPlugin({
    cesium: 'Cesium'
  })
}
