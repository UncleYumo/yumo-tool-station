<template>
  <header class="common-header">
    <div class="header-container">
      <!-- 左侧：标题 -->
      <div class="header-left">
        <h1 class="site-title" @click="goHome" @touchend.passive="goHome">
          羽沫工具站
        </h1>
      </div>
      
      <!-- 右侧：功能菜单选项卡 -->
      <div class="header-right">
        <div class="header-menu">
          <button 
            class="menu-toggle"
            :class="{ active: isMenuOpen }"
            @click="toggleMenu"
            @touchend.passive="toggleMenu"
            title="功能菜单"
          >
            <i class="icon-menu">☰</i>
            <span class="menu-text">菜单</span>
          </button>
          
          <!-- 下拉菜单 -->
          <transition name="menu-fade">
            <div v-if="isMenuOpen" class="menu-dropdown">
              <button 
                v-for="action in allActions"
                :key="action.id"
                :class="['menu-item', action.class]"
                @click="handleAction(action)"
                @touchend.passive="handleAction(action)"
              >
                <i class="action-icon">{{ action.icon }}</i>
                <span>{{ action.text }}</span>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 定义功能按钮的类型
interface HeaderAction {
  id: string
  text: string
  icon: string
  tooltip: string
  type: 'primary' | 'secondary' | 'extension'
  class?: string
  handler: () => void
}

const router = useRouter()
const route = useRoute()
const isMenuOpen = ref(false)

// 基础功能列表
const baseActions: HeaderAction[] = [
  {
    id: 'home',
    text: '主页',
    icon: '🏠',
    tooltip: '返回主页',
    type: 'primary',
    class: 'home-btn',
    handler: () => goHome()
  },
  {
    id: 'back',
    text: '返回',
    icon: '←',
    tooltip: '返回上一页',
    type: 'primary', 
    class: 'back-btn',
    handler: () => goBack()
  },
  {
    id: 'github',
    text: 'GitHub',
    icon: '⚡',
    tooltip: '访问项目GitHub仓库',
    type: 'secondary',
    class: 'github-btn',
    handler: () => openGithub()
  }
]

// 扩展功能列表（可以通过 props 或其他方式动态添加）
const extensionActions = ref<HeaderAction[]>([])

// 计算属性：合并所有功能到一个菜单中
const allActions = computed(() => {
  return [...baseActions, ...extensionActions.value]
})

// 功能实现
const goHome = () => {
  if (route.name !== 'Home') {
    router.push('/')
  }
  closeMenu()
}

const goBack = () => {
  // 优先使用浏览器历史记录
  if (window.history.length > 1) {
    router.back()
  } else {
    // 如果没有历史记录，回到主页
    router.push('/')
  }
  closeMenu()
}

const openGithub = () => {
  // GitHub仓库链接占位符，用户可以自行替换
  const githubUrl = 'https://github.com/UncleYumo/yumo-tool-station'
  window.open(githubUrl, '_blank', 'noopener,noreferrer')
  closeMenu()
}

// 菜单控制
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// 处理按钮点击
const handleAction = (action: HeaderAction) => {
  action.handler()
}

// 点击外部关闭菜单
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  const menu = document.querySelector('.header-menu')
  if (menu && !menu.contains(target)) {
    closeMenu()
  }
}

// 暴露添加扩展功能的方法
const addExtensionAction = (action: Omit<HeaderAction, 'type'>) => {
  extensionActions.value.push({
    ...action,
    type: 'extension'
  })
}

const removeExtensionAction = (id: string) => {
  const index = extensionActions.value.findIndex(action => action.id === id)
  if (index > -1) {
    extensionActions.value.splice(index, 1)
  }
}

// 生命周期
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 暴露方法供父组件使用
defineExpose({
  addExtensionAction,
  removeExtensionAction,
  closeMenu
})
</script>

<style lang="scss" scoped>
.common-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
    height: 56px;
  }
}

.header-left {
  flex: 1;
  
  .site-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin: 0;
    cursor: pointer;
    transition: all 0.3s ease;
    user-select: none;
    
    &:hover {
      color: #f0f0f0;
      transform: scale(1.05);
    }
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
}

.header-menu {
  position: relative;
  
  .menu-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    user-select: none;
    
    .icon-menu {
      font-size: 16px;
      transition: transform 0.3s ease;
    }
    
    .menu-text {
      @media (max-width: 480px) {
        display: none;
      }
    }
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    &.active {
      background: rgba(255, 255, 255, 0.2);
      
      .icon-menu {
        transform: rotate(90deg);
      }
    }
    
    @media (max-width: 480px) {
      padding: 10px 12px;
      min-width: 44px;
      justify-content: center;
    }
  }
  
  .menu-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    min-width: 180px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    z-index: 1001;
    border: 1px solid rgba(0, 0, 0, 0.08);
    
    .menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 14px 18px;
      background: transparent;
      border: none;
      color: #333;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: left;
      
      .action-icon {
        font-size: 16px;
        width: 20px;
        text-align: center;
      }
      
      &:hover {
        background: #f8f9fa;
        color: #2563eb;
        
        .action-icon {
          transform: scale(1.1);
        }
      }
      
      &:not(:last-child) {
        border-bottom: 1px solid #f0f0f0;
      }
      
      &.home-btn:hover {
        background: rgba(76, 175, 80, 0.1);
        color: #4caf50;
      }
      
      &.back-btn:hover {
        background: rgba(33, 150, 243, 0.1);
        color: #2196f3;
      }
      
      &.github-btn:hover {
        background: rgba(156, 39, 176, 0.1);
        color: #9c27b0;
      }
    }
  }
}

// 菜单动画
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.3s ease;
}

.menu-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

// 响应式设计
@media (max-width: 480px) {
  .header-container {
    padding: 0 12px;
  }
}
</style>