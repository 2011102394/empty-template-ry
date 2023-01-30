<!--
    @description 位置提示栏
    @author zhangcj
    @date 2023-01-30 12:59:41
 -->
<template>
  <div class="widget-position-bar-container">
    <div id="scale-line-container"></div>
    <div class="coordinate-lebel-contaienr">
      <div class="lgtd-container">经度: {{ lgtd }}</div>
      <div class="lttd-container">纬度: {{ lttd }}</div>
    </div>
    <div class="zoom-label-contaienr">级别: {{ zoom }}</div>
  </div>
</template>

<script lang="ts" setup>
import Map from 'ol/Map'
const props = defineProps<{
  map: Map
}>()
const lgtd = ref(0)
const lttd = ref(0)
const zoom = ref(0)
</script>

<style lang="scss" scoped>
.widget-position-bar-container {
  height: 30px;
  width: 100%;
  background-color: #333854;
  opacity: 0.8;
  display: flex;
  flex-direction: row;
  align-items: center;
  #scale-line-container {
    height: 100%;
    width: 30%;
    .ol-scale-line {
      bottom: 15%;
      left: 1%;
      background-color: #333854;
    }
  }
  .coordinate-lebel-contaienr {
    display: flex;
    flex-direction: row;
    width: 60%;
    align-items: center;
    justify-content: flex-end;
    color: #fff;
    .lttd-container {
      margin-left: 5%;
    }
  }
  .zoom-label-contaienr {
    padding-left: 4%;
    width: 10%;
    color: #fff;
  }
}
</style>
