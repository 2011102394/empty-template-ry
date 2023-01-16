<!--
    @description 区域选择器测试
    @author zhangcj
    @date 2023-01-16 11:17:46
 -->
<template>
  <div class="choose-area-container">
    <arsc-choose-area @change="handleChange" />
  </div>
</template>

<script lang="ts" setup>
interface IAreaItem {
  /** 编码 */
  code: string
  /** 名称 */
  name: string
}
interface IData {
  /** 区域 */
  area: IAreaItem
  /** 市 */
  city: IAreaItem
  /** 区 */
  province: IAreaItem
}
const handleChange = (data: IData) => {
  console.log(data)
}
</script>

<style lang="scss" scoped>
.choose-area-container {
  height: 100%;
}
</style>
