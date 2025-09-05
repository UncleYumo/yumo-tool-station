<template>
  <div class="mute-time-helper">
    <!-- 动态背景 -->
    <div class="background-animation">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>

    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="main-title">🔇 禁言时长助手</h1>
        <p class="subtitle">智能生成随机禁言时长，支持多种预设模式</p>
      </div>

      <!-- 功能卡片容器 -->
      <div class="cards-container">
        <!-- 预设模式选择卡片 -->
        <div class="card preset-card">
          <div class="card-header">
            <h2>⚙️ 预设模式</h2>
            <p>选择禁言强度等级</p>
          </div>
          <div class="preset-buttons">
            <button 
              v-for="preset in presets" 
              :key="preset.key"
              :class="['preset-btn', { active: currentPreset === preset.key }]"
              @click="selectPreset(preset.key)"
              @touchend.passive="selectPreset(preset.key)"
            >
              <div class="preset-icon">{{ preset.icon }}</div>
              <div class="preset-content">
                <h3>{{ preset.name }}</h3>
                <p>{{ preset.description }}</p>
              </div>
            </button>
          </div>
        </div>

        <!-- 特殊设置卡片 -->
        <div class="card special-card">
          <div class="card-header">
            <h2>🎁 特殊设置</h2>
            <p>专属彩蛋功能</p>
          </div>
          <div class="special-setting">
            <div class="switch-container">
              <label class="switch-label">
                <span class="switch-text">禁言对象是否是青云？</span>
                <div class="switch-wrapper">
                  <input 
                    type="checkbox" 
                    v-model="isQingYun" 
                    class="switch-input"
                  >
                  <span class="switch-slider"></span>
                </div>
              </label>
            </div>
            <div class="switch-description" v-if="isQingYun">
              <div class="bonus-tip">
                <span class="bonus-icon">⚡</span>
                <span>青云加成模式：在基础随机时长上额外增加10%（不超过上限）</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 生成结果卡片 -->
        <div class="card result-card">
          <div class="card-header">
            <h2>🎲 随机结果</h2>
            <p>点击按钮生成禁言时长</p>
          </div>
          <div class="result-content">
            <div class="current-range">
              <span class="range-label">当前范围：</span>
              <span class="range-value">{{ getCurrentRangeText() }}</span>
            </div>
            
            <button 
              class="generate-btn"
              @click="generateMuteTime"
              @touchend.passive="generateMuteTime"
            >
              <span class="btn-icon">🎯</span>
              <span class="btn-text">生成禁言时长</span>
            </button>

            <div v-if="result" class="result-display">
              <div class="result-time">
                <div class="time-segment" v-if="result.days > 0">
                  <span class="time-number">{{ result.days }}</span>
                  <span class="time-unit">天</span>
                </div>
                <div class="time-segment" v-if="result.hours > 0 || result.days > 0">
                  <span class="time-number">{{ result.hours }}</span>
                  <span class="time-unit">小时</span>
                </div>
                <div class="time-segment">
                  <span class="time-number">{{ result.minutes }}</span>
                  <span class="time-unit">分钟</span>
                </div>
              </div>
              
              <div class="result-details">
                <p class="total-minutes">总计：{{ result.totalMinutes }} 分钟</p>
                <p v-if="isQingYun && result.bonusApplied" class="bonus-info">
                  <span class="bonus-badge">青云加成</span>
                  已应用10%额外时长
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 说明文档卡片 -->
        <div class="card info-card">
          <div class="card-header">
            <h2>📚 使用说明</h2>
            <p>功能详细介绍</p>
          </div>
          <div class="info-content">
            <div class="info-section">
              <h3>🎯 基础功能</h3>
              <ul>
                <li><strong>三种预设模式：</strong>小打小闹、罪大恶极、完全随机</li>
                <li><strong>智能范围控制：</strong>自动限制在合理的禁言时长范围内</li>
                <li><strong>精确时间显示：</strong>支持天、小时、分钟的详细展示</li>
              </ul>
            </div>
            
            <div class="info-section">
              <h3>⚡ 青云特殊加成</h3>
              <ul>
                <li><strong>额外时长：</strong>开启后在基础随机时长上增加10%</li>
                <li><strong>上限保护：</strong>加成后不会超过当前模式的最大值</li>
                <li><strong>智能提示：</strong>实时显示是否应用了青云加成效果</li>
              </ul>
            </div>

            <div class="info-section">
              <h3>📱 响应式设计</h3>
              <ul>
                <li><strong>移动端优化：</strong>支持触摸操作，完美适配移动设备</li>
                <li><strong>多屏幕适配：</strong>在桌面端、平板端、手机端均有良好体验</li>
                <li><strong>流畅交互：</strong>采用现代化的玻璃拟态设计风格</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 禁言结果接口
