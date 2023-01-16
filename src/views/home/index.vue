<!--
    @description home页面
    @author zhangcj
    @date 2023-01-12 15:52:19
 -->
<template>
  <div class="home-container">
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
.home-container {
  height: 100%;
  width: 100%;
}
</style>
