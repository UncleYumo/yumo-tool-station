<template>
  <div class="main-container">
    <!-- 动态背景 -->
    <div class="background-animation">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>

    <div class="main-content-wrapper">
      <div class="main-header">
        <div class="main-header-title">羽沫 AI 工具站</div>
        <div class="main-header-subtitle">现代前端技术演示平台</div>
      </div>

      <!-- 搜索功能区 -->
      <div class="search-section">
        <div class="search-container">
          <div class="search-input-wrapper">
            <svg class="search-icon" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="搜索演示项目..."
              class="search-input"
              @input="onSearch"
            />
            <button 
              v-if="searchQuery" 
              @click="resetSearch" 
              class="clear-btn"
              @touchend.passive="resetSearch"
            >
              <svg viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
          <div class="search-stats" v-if="searchQuery">
            找到 {{ filteredDemos.length }} 个匹配的演示项目
          </div>
        </div>
      </div>

      <!-- 演示项目网格 -->
      <div class="demos-grid">
        <div 
          v-for="(demo, index) in filteredDemos" 
          :key="demo.title"
          class="demo-card"
          :style="{ animationDelay: `${index * 100}ms` }"
          @click="navigateTo(demo.path)"
        >
          <div class="demo-card-content">
            <h3 class="demo-title">{{ demo.title }}</h3>
            <p class="demo-description">{{ demo.description }}</p>
            <div class="demo-tags">
              <span v-for="tag in demo.tags" :key="tag" class="demo-tag">{{ tag }}</span>
            </div>
            <div class="demo-action">
              <span>点击体验</span>
              <svg class="arrow-icon" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- 无结果提示 -->
      <div v-if="searchQuery && filteredDemos.length === 0" class="no-results">
        <svg class="no-results-icon" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <h3>未找到匹配的演示项目</h3>
        <p>试试其他关键词，或者点击重置查看全部项目</p>
        <button @click="resetSearch" class="reset-btn">重置搜索</button>
      </div>

      <div class="main-footer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Demo {
  title: string
  description: string
  path: string
  tags: string[]
}

// 搜索相关状态
const searchQuery = ref('')

// 演示项目数据
const demos = ref<Demo[]>([
  {
    title: '响应式布局案例',
    description: '演示现代CSS Grid和Flexbox技术实现的响应式网格布局，适配不同屏幕尺寸，展示最佳的移动端和桌面端用户体验。',
    path: '/responsive-layout',
    tags: ['CSS Grid', 'Flexbox', '响应式']
  },
  {
    title: '瀑布流布局案例',
    description: 'Pinterest风格的瀑布流布局实现，包含动态添加内容、自适应列数、平滑动画过渡等特性，展示高性能的布局算法。',
    path: '/waterfall-layout',
    tags: ['瀑布流', '动态布局', '动画']
  },
  {
    title: 'Box-Shadow样式案例',
    description: '详细演示CSS3 box-shadow属性的各种参数效果，包括偏移、模糊、扩展、颜色等完整的阴影效果展示。',
    path: '/box-shadow-style',
    tags: ['CSS3', 'Box-Shadow', '阴影效果']
  },
  {
    title: '浏览器导航综合案例',
    description: '模拟浏览器导航栏，包括前进、后退、刷新及其相关API。',
    path: '/browser-navigation',
    tags: ['浏览器API', '导航', 'History API']
  },
  {
    title: '加密算法原理与实现',
    description: '简单实现对称加密与非对称加密（RSA算法）。',
    path: '/common-cryptography',
    tags: ['加密算法', 'RSA', '安全']
  },
  {
    title: 'Vue Router 案例',
    description: 'Vue Router 示例，包含基础用法、模块化、持久化存储、异步操作',
    path: '/vue-router-case',
    tags: ['Vue Router', '路由', '状态管理']
  }
])

// 搜索过滤逻辑
const filteredDemos = computed(() => {
  if (!searchQuery.value.trim()) {
    return demos.value
  }
  
  const query = searchQuery.value.toLowerCase().trim()
  return demos.value.filter(demo => 
    demo.title.toLowerCase().includes(query) ||
    demo.description.toLowerCase().includes(query) ||
    demo.tags.some(tag => tag.toLowerCase().includes(query))
  )
})

