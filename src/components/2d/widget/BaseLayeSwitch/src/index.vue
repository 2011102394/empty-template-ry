<!--
    @description 2d地图底图切换
    @author zhangcj
    @date 2023-01-28 10:13:03
 -->
<template>
  <div class="widget-base-layer-switch-container">
    <div class="layer-switch-pan" v-if="showInfo">
      <div
        :class="['layer-item', layerItem.active ? 'active' : '']"
        v-for="layerItem in layers"
        :key="layerItem.id"
        :style="`background-image: url(${layerItem.thumb});`"
        @click="handleLayerSwitch(layerItem.id)"
      >
        <div class="layer-label">
          {{ layerItem.title }}
        </div>
      </div>
    </div>
    <div
      class="layer-switch-btn"
      @click="showInfo = !showInfo"
      title="底图切换"
    >
      <img src="../../img/layer-switch.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface SwithcLayerItem {
  /** 图层id */
  id: string
  /** 图层标题 */
  title: string
  /** 缩略图 */
  thumb: string
  /** 是否激活 */
  active: boolean
  /** 子图层 */
  children?: Array<Partial<SwithcLayerItem>>
}
interface IProps {
  layers: Array<SwithcLayerItem>
}
defineProps<IProps>()
const emits = defineEmits(['handleSwitch'])
const showInfo = ref(false)
const handleLayerSwitch = (id: string) => {
  emits('handleSwitch', id)
}
</script>

<style lang="scss" scoped>
.widget-base-layer-switch-container {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  .layer-switch-pan {
    width: 250px;
    padding: 10px;
    background-color: #fff;
    margin-right: 10px;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    max-height: 220px;
    overflow-y: auto;
    .layer-item {
      position: relative;
      width: 30%;
      height: 56px;
      .layer-label {
        height: 18px;
        font-size: 12px;
        text-align: center;
        position: absolute;
        right: 0px;
        bottom: 0px;
        width: auto;
        overflow: hidden;
        color: #fff;
        background: rgba(0, 173, 181, 0.5);
      }
    }
    .active {
      border: 2px solid #1890ff;
    }
  }
  .layer-switch-btn {
    background-color: #fff;
    border-radius: 4px;
    height: 32x;
    width: 32px;
    text-align: center;
    padding-top: 6px;
    img {
      height: 18px;
      width: 18px;
    }
    :hover {
      cursor: pointer;
    }
  }
}
</style>
