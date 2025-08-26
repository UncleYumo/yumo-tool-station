# useRoute() 与 useRouter() 区别详解

## 概述

在Vue 3的组合式API中，Vue Router提供了两个重要的组合式函数：`useRoute()`和`useRouter()`。虽然名字相似，但它们的作用和用途完全不同。

## useRoute() - 获取当前路由信息

### 作用
`useRoute()`用于**获取**当前路由的信息，返回当前路由对象，它是**只读**的。

### 返回值
返回一个响应式的路由对象，包含以下主要属性：

```typescript
interface RouteLocationNormalized {
  path: string          // 当前路径，如：/user/123
  name?: string         // 路由名称
  params: object        // 路由参数，如：{ id: '123' }
  query: object         // 查询参数，如：{ tab: 'profile' }
  hash: string          // URL的hash值
  fullPath: string      // 完整路径
  meta: object          // 路由元信息
  matched: Array        // 匹配的路由记录
}
```

### 使用场景
- 获取路由参数
- 获取查询参数
- 监听路由变化
- 根据路由信息渲染不同内容

### 示例代码

```vue
<template>
  <div>
    <h1>当前路径: {{ route.path }}</h1>
    <p>用户ID: {{ route.params.id }}</p>
    <p>查询参数: {{ route.query.tab }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'

const route = useRoute()

// 响应式地获取路由参数
const userId = computed(() => route.params.id)

// 监听路由变化
watch(() => route.params.id, (newId) => {
  console.log('用户ID变化:', newId)
})

// 监听查询参数变化
watch(() => route.query, (newQuery) => {
  console.log('查询参数变化:', newQuery)
}, { deep: true })
</script>
```

## useRouter() - 路由导航操作

### 作用
`useRouter()`用于**操作**路由，返回路由实例，可以进行编程式导航。

### 返回值
返回Router实例，包含以下主要方法：

```typescript
interface Router {
  push(to: RouteLocationRaw): Promise<NavigationFailure | void>
  replace(to: RouteLocationRaw): Promise<NavigationFailure | void>
  go(delta: number): void
  back(): void
  forward(): void
  beforeEach(guard: NavigationGuardWithThis): () => void
  afterEach(hook: NavigationHookAfter): () => void
  // ... 其他方法
}
```

### 使用场景
- 编程式导航（跳转页面）
- 替换当前路由
- 浏览器历史记录操作
- 路由守卫

### 示例代码

```vue
<template>
  <div>
    <button @click="goToUser">跳转到用户页面</button>
    <button @click="goBack">返回上一页</button>
    <button @click="replaceRoute">替换当前路由</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 编程式导航 - 新增历史记录
const goToUser = () => {
  router.push('/user/123')
  // 或者
  router.push({
    name: 'User',
    params: { id: '123' },
    query: { tab: 'profile' }
  })
}

// 返回上一页
const goBack = () => {
  router.back()
  // 或者
  router.go(-1)
}

// 替换当前路由 - 不新增历史记录
const replaceRoute = () => {
  router.replace('/home')
}

// 前进到下一页
const goForward = () => {
  router.forward()
  // 或者
  router.go(1)
}
</script>
```

## 核心区别总结

| 特性 | useRoute() | useRouter() |
|------|------------|-------------|
| **主要用途** | 获取路由信息 | 操作路由导航 |
| **返回值** | 当前路由对象（只读） | 路由实例（可操作） |
| **响应性** | 响应式，路由变化时自动更新 | 非响应式，是固定的路由实例 |
| **常用场景** | 读取params、query、path等 | push、replace、go等导航操作 |
| **数据流向** | 从路由到组件（单向） | 从组件到路由（操作） |

## 实际应用示例

### 场景1：商品详情页

```vue
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()   // 获取商品ID
const router = useRouter() // 用于导航操作

// 从路由参数获取商品ID
const productId = computed(() => route.params.id)

// 跳转到购买页面
const goToBuy = () => {
  router.push(`/buy/${productId.value}`)
}

// 返回商品列表
const backToList = () => {
  router.push('/products')
}
</script>
```

### 场景2：路由参数变化监听

```vue
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()

// 监听路由参数变化，重新加载数据
watch(() => route.params.id, async (newId) => {
  if (newId) {
    await loadUserData(newId)
  }
}, { immediate: true })

// 监听查询参数变化，更新筛选条件
watch(() => route.query, (newQuery) => {
  updateFilters(newQuery)
}, { deep: true })
</script>
```

## 注意事项

### 1. 响应式使用
```vue
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// ✅ 正确：使用computed或watch监听变化
const userId = computed(() => route.params.id)

// ❌ 错误：直接赋值会失去响应性
const userId = route.params.id
</script>
```

### 2. 在setup()外使用
```vue
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

// ✅ 正确：在setup作用域内使用
const route = useRoute()
const router = useRouter()

// ❌ 错误：不能在setup外使用
setTimeout(() => {
  const route = useRoute() // 这会报错
}, 1000)
</script>
```

### 3. 类型安全
```typescript
import { useRoute } from 'vue-router'

const route = useRoute()

// ✅ 推荐：类型断言
const userId = route.params.id as string

// ✅ 或者类型检查
if (typeof route.params.id === 'string') {
  const userId = route.params.id
}
```

## 与Vue 2的对比

在Vue 2中，我们通过`this.$route`和`this.$router`来访问：

```javascript
// Vue 2
export default {
  methods: {
    getUserId() {
      return this.$route.params.id  // 对应useRoute()
    },
    goToHome() {
      this.$router.push('/home')    // 对应useRouter()
    }
  }
}
```

```vue
<!-- Vue 3 Composition API -->
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()    // 对应this.$route
const router = useRouter()  // 对应this.$router

const getUserId = () => route.params.id
const goToHome = () => router.push('/home')
</script>
```

## 总结

简单记忆：
- **useRoute()** = 获取路由信息 = "我在哪里？"
- **useRouter()** = 控制路由导航 = "我要去哪里？"

两者配合使用，可以实现完整的路由功能：读取当前路由状态，并根据需要进行导航操作。