// 搜索处理
const onSearch = () => {
  // 搜索逻辑已通过 computed 自动处理
}

// 重置搜索
const resetSearch = () => {
  searchQuery.value = ''
}

// 导航处理
const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<style scoped lang="scss">
// 基础布局
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

// 动态背景
.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.floating-shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 20s infinite linear;
  
  &.shape-1 {
    width: 200px;
    height: 200px;
    top: 10%;
    left: 10%;
    animation-delay: -5s;
  }
  
  &.shape-2 {
    width: 300px;
    height: 300px;
    top: 60%;
    right: 10%;
    animation-delay: -10s;
  }
  
  &.shape-3 {
    width: 150px;
    height: 150px;
    bottom: 20%;
    left: 30%;
    animation-delay: -15s;
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-30px) rotate(120deg); }
  66% { transform: translateY(15px) rotate(240deg); }
}

// 主内容区域
.main-content-wrapper {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  max-width: 1400px;
  width: calc(100% - 40px);
  margin: 20px auto;
  min-height: calc(100vh - 40px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
  padding: clamp(20px, 4vw, 40px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

// 头部区域
.main-header {
  text-align: center;
  padding: clamp(30px, 6vw, 60px) 0;
  
  .main-header-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0 0 10px 0;
    letter-spacing: -0.02em;
  }
  
  .main-header-subtitle {
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    color: #666;
    font-weight: 400;
  }
}

// 搜索功能区域
.search-section {
  margin-bottom: clamp(30px, 5vw, 50px);
}

.search-container {
  max-width: 600px;
  margin: 0 auto;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 25px;
  padding: 15px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: #667eea;
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
  }
}

.search-icon {
  width: 20px;
  height: 20px;
  fill: #999;
  margin-right: 12px;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  background: transparent;
  
  &::placeholder {
    color: #999;
  }
}

.clear-btn {
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  svg {
    width: 18px;
    height: 18px;
    fill: #999;
  }
  
  &:hover {
    background: #f5f5f5;
    
    svg {
      fill: #666;
    }
  }
}

.search-stats {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  color: #666;
}

// 演示项目网格
.demos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: clamp(20px, 3vw, 30px);
  margin-bottom: 40px;
}

.demo-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  animation: slideInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #667eea, transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 60px rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.3);
    
    &::before {
      left: 100%;
    }
    
    .demo-action {
      transform: translateX(5px);
      color: #667eea;
    }
  }
  
  &:active {
    transform: translateY(-4px) scale(1.01);
  }
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.demo-card-content {
  position: relative;
  z-index: 1;
}

.demo-title {
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
  line-height: 1.3;
}

.demo-description {
  color: #666;
  line-height: 1.6;
  margin: 0 0 20px 0;
  font-size: clamp(0.9rem, 2vw, 1rem);
}

.demo-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.demo-tag {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.demo-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #999;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.arrow-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
  transition: transform 0.3s ease;
}

// 无结果提示
.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.no-results-icon {
  width: 80px;
  height: 80px;
  fill: #ddd;
  margin-bottom: 20px;
}

.no-results h3 {
  font-size: 1.2rem;
  margin: 0 0 10px 0;
  color: #333;
}

.no-results p {
  margin: 0 0 30px 0;
  line-height: 1.6;
}

.reset-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
}

// 响应式适配
@media (max-width: 768px) {
  .demos-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .main-content-wrapper {
    width: calc(100% - 20px);
    margin: 10px auto;
    padding: 20px;
    border-radius: 15px;
  }
  
  .search-input-wrapper {
    padding: 12px 16px;
  }
  
  .demo-card {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .demos-grid {
    gap: 15px;
  }
  
  .main-content-wrapper {
    width: calc(100% - 10px);
    margin: 5px auto;
    padding: 15px;
  }
  
  .demo-card {
    padding: 16px;
  }
}

.main-footer {
  height: 40px;
}
</style>