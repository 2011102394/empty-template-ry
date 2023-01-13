<!--
    @description 省市区选择器组件
    @author zhangcj
    @date 2022-10-08 17:09:31
 -->
<template>
  <div>
    <el-select placeholder="请选择省份" v-model="province" clearable>
      <el-option
        v-for="item in areas"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
    <el-select
      :disabled="!province"
      placeholder="请选择城市"
      v-model="city"
      style="margin: 0px 20px"
      clearable
    >
      <el-option
        v-for="item in selectCitys"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
    <el-select
      :disabled="!province || !city"
      placeholder="请选择区域"
      v-model="area"
      clearable
    >
      <el-option
        v-for="item in selectAreas"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import allArea from './lib/pca-code.json'

/**
 * 省市区条目类型
 */
export interface IAreaItem {
  /** 行政区划编码 */
  code: string
  /** 名称 */
  name: string
  /** 子级行政区 */
  children?: IAreaItem[]
}

export interface IData {
  /** 行政区划编码 */
  code: string
  /** 名称 */
  name: string
}
const emits = defineEmits(['change'])

// 下拉框选择省份的值
const province = ref<string>('')
// 下拉框选择城市值
const city = ref<string>('')
// 下拉框选择区县的值
const area = ref<string>('')
// 所有的省市区数据
const areas = ref(allArea)
// 城市下拉框所有的值
const selectCitys = ref<IAreaItem[]>([])
// 区县下拉框所有的值
const selectAreas = ref<IAreaItem[]>([])
// 监听省份下拉框的变化
watch(
  () => province.value,
  (val) => {
    if (val) {
      selectCitys.value = areas.value.find(
        (item) => item.code === val
      )!.children
      city.value = ''
      area.value = ''
    }
  }
)
// 监听城市下拉框的变化
watch(
  () => city.value,
  (val) => {
    if (val) {
      selectAreas.value = selectCitys.value.find(
        (item: any) => item.code === val
      )!.children!
      area.value = ''
    }
  }
)
// 监听区县下拉框的变化
watch(
  () => area.value,
  (val) => {
    const provinceData = {
      code: province.value,
      name: allArea.find((item) => item.code === province.value)!.name
    }
    const cityData = {
      code: province.value,
      name: selectCitys.value.find((item) => item.code === city.value)!.name
    }
    const areaData = {
      code: val,
      name: selectAreas.value.find((item) => item.code === val)!.name
    }
    emits('change', { province: provinceData, city: cityData, area: areaData })
  }
)
</script>

<style lang="scss" scoped></style>
