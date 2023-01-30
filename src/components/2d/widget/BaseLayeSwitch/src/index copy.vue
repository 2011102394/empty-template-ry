<!--
    @description 2d地图底图切换
    @author zhangcj
    @date 2023-01-28 10:13:03
 -->
<template>
  <div class="base-layer-switch-container">
    <div
      :class="['layer-item', layerItem.active ? 'active' : '']"
      v-for="layerItem in layers"
      :key="layerItem.id"
      :title="layerItem.title"
      @click="handleLayerSwitch(layerItem.id)"
    >
      <div class="item-title">{{ layerItem.title }}</div>
      <div class="item-thumb">
        <img :src="layerItem.thumb" alt="" />
      </div>
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
const handleLayerSwitch = (id: string) => {
  emits('handleSwitch', id)
}
</script>

<style lang="scss" scoped>
.base-layer-switch-container {
  height: 100%;
  display: flex;
  flex-direction: row;
  .layer-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
    .item-title {
      width: 100%;
      text-align: center;
      background-color: #fff;
      font-size: 12px;
    }
    .item-thumb {
      height: 48px;
      img {
        height: 48px;
        width: 48px;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
  .active {
    border: 1px solid #1890ff;
    color: #1890ff;
  }
}
</style>
