<!--
    @description 基于openlayers 封装的地图对象
    @author zhangcj
    @date 2023-01-16 11:51:41
 -->
<template>
  <div class="map-container" ref="mapDom"></div>
</template>

<script lang="ts" setup>
import 'ol/ol.css'
import { MapInitOption } from '../types'
import { mapInit } from '../../utils/mapUtil'
interface IProps {
  /** 初始化参数 */
  initOptions: MapInitOption
}
const props = defineProps<IProps>()
const emits = defineEmits(['mapInited'])
// 地图容器
const mapDom = ref<HTMLElement>()
onMounted(() => {
  const map = mapInit(mapDom.value, { ...props.initOptions })
  // 地图初识化完毕，返回map实例对象
  emits('mapInited', map)
})
</script>

<style lang="scss" scoped>
.map-container {
  height: 100%;
  width: 100%;
}
</style>