interface MuteResult {
  days: number
  hours: number
  minutes: number
  totalMinutes: number
  bonusApplied: boolean
}

// 预设模式接口
interface PresetMode {
  key: string
  name: string
  description: string
  icon: string
  maxDays: number
  maxHours: number
  maxMinutes: number
}

// 预设模式配置
const presets = ref<PresetMode[]>([
  {
    key: 'light',
    name: '小打小闹',
    description: '10分钟-0分钟',
    icon: '😊',
    maxDays: 0,
    maxHours: 0,
    maxMinutes: 10
  },
  {
    key: 'severe',
    name: '罪大恶极',
    description: '1小时-0分钟',
    icon: '😠',
    maxDays: 0,
    maxHours: 1,
    maxMinutes: 0
  },
  {
    key: 'random',
    name: '完全随机',
    description: '29天:23小时:59分钟-0分钟',
    icon: '🎲',
    maxDays: 29,
    maxHours: 23,
    maxMinutes: 59
  }
])

// 当前选中的预设
const currentPreset = ref<string>('light')

// 青云模式开关
const isQingYun = ref<boolean>(false)

// 生成结果
const result = ref<MuteResult | null>(null)

// 获取当前选中的预设配置
const getCurrentPreset = (): PresetMode => {
  return presets.value.find(p => p.key === currentPreset.value) || presets.value[0]
}

// 获取当前范围文本
const getCurrentRangeText = (): string => {
  const preset = getCurrentPreset()
  let rangeText = ''
  
  if (preset.maxDays > 0) {
    rangeText += `${preset.maxDays}天`
  }
  if (preset.maxHours > 0) {
    if (rangeText) rangeText += ':'
    rangeText += `${preset.maxHours}小时`
  }
  if (preset.maxMinutes > 0) {
    if (rangeText) rangeText += ':'
    rangeText += `${preset.maxMinutes}分钟`
  }
  
  return `${rangeText} - 0分钟`
}

// 选择预设模式
const selectPreset = (presetKey: string): void => {
  currentPreset.value = presetKey
  result.value = null // 清空之前的结果
}

// 生成随机禁言时长
const generateMuteTime = (): void => {
  const preset = getCurrentPreset()
  
  // 计算最大总分钟数
  const maxTotalMinutes = preset.maxDays * 24 * 60 + preset.maxHours * 60 + preset.maxMinutes
  
  // 生成基础随机时长（0到最大值之间）
  let baseTotalMinutes = Math.floor(Math.random() * (maxTotalMinutes + 1))
  
  // 应用青云加成
  let bonusApplied = false
  if (isQingYun.value && baseTotalMinutes > 0) {
    const bonusMinutes = Math.floor(baseTotalMinutes * 0.1)
    const newTotal = baseTotalMinutes + bonusMinutes
    
    // 确保不超过最大值
    if (newTotal <= maxTotalMinutes) {
      baseTotalMinutes = newTotal
      bonusApplied = true
    }
  }
  
  // 转换为天、小时、分钟
  const days = Math.floor(baseTotalMinutes / (24 * 60))
  const remainingAfterDays = baseTotalMinutes % (24 * 60)
  const hours = Math.floor(remainingAfterDays / 60)
  const minutes = remainingAfterDays % 60
  
  result.value = {
    days,
    hours,
    minutes,
    totalMinutes: baseTotalMinutes,
    bonusApplied
  }
}
</script>

<style scoped lang="scss">
// 基础布局
.mute-time-helper {
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow-x: hidden;
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
  animation: float 25s infinite linear;
  
  &.shape-1 {
    width: 80px;
    height: 80px;
    top: 20%;
    left: 10%;
    animation-duration: 20s;
  }
  
  &.shape-2 {
    width: 60px;
    height: 60px;
    top: 60%;
    right: 10%;
    animation-duration: 30s;
    animation-direction: reverse;
  }
  
  &.shape-3 {
    width: 100px;
    height: 100px;
    bottom: 20%;
    left: 20%;
    animation-duration: 25s;
  }
  
  &.shape-4 {
    width: 40px;
    height: 40px;
    top: 40%;
    right: 30%;
    animation-duration: 35s;
    animation-direction: reverse;
  }
}

@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.3;
  }
  100% {
    transform: translateY(0px) rotate(360deg);
    opacity: 0.7;
  }
}

// 主容器
.container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

// 页面标题
.page-header {
  text-align: center;
  margin-bottom: 40px;
  
  .main-title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: white;
    margin: 0 0 10px 0;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    animation: slideInDown 0.8s ease-out;
  }
  
  .subtitle {
    font-size: clamp(1rem, 3vw, 1.2rem);
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    animation: slideInUp 0.8s ease-out 0.2s both;
  }
}

