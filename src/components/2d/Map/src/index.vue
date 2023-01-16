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
import Map from 'ol/Map'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
import View from 'ol/View'
const mapDom = ref<HTMLElement>()
onMounted(() => {
  const map = new Map({
    target: mapDom.value,
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: [0, 0],
      zoom: 2
    })
  })
})
</script>

<style lang="scss" scoped>
.map-container {
  height: 100%;
  width: 100%;
}
</style>
