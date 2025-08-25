<template>
  <div class="box-shadow-demo">
    <h1>📦 CSS Box-Shadow 参数详解与演示</h1>
    
    <div class="demo-container">
      <!-- 原始效果 -->
      <div class="demo-item">
        <h3>🎯 你的原始代码效果</h3>
        <div class="code">box-shadow: 10px 10px 20px rgba(255, 207, 85, 0.5);</div>
        <div class="demo-box original">原始</div>
        <p>右下方向的金黄色柔和阴影</p>
      </div>
    </div>
    
    <h2>1️⃣ 水平偏移 (offset-x) 效果</h2>
    <div class="demo-container">
      <div class="demo-item">
        <h3>正值 - 向右偏移</h3>
        <div class="code">box-shadow: 20px 0px 10px rgba(0, 0, 0, 0.3);</div>
        <div class="demo-box offset-x-positive">+20px</div>
        <p>阴影向右偏移20px</p>
      </div>
      
      <div class="demo-item">
        <h3>负值 - 向左偏移</h3>
        <div class="code">box-shadow: -20px 0px 10px rgba(0, 0, 0, 0.3);</div>
        <div class="demo-box offset-x-negative">-20px</div>
        <p>阴影向左偏移20px</p>
      </div>
      
      <div class="demo-item">
        <h3>零值 - 不偏移</h3>
        <div class="code">box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);</div>
        <div class="demo-box offset-x-zero">0px</div>
        <p>阴影在水平方向不偏移</p>
      </div>
    </div>
    
    <h2>2️⃣ 垂直偏移 (offset-y) 效果</h2>
    <div class="demo-container">
      <div class="demo-item">
        <h3>正值 - 向下偏移</h3>
        <div class="code">box-shadow: 0px 20px 10px rgba(0, 0, 0, 0.3);</div>
        <div class="demo-box offset-y-positive">+20px</div>
        <p>阴影向下偏移20px</p>
      </div>
      
      <div class="demo-item">
        <h3>负值 - 向上偏移</h3>
        <div class="code">box-shadow: 0px -20px 10px rgba(0, 0, 0, 0.3);</div>
        <div class="demo-box offset-y-negative">-20px</div>
        <p>阴影向上偏移20px</p>
      </div>
    </div>
    
    <h2>3️⃣ 模糊半径 (blur-radius) 效果</h2>
    <div class="demo-container">
      <div class="demo-item">
        <h3>无模糊</h3>
        <div class="code">box-shadow: 10px 10px 0px rgba(0, 0, 0, 0.8);</div>
        <div class="demo-box blur-zero">0px</div>
        <p>阴影边缘清晰锐利</p>
      </div>
      
      <div class="demo-item">
        <h3>轻度模糊</h3>
        <div class="code">box-shadow: 10px 10px 2px rgba(0, 0, 0, 0.5);</div>
        <div class="demo-box blur-small">2px</div>
        <p>轻微的模糊效果</p>
      </div>
      
      <div class="demo-item">
        <h3>中度模糊</h3>
        <div class="code">box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.5);</div>
        <div class="demo-box blur-medium">15px</div>
        <p>适中的柔和模糊</p>
      </div>
      
      <div class="demo-item">
        <h3>重度模糊</h3>
        <div class="code">box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.5);</div>
        <div class="demo-box blur-large">30px</div>
        <p>很柔和的扩散阴影</p>
      </div>
    </div>
    
    <h2>4️⃣ 扩展半径 (spread-radius) 效果</h2>
    <div class="demo-container">
      <div class="demo-item">
        <h3>正值 - 扩大阴影</h3>
        <div class="code">box-shadow: 10px 10px 10px 5px rgba(255, 0, 0, 0.3);</div>
        <div class="demo-box spread-positive">+5px</div>
        <p>阴影比元素大5px</p>
      </div>
      
      <div class="demo-item">
        <h3>负值 - 缩小阴影</h3>
        <div class="code">box-shadow: 10px 10px 10px -5px rgba(255, 0, 0, 0.3);</div>
        <div class="demo-box spread-negative">-5px</div>
        <p>阴影比元素小5px</p>
      </div>
    </div>
    
    <h2>5️⃣ 颜色和透明度效果</h2>
    <div class="demo-container">
      <div class="demo-item">
        <h3>红色阴影</h3>
        <div class="code">box-shadow: 10px 10px 15px rgba(255, 0, 0, 0.5);</div>
        <div class="demo-box color-red">红色</div>
        <p>50%透明的红色阴影</p>
      </div>
      
      <div class="demo-item">
        <h3>蓝色阴影</h3>
        <div class="code">box-shadow: 10px 10px 15px rgba(0, 100, 255, 0.5);</div>
        <div class="demo-box color-blue">蓝色</div>
        <p>50%透明的蓝色阴影</p>
      </div>
      
      <div class="demo-item">
        <h3>高透明度</h3>
        <div class="code">box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.1);</div>
        <div class="demo-box color-transparent">10%</div>
        <p>90%透明的淡阴影</p>
      </div>
      
      <div class="demo-item">
        <h3>低透明度</h3>
        <div class="code">box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.8);</div>
        <div class="demo-box color-opaque">80%</div>
        <p>20%透明的深阴影</p>
      </div>
    </div>
    
    <h2>6️⃣ 特殊效果</h2>
    <div class="demo-container">
      <div class="demo-item">
        <h3>内阴影</h3>
        <div class="code">box-shadow: inset 10px 10px 20px rgba(0, 0, 0, 0.3);</div>
        <div class="demo-box inset-shadow">内阴影</div>
        <p>阴影在元素内部</p>
      </div>
      
      <div class="demo-item">
        <h3>多重阴影</h3>
        <div class="code">
          box-shadow: <br>
          &nbsp;&nbsp;5px 5px 10px rgba(255, 0, 0, 0.3),<br>
          &nbsp;&nbsp;-5px -5px 10px rgba(0, 255, 0, 0.3),<br>
          &nbsp;&nbsp;0px 0px 20px rgba(0, 0, 255, 0.2);
        </div>
        <div class="demo-box multiple-shadows">多重</div>
        <p>同时应用多个阴影效果</p>
      </div>
    </div>
    
    <h2>📝 总结</h2>
    <div class="summary">
      <h3>完整语法：</h3>
      <div class="code syntax-code">
        box-shadow: [inset] offset-x offset-y [blur-radius] [spread-radius] color;
      </div>
      
      <ul class="param-list">
        <li><strong>inset</strong>：可选，创建内阴影</li>
        <li><strong>offset-x</strong>：水平偏移，正值向右，负值向左</li>
        <li><strong>offset-y</strong>：垂直偏移，正值向下，负值向上</li>
        <li><strong>blur-radius</strong>：可选，模糊半径，值越大越模糊</li>
        <li><strong>spread-radius</strong>：可选，扩展半径，正值放大阴影，负值缩小</li>
        <li><strong>color</strong>：阴影颜色，支持各种颜色格式</li>
      </ul>
      
      <h3>常用场景：</h3>
      <ul class="use-cases">
        <li><strong>卡片效果</strong>：<code>box-shadow: 0 2px 8px rgba(0,0,0,0.1);</code></li>
        <li><strong>悬停效果</strong>：<code>box-shadow: 0 4px 16px rgba(0,0,0,0.15);</code></li>
        <li><strong>立体按钮</strong>：<code>box-shadow: 0 4px 8px rgba(0,0,0,0.2);</code></li>
        <li><strong>发光效果</strong>：<code>box-shadow: 0 0 20px rgba(255,255,0,0.6);</code></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// Box Shadow 演示组件
