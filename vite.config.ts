import { defineConfig, loadEnv } from 'vite'
import { join } from 'path'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.arsc.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。
    // 例如，如果你的应用被部署在 https://www.arsc.com/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === 'production' ? './' : '/',
    resolve: {
      alias: {
        '@': join(__dirname, 'src')
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    plugins: createVitePlugins(env, command === 'build'),
    server: {
      port: 9091,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/dev-api': {
          target: 'http://localhost:8989',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, '')
        }
      }
    },
    // 项目打包相关配置
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/assets/[name]-[hash].[ext]'
        }
      },
      // 清除项目中的console和debugger
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  }
})
