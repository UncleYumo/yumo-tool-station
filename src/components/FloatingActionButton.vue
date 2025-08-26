<template>
  <div 
    class="floating-action-button"
    :class="{ expanded: isExpanded }"
    :style="{ 
      left: position.x + 'px', 
      top: position.y + 'px',
      transform: `translate(${isDragging ? dragOffset.x : 0}px, ${isDragging ? dragOffset.y : 0}px)`
    }"
  >
    <!-- 主按钮 -->
    <div 
      class="fab-main-button"
      @mousedown="startDrag"
      @touchstart="startDrag"
      @click="toggleMenu"
    >
      <div class="fab-icon" :class="{ rotated: isExpanded }">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6V18M6 12H18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </div>

    <!-- 功能菜单 -->
    <div class="fab-menu" v-show="isExpanded">
      <div 
        class="fab-menu-item"
        v-for="(item, index) in menuItems"
        :key="item.id"
        :style="{ 
          '--index': index,
          transitionDelay: isExpanded ? `${index * 50}ms` : `${(menuItems.length - index - 1) * 50}ms`
        }"
        @click="handleMenuClick(item)"
        @touchend="handleMenuClick(item)"
      >
        <div class="fab-menu-icon">
          <component :is="item.icon"></component>
        </div>
        <span class="fab-menu-label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick, markRaw, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

// 图标组件 - 使用 markRaw 避免响应式包装
const BackIcon = markRaw({
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
})

const HomeIcon = markRaw({
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
})

const router = useRouter()

// 响应式数据
const isExpanded = ref(false)
const isDragging = ref(false)
const position = reactive({ x: 20, y: 100 })
const dragOffset = reactive({ x: 0, y: 0 })
const dragStartPos = reactive({ x: 0, y: 0 })
const hasDragged = ref(false)  // 添加拖拽标记

// 菜单项配置 - 使用 shallowRef 避免深度响应式
const menuItems = shallowRef([
  {
    id: 'back',
    label: '返回上一页',
    icon: BackIcon,
    action: 'back'
  },
  {
    id: 'home',
    label: '回到主页',
    icon: HomeIcon,
    action: 'home'
  }
])

// 切换菜单展开状态
const toggleMenu = (event: Event) => {
  console.log('点击主按钮，hasDragged:', hasDragged.value) // 调试日志
  
  // 阻止事件冒泡
  event.stopPropagation()
  
  // 只有在没有拖拽的情况下才切换菜单
  if (!hasDragged.value && !isDragging.value) {
    isExpanded.value = !isExpanded.value
    console.log('菜单状态切换为:', isExpanded.value)
  }
}

// 处理菜单项点击
const handleMenuClick = (item: any) => {
  console.log('点击了菜单项:', item.action) // 添加调试日志
  
  // 先收起菜单
  isExpanded.value = false
  
  // 延迟执行导航，确保动画完成
  setTimeout(() => {
    switch (item.action) {
      case 'back':
        console.log('执行返回上一页')
        // 检查是否有历史记录
        if (window.history.length > 1) {
          router.back()
        } else {
          console.log('没有上一页，跳转到首页')
          router.push('/')
        }
        break
      case 'home':
        console.log('执行回到主页')
        router.push('/')
        break
      default:
        console.log('未知操作:', item.action)
    }
  }, 150)
}

// 拖拽开始
const startDrag = (event: MouseEvent | TouchEvent) => {
  console.log('开始拖拽，事件类型:', event.type) // 调试日志
  
  event.preventDefault()
  event.stopPropagation() // 阻止事件冒泡
  
  isDragging.value = true
  hasDragged.value = false  // 重置拖拽标记
  
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY
  
  dragStartPos.x = clientX - position.x
  dragStartPos.y = clientY - position.y
  
  // 添加全局事件监听
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag, { passive: false })
  document.addEventListener('touchend', stopDrag)
  
  // 如果菜单是展开的，则收起
  if (isExpanded.value) {
    isExpanded.value = false
  }
}

// 拖拽过程
const onDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return
  
  event.preventDefault()
  hasDragged.value = true  // 标记已经拖拽
  
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY
  
  dragOffset.x = clientX - dragStartPos.x - position.x
  dragOffset.y = clientY - dragStartPos.y - position.y
}

// 停止拖拽
const stopDrag = () => {
  if (!isDragging.value) return
  
  // 移除全局事件监听
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
  
  // 如果发生了拖拽，直接更新位置到拖拽的位置
  if (hasDragged.value) {
    const newX = position.x + dragOffset.x
    const newY = position.y + dragOffset.y
    
    // 边界检测（只限制在屏幕内，不做吸附）
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const buttonSize = 56 // 按钮大小
    
    // 限制在可视区域内，但不吸附
    position.x = Math.max(0, Math.min(newX, windowWidth - buttonSize))
    position.y = Math.max(0, Math.min(newY, windowHeight - buttonSize))
  }
  
  // 重置拖拽状态
  dragOffset.x = 0
  dragOffset.y = 0
  isDragging.value = false
  
  // 延迟重置拖拽标记，避免点击事件立即触发
  setTimeout(() => {
    hasDragged.value = false
  }, 100)
}

// 组件挂载时设置初始位置
onMounted(() => {
  // 设置初始位置在右侧
  position.x = window.innerWidth - 76
  position.y = 100
})

// 组件卸载时清理事件监听
onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
})
</script>

<style scoped>
.floating-action-button {
  position: fixed;
  z-index: 9999;
  user-select: none;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.floating-action-button.expanded {
  pointer-events: auto;
}

.fab-main-button {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  /* 移动端触摸优化 */
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
}

.fab-main-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #7c8cff 0%, #8657c7 100%);
}

.fab-main-button:active {
  transform: scale(0.95);
}

.fab-icon {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fab-icon.rotated {
  transform: rotate(45deg);
}

.fab-menu {
  position: absolute;
  bottom: 70px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fab-menu-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 28px;
  padding: 8px 16px 8px 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateY(20px) scale(0.8);
  opacity: 0;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 140px;
  /* 移动端触摸优化 */
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
}

.floating-action-button.expanded .fab-menu-item {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.fab-menu-item:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(0) scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.fab-menu-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 12px;
  flex-shrink: 0;
}

.fab-menu-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .fab-main-button {
    width: 50px;
    height: 50px;
  }
  
  .fab-menu {
    bottom: 65px;
  }
  
  .fab-menu-item {
    padding: 6px 12px 6px 6px;
    min-width: 120px;
  }
  
  .fab-menu-icon {
    width: 36px;
    height: 36px;
  }
  
  .fab-menu-label {
    font-size: 13px;
  }
}
</style>