</script>

<style lang="scss" scoped>
.box-shadow-demo {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
  
  .demo-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin: 20px 0;
  }
  
  .demo-item {
    background: white;
    padding: 30px;
    border-radius: 8px;
    text-align: center;
  }
  
  .demo-box {
    width: 120px;
    height: 120px;
    background: #4CAF50;
    margin: 20px auto;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
  }
  
  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
  }
  
  h2 {
    color: #555;
    border-bottom: 2px solid #ddd;
    padding-bottom: 10px;
  }
  
  .code {
    background: #f8f9fa;
    padding: 10px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    margin: 10px 0;
    font-size: 14px;
  }
  
  .syntax-code {
    font-size: 16px;
    margin: 15px 0;
  }
  
  /* 原始效果 */
  .original {
    box-shadow: 10px 10px 20px rgba(255, 207, 85, 0.5);
  }
  
  /* 水平偏移演示 */
  .offset-x-positive {
    box-shadow: 20px 0px 10px rgba(0, 0, 0, 0.3);
  }
  
  .offset-x-negative {
    box-shadow: -20px 0px 10px rgba(0, 0, 0, 0.3);
  }
  
  .offset-x-zero {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
  
  /* 垂直偏移演示 */
  .offset-y-positive {
    box-shadow: 0px 20px 10px rgba(0, 0, 0, 0.3);
  }
  
  .offset-y-negative {
    box-shadow: 0px -20px 10px rgba(0, 0, 0, 0.3);
  }
  
  /* 模糊半径演示 */
  .blur-small {
    box-shadow: 10px 10px 2px rgba(0, 0, 0, 0.5);
  }
  
  .blur-medium {
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.5);
  }
  
  .blur-large {
    box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.5);
  }
  
  .blur-zero {
    box-shadow: 10px 10px 0px rgba(0, 0, 0, 0.8);
  }
  
  /* 扩展半径演示 */
  .spread-positive {
    box-shadow: 10px 10px 10px 5px rgba(255, 0, 0, 0.3);
  }
  
  .spread-negative {
    box-shadow: 10px 10px 10px -5px rgba(255, 0, 0, 0.3);
  }
  
  /* 颜色演示 */
  .color-red {
    box-shadow: 10px 10px 15px rgba(255, 0, 0, 0.5);
  }
  
  .color-blue {
    box-shadow: 10px 10px 15px rgba(0, 100, 255, 0.5);
  }
  
  .color-transparent {
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .color-opaque {
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.8);
  }
  
  /* 内阴影演示 */
  .inset-shadow {
    box-shadow: inset 10px 10px 20px rgba(0, 0, 0, 0.3);
  }
  
  /* 多重阴影 */
  .multiple-shadows {
    box-shadow: 
      5px 5px 10px rgba(255, 0, 0, 0.3),
      -5px -5px 10px rgba(0, 255, 0, 0.3),
      0px 0px 20px rgba(0, 0, 255, 0.2);
  }
  
  .summary {
    background: white;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
    
    .param-list {
      margin: 20px 0;
      line-height: 1.6;
    }
    
    .use-cases {
      line-height: 1.6;
      
      code {
        background: #f8f9fa;
        padding: 2px 4px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
      }
    }
  }
}
</style>