// 卡片容器
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

// 基础卡片样式
.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
}

.card-header {
  margin-bottom: 25px;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin: 0 0 8px 0;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    font-size: 0.95rem;
  }
}

// 预设按钮
.preset-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.preset-btn {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateX(5px);
    
    &::before {
      left: 100%;
    }
  }
  
  &.active {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15));
    border: 2px solid rgba(255, 255, 255, 0.6);
    box-shadow: 
      0 0 30px rgba(255, 255, 255, 0.3),
      0 8px 25px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    transform: translateX(8px) scale(1.02);
    
    .preset-icon {
      transform: scale(1.1);
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
    
    .preset-content h3 {
      color: #FFE082;
      text-shadow: 0 2px 8px rgba(255, 224, 130, 0.3);
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid #FFE082;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      animation: pulse 2s infinite;
    }
  }
  
  .preset-icon {
    font-size: 2rem;
    min-width: 50px;
    text-align: center;
    transition: all 0.3s ease;
  }
  
  .preset-content {
    flex: 1;
    
    h3 {
      margin: 0 0 5px 0;
      font-size: 1.1rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    p {
      margin: 0;
      font-size: 0.9rem;
      opacity: 0.8;
      transition: all 0.3s ease;
    }
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
  50% {
    opacity: 0.6;
    transform: translateY(-50%) scale(1.1);
  }
}

// 特殊设置
.switch-container {
  margin-bottom: 15px;
}

.switch-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  
  .switch-text {
    color: white;
    font-size: 1.1rem;
    font-weight: 500;
  }
  
  .switch-wrapper {
    position: relative;
  }
}

.switch-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  
  &:checked + .switch-slider {
    background: linear-gradient(45deg, #4CAF50, #8BC34A);
    
    &::before {
      transform: translateX(26px);
    }
  }
}

.switch-slider {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}

.switch-description {
  .bonus-tip {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px;
    background: rgba(76, 175, 80, 0.2);
    border: 1px solid rgba(76, 175, 80, 0.3);
    border-radius: 10px;
    color: white;
    
    .bonus-icon {
      font-size: 1.2rem;
    }
  }
}

// 生成按钮和结果
.current-range {
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  text-align: center;
  
  .range-label {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
  }
  
  .range-value {
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
  }
}

.generate-btn {
  width: 100%;
  padding: 20px;
  background: linear-gradient(45deg, #FF6B6B, #FF8E53);
  border: none;
  border-radius: 15px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.6);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  .btn-icon {
    font-size: 1.3rem;
  }
}

.result-display {
  margin-top: 25px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  text-align: center;
  animation: resultSlideIn 0.5s ease-out;
}

.result-time {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.time-segment {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  
  .time-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #FFE082;
    text-shadow: 0 2px 10px rgba(255, 224, 130, 0.5);
  }
  
  .time-unit {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
  }
}

.result-details {
  .total-minutes {
    color: rgba(255, 255, 255, 0.9);
    margin: 0 0 10px 0;
    font-size: 1rem;
  }
  
  .bonus-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 0;
    
    .bonus-badge {
      background: rgba(76, 175, 80, 0.3);
      border: 1px solid rgba(76, 175, 80, 0.5);
      padding: 4px 12px;
      border-radius: 15px;
      font-size: 0.85rem;
      font-weight: 600;
      color: #A5D6A7;
    }
  }
}

// 说明文档
.info-content {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.info-section {
  margin-bottom: 25px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  h3 {
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0 0 15px 0;
  }
  
  ul {
    padding-left: 20px;
    margin: 0;
    
    li {
      margin-bottom: 8px;
      
      strong {
        color: #FFE082;
      }
    }
  }
}

// 动画
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes resultSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }
  
  .cards-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .card {
    padding: 20px;
  }
  
  .preset-btn {
    padding: 15px;
    
    .preset-icon {
      font-size: 1.5rem;
      min-width: 40px;
    }
    
    .preset-content {
      h3 {
        font-size: 1rem;
      }
      
      p {
        font-size: 0.85rem;
      }
    }
  }
  
  .result-time {
    gap: 15px;
    
    .time-segment .time-number {
      font-size: 2rem;
    }
  }
}

@media (max-width: 480px) {
  .page-header {
    margin-bottom: 30px;
  }
  
  .cards-container {
    gap: 15px;
  }
  
  .card {
    padding: 15px;
  }
  
  .preset-btn {
    padding: 12px;
    gap: 10px;
  }
  
  .generate-btn {
    padding: 15px;
    font-size: 1rem;
  }
  
  .result-time {
    gap: 10px;
    
    .time-segment .time-number {
      font-size: 1.8rem;
    }
  }
}
</style>