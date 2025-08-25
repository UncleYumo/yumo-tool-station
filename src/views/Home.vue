<template>

  <div class="main-container">

    <div class="main-content-wrapper">

      <div class="main-header">
        <div class="main-header-title">羽沫工具站</div>
      </div>

      <div class="demo-main" v-for="demo in demos" :key="demo.title">
        <div class="demo-item" @click="navigateTo(demo.path)">
          <h4>{{ demo.title }}</h4>
          <span>{{ demo.description }}</span>
        </div>
      </div>

      <div class="main-footer">

      </div>
    </div>


  </div>


</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Demo {
  title: string
  description: string
  path: string
}

const demos = ref<Demo[]>([
  {
    title: '响应式布局案例',
    description: '演示现代CSS Grid和Flexbox技术实现的响应式网格布局，适配不同屏幕尺寸，展示最佳的移动端和桌面端用户体验。',
    path: '/responsive-layout',
  },
  {
    title: '瀑布流布局案例',
    description: 'Pinterest风格的瀑布流布局实现，包含动态添加内容、自适应列数、平滑动画过渡等特性，展示高性能的布局算法。',
    path: '/waterfall-layout',
  },
  {
    title: 'Box-Shadow样式案例',
    description: '详细演示CSS3 box-shadow属性的各种参数效果，包括偏移、模糊、扩展、颜色等完整的阴影效果展示。',
    path: '/box-shadow-style',
  },
  {
    title: '浏览器导航综合案例',
    description: '模拟浏览器导航栏，包括前进、后退、刷新及其相关API。',
    path: '/browser-navigation',
  }
])

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  background-color: #000000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Ccircle stroke='%23D60' vector-effect='non-scaling-stroke' id='a' fill='none' stroke-width='5' r='315'/%3E%3Cuse id='f' href='%23a' stroke-dasharray='100 100 100 9999'/%3E%3Cuse id='b' href='%23a' stroke-dasharray='250 250 250 250 250 9999'/%3E%3Cuse id='e' href='%23a' stroke-dasharray='1000 500 1000 500 9999'/%3E%3Cuse id='g' href='%23a' stroke-dasharray='1500 9999'/%3E%3Cuse id='h' href='%23a' stroke-dasharray='2000 500 500 9999'/%3E%3Cuse id='j' href='%23a' stroke-dasharray='800 800 800 800 800 9999'/%3E%3Cuse id='k' href='%23a' stroke-dasharray='1200 1200 1200 1200 1200 9999'/%3E%3Cuse id='l' href='%23a' stroke-dasharray='1600 1600 1600 1600 1600 9999'/%3E%3C/defs%3E%3Cg transform='translate(1000 750)' %3E%3Cg transform='rotate(0 0 0)' %3E%3Ccircle fill='%23D60' r='10'/%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23f' transform='scale(.1) rotate(50 0 0)' /%3E%3Cuse href='%23f' transform='scale(.2) rotate(100 0 0)' /%3E%3Cuse href='%23f' transform='scale(.3) rotate(150 0 0)' /%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23b' transform='scale(.4) rotate(200 0 0)' /%3E%3Cuse href='%23z' transform='scale(.5) rotate(250 0 0)' /%3E%3C/g%3E%3Cg id='z' transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23b'/%3E%3Cuse href='%23b' transform='scale(1.2) rotate(90 0 0)' /%3E%3Cuse href='%23b' transform='scale(1.4) rotate(60 0 0)' /%3E%3Cuse href='%23e' transform='scale(1.6) rotate(120 0 0)' /%3E%3Cuse href='%23e' transform='scale(1.8) rotate(30 0 0)' /%3E%3C/g%3E%3C/g%3E%3Cg id='y' transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23e' transform='scale(1.1) rotate(20 0 0)' /%3E%3Cuse href='%23g' transform='scale(1.3) rotate(-40 0 0)' /%3E%3Cuse href='%23g' transform='scale(1.5) rotate(60 0 0)' /%3E%3Cuse href='%23h' transform='scale(1.7) rotate(-80 0 0)' /%3E%3Cuse href='%23j' transform='scale(1.9) rotate(100 0 0)' /%3E%3C/g%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23h' transform='scale(2) rotate(60 0 0)'/%3E%3Cuse href='%23j' transform='scale(2.1) rotate(120 0 0)'/%3E%3Cuse href='%23j' transform='scale(2.3) rotate(180 0 0)'/%3E%3Cuse href='%23h' transform='scale(2.4) rotate(240 0 0)'/%3E%3Cuse href='%23j' transform='scale(2.5) rotate(300 0 0)'/%3E%3C/g%3E%3Cuse href='%23y' transform='scale(2) rotate(180 0 0)' /%3E%3Cuse href='%23j' transform='scale(2.7)'/%3E%3Cuse href='%23j' transform='scale(2.8) rotate(45 0 0)'/%3E%3Cuse href='%23j' transform='scale(2.9) rotate(90 0 0)'/%3E%3Cuse href='%23k' transform='scale(3.1) rotate(135 0 0)'/%3E%3Cuse href='%23k' transform='scale(3.2) rotate(180 0 0)'/%3E%3C/g%3E%3Cuse href='%23k' transform='scale(3.3) rotate(225 0 0)'/%3E%3Cuse href='%23k' transform='scale(3.5) rotate(270 0 0)'/%3E%3Cuse href='%23k' transform='scale(3.6) rotate(315 0 0)'/%3E%3Cuse href='%23k' transform='scale(3.7)'/%3E%3Cuse href='%23k' transform='scale(3.9) rotate(75 0 0)'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;

}

.main-content-wrapper {
  background: #ffffff;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  box-shadow: 0px 0px 16px rgba(255, 255, 255, 0.5);
  padding: 20px;
}

.main-header {
  text-align: center;
  padding: 40px 0;
  
  .main-header-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    margin: 0;
  }
}

.demo-main {
  margin: 20px 0;
  
  .demo-item {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    
    &:hover {
      background: #e9ecef;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-color: #007bff;
    }
    
    &:active {
      transform: translateY(0);
    }
    
    h4 {
      margin: 0 0 10px 0;
      color: #333;
      font-size: 1.2rem;
    }
    
    span {
      color: #666;
      line-height: 1.5;
      display: block;
    }
  }
}

.main-footer {
  height: 60px;
}
</style>