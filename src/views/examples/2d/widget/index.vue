<!--
    @description 测试底图切换组件
    @author zhangcj
    @date 2023-01-28 09:24:18
 -->
<template>
  <div class="map-widget-container">
    <arsc-2d-map @mapInited="handleMapInited" :initOptions="option" />
    <div class="widget-content" v-if="map">
      <div class="widget-item"></div>
      <div class="widget-item"></div>
      <div class="widget-item">
        <arsc-2d-map-zoom :map="map" />
      </div>
      <div class="widget-item">
        <arsc-2d-base-layer-switch
          :layers="layersRef"
          @handleSwitch="handleLayerSwitch"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Map from 'ol/Map'
import { MAP_TDT_KEY } from '@/config'
import tdtVec from '@/assets/images/tdt/tdt_vec.png'
import tdtImg from '@/assets/images/tdt/tdt_img.png'
import tdtTer from '@/assets/images/tdt/tdt_ter.png'
import { createTDTLayer, findLayerById } from '@/components/2d/utils/layerUtil'
const map = ref()
const option = {
  zoom: 8,
  proj: 'EPSG:3857',
  requireTDTBaseLayer: true,
  tdtType: '影像',
  tk: MAP_TDT_KEY
}
const layers = [
  {
    id: 'vec',
    title: '地图',
    thumb: tdtVec,
    active: false,
    children: [{ id: 'cva', title: '地图注记' }]
  },
  {
    id: 'img',
    title: '影像',
    thumb: tdtImg,
    active: true,
    children: [{ id: 'cia', title: '影像注记' }]
  },
  {
    id: 'ter',
    title: '地形',
    thumb: tdtTer,
    active: false,
    children: [{ id: 'cta', title: '地形注记' }]
  }
]
const layersRef = ref(layers)
const handleMapInited = (map_: Map) => {
  // 创建电子地图
  const vecLayer = createTDTLayer('矢量底图', '球面墨卡托投影', MAP_TDT_KEY)
  vecLayer.setVisible(false)
  const vecLabelLayer = createTDTLayer(
    '矢量注记',
    '球面墨卡托投影',
    MAP_TDT_KEY
  )
  vecLabelLayer.setVisible(false)
  // 创建地形图
  const terLayer = createTDTLayer('地形晕渲', '球面墨卡托投影', MAP_TDT_KEY)
  terLayer.setVisible(false)
  const terLaberLayer = createTDTLayer(
    '地形注记',
    '球面墨卡托投影',
    MAP_TDT_KEY
  )
  terLaberLayer.setVisible(false)
  map_.addLayer(vecLayer)
  map_.addLayer(vecLabelLayer)
  map_.addLayer(terLayer)
  map_.addLayer(terLaberLayer)
  map.value = map_
}
const handleLayerSwitch = (id: string) => {
  layersRef.value.forEach((layer) => {
    if (layer.id === id) {
      // 显示图层
      layer.active = true
      findLayerById(map.value, id)?.setVisible(true)
      // 显示子图层
      if (layer.children) {
        layer.children.forEach((child) => {
          findLayerById(map.value, child.id!)?.setVisible(true)
        })
      }
    } else {
      // 隐藏图层
      layer.active = false
      findLayerById(map.value, layer.id)?.setVisible(false)
      // 隐藏子图层
      if (layer.children) {
        layer.children.forEach((child) => {
          findLayerById(map.value, child.id!)?.setVisible(false)
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.map-widget-container {
  position: relative;
  height: 100%;
  .widget-content {
    position: absolute;
    right: 20px;
    bottom: 20px;
    display: flex;
    flex-direction: column;
    .widget-item {
      margin-top: 10px;
    }
  }
}
</style>
