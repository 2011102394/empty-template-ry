<!--
    @description 测试cesium集成结果
    @author zhangcj
    @date 2023-01-28 09:55:43
 -->
<template>
  <div class="cesium-container" ref="containerRef"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, markRaw } from 'vue'
import {
  ArcGisMapServerImageryProvider,
  Camera,
  Viewer,
  Rectangle
} from 'cesium'

const containerRef = ref<HTMLDivElement>()
const unvisibleCreditRef = ref<HTMLDivElement>()

onMounted(() => {
  const viewer = new Viewer(containerRef.value as HTMLElement, {
    infoBox: false
  })

  const rawViewer = markRaw(viewer)
  console.log(rawViewer)
})
</script>

<style lang="scss" scoped>
.cesium-container {
  height: 100%;
}
</style>
