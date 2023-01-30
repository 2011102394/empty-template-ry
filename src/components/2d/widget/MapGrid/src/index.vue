<!--
    @description 地图经纬网部件
    @author zhangcj
    @date 2023-01-30 10:59:27
 -->
<template>
  <div
    class="widget-grid-container"
    title="地图格网"
    @click="handleShowGraticuleLayer"
  >
    <img src="../../img/grid.png" alt="" />
  </div>
</template>

<script lang="ts" setup>
import Map from 'ol/Map'
import { findLayerById } from '../../../utils/layerUtil'
import GraticuleLayer from 'ol/layer/Graticule'
import Stroke from 'ol/style/Stroke'
const showGrid = ref(false)
const props = defineProps<{
  map: Map
  /** 网格线颜色 */
  lineColor?: string
  /** 网格线宽度 */
  lineWidth?: number
}>()
const handleShowGraticuleLayer = () => {
  const gridLayerId = 'jww'
  const map = props.map
  if (!showGrid.value) {
    const graticuleLayer = new GraticuleLayer({
      showLabels: true,
      // the style to use for the lines, optional.
      strokeStyle: new Stroke({
        color: props.lineColor ? props.lineColor : 'rgba(255,120,0,0.9)',
        width: props.lineWidth ? props.lineWidth : 2,
        lineDash: [0.5, 4]
      })
    })
    graticuleLayer.set('id', gridLayerId)
    map.addLayer(graticuleLayer)
  } else {
    const layer = findLayerById(map, gridLayerId)!
    map.removeLayer(layer)
  }
  showGrid.value = !showGrid.value
}
</script>

<style lang="scss" scoped>
.widget-grid-container {
  width: 32px;
  height: 32px;
  border: 1px solid #d3d3d3;
  background-color: #fff;
  border-radius: 4px;
  :hover {
    cursor: pointer;
  }
  img {
    height: 16px;
    width: 16px;
    margin: 8px;
  }
}
</style>
