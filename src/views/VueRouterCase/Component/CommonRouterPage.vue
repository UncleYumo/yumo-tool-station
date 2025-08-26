<template>
    <h3>
        :/vue-router-case/{{ sub_path }}
    </h3>

    <div class="case-item">
        <h2>{{ case_item?.name }}</h2>
        <p>{{ case_item?.description }}</p>
        <p>{{ case_item?.flavour }}</p>
    </div>

</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import cases from '../assets/cases.json'
import { computed, watch } from 'vue';

const route = useRoute()

// 使用响应式的方式获取路由参数
const sub_path = computed(() => {
    return route.params.caseType as string
})

// 监听路由参数变化，更新页面标题
watch(sub_path, (newPath) => {
    document.title = '当前子路径: ' + (newPath || '路径错误')
}, { immediate: true })

const case_item = computed(() => {
    return cases.find(item => item.type === sub_path.value)
})
</script>

<style scoped lang="scss">
.case-item {
    margin: 20px auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>