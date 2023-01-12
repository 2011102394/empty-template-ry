import vue from '@vitejs/plugin-vue'
export default function createVitePlugins(
  viteEnv: Record<string, string>,
  isBuild = false
) {
  const vitePlugins = [vue()]

  return vitePlugins
}
