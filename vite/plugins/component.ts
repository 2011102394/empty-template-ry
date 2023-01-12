import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default function createComponent() {
  return Components({
    /** 只自动导入第三方组件*/
    dirs: ['/node_modules'],
    dts: 'src/types/component.d.ts',
    resolvers: [
      // // 自动导入 Element Plus 组件
      ElementPlusResolver()
    ]
  })
}
