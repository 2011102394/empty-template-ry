import vue from '@vitejs/plugin-vue'
import createAutoImport from './auto-import'
import createComponent from './component'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
import createHtmlConfig from './html-config'
export default function createVitePlugins(
  viteEnv: Record<string, string>,
  isBuild = false
) {
  const vitePlugins = [vue()]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponent())
  vitePlugins.push(createSetupExtend())
  vitePlugins.push(createHtmlConfig())
  if (isBuild) {
    vitePlugins.push(...createCompression(viteEnv))
  }

  return vitePlugins
}
