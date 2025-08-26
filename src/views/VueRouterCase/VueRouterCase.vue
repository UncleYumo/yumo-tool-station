<template>
    <div class="nav-container">
        <nav class="nav">
            <router-link to="/">主页</router-link>
            <router-link v-for="caseItem in caseList" :key="caseItem.id" :to="`/vue-router-case/${caseItem.type}`">
                {{ caseItem.name }}
            </router-link>
        </nav>
    </div>

    <div class="main-container">
        <router-view />
    </div>
</template>

<script setup lang="ts">
import cases from './assets/cases.json'
// 根据cases中的数据生成对应的类型
type caseType = {
    id: number,
    name: string,
    description: string,
    type: string,
    flavour: string
}

const caseList = cases.map((item: caseType) => {
    return {
        id: item.id,
        name: item.name,
        description: item.description,
        type: item.type,
        flavour: item.flavour
    }
})
</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
}

.nav {
    margin: 40px auto 0 auto;
    width: fit-content;
    gap: 16px;
    display: flex;
}

.main-container {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
}
</style>