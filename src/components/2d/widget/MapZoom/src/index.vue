<!--
    @description 地图放大缩小
    @author zhangcj
    @date 2023-01-30 10:34:11
 -->
<template>
  <div class="zoom-container">
    <div class="zoom-in" @click="handleZoom('plus')" title="放大">
      <img src="../../img/zoom-in.png" alt="" />
    </div>
    <div class="zoom-out" title="缩小" @click="handleZoom('subtract')">
      <img src="../../img/zoom-out.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Map from 'ol/Map'
const props = defineProps<{
  map: Map
}>()
const handleZoom = (type: 'plus' | 'subtract') => {
  const map = props.map
  const view = map.getView()
  let zoom = view.getZoom()!
  type === 'plus' ? zoom++ : zoom--
  view.setZoom(zoom)
}
</script>

<style lang="scss" scoped>
.zoom-container {
  width: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  :hover {
    cursor: pointer;
  }

  .zoom-in {
    width: 32px;
    height: 33px;
    border-bottom: 1px solid #d3d3d3;
    img {
      height: 14px;
      width: 14px;
      margin: 9px;
    }
  }
  .zoom-out {
    width: 32px;
    height: 32px;
    img {
      height: 14px;
      width: 14px;
      margin: 9px;
    }
  }
}
</style>
