<!--
    @description arsc-2d-map组件测试页面
    @author zhangcj
    @date 2023-01-16 12:06:02
 -->
<template>
  <div class="map-2d-container">
    <arsc-2d-map @mapInited="handleMapInited" :initOptions="option" />
  </div>
</template>

<script lang="ts" setup>
import Map from 'ol/Map'
import { MAP_TDT_KEY } from '@/config'

const option = {
  zoom: 8,
  proj: 'EPSG:3857',
  requireTDTBaseLayer: true,
  tdtType: '影像',
  tk: MAP_TDT_KEY
}

const handleMapInited = (map: Map) => {
  console.log(map)
}
</script>

<style lang="scss" scoped>
.map-2d-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  .left-pan {
    height: 100%;
    width: 50%;
  }
  .right-pan {
    height: 100%;
    width: 50%;
  }
}
</style>
