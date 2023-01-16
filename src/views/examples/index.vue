<!--
    @description 示例页面
    @author zhangcj
    @date 2023-01-16 10:38:03
 -->
<template>
  <div class="examples-container">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        :title="item.title"
        :name="item.name"
        v-for="item in examples"
        :key="item.name"
      >
        <div class="content">
          <el-button
            v-for="child in item.children"
            :key="child.title"
            size="small"
            type="primary"
            @click="router.push(child.url)"
          >
            {{ child.title }}
          </el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { exampleList } from '@/config/exampleConfig'
const router = useRouter()
const activeNames = ref()
const examples = ref(exampleList)
</script>
<style lang="scss">
.examples-container {
  padding: 0px 20px;
}
</style>
