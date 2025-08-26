<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import CommonHeader from './components/CommonHeader.vue'

const route = useRoute()

// 监听路由变化，更新页面标题
watch(
  () => route.meta.title,
  (title) => {
    if (title) {
      document.title = title as string
    }
  },
  { immediate: true }
)
</script>

<template>
  <CommonHeader />
  <router-view />
</template>

<style>

</style>
