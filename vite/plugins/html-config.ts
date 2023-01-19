import htmlConfig from 'vite-plugin-html-config'
export default function createHtmlConfig() {
  return htmlConfig({
    headScripts: [
      {
        src: './lib/cesium/Cesium.js'
      }
    ],
    links: [
      {
        rel: 'stylesheet',
        href: './lib/cesium/Widgets/widgets.css'
      }
    ]
  })
}
