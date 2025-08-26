<template>
    <div class="common-cryptography-container">
        <!-- 页面头部 -->
        <header class="page-header">
            <h1 class="page-title">
                <i class="icon-shield">🔐</i>
                常见加密算法实现
            </h1>
            <p class="page-description">探索现代密码学的核心算法原理与实践</p>
        </header>

        <!-- 算法选择标签页 -->
        <nav class="algorithm-tabs">
            <button 
                class="tab-button" 
                :class="{ active: activeTab === 'asymmetric' }"
                @click="activeTab = 'asymmetric'"
            >
                <i class="tab-icon">🔑</i>
                非对称加密 (RSA)
            </button>
            <button 
                class="tab-button" 
                :class="{ active: activeTab === 'symmetric' }"
                @click="activeTab = 'symmetric'"
            >
                <i class="tab-icon">🔒</i>
                对称加密
            </button>
        </nav>

        <!-- 非对称加密(RSA)部分 -->
        <section v-show="activeTab === 'asymmetric'" class="algorithm-section">
            <div class="section-header">
                <h2 class="section-title">RSA非对称加密算法</h2>
                <p class="section-description">基于大整数因式分解困难问题的公钥加密算法</p>
            </div>

            <!-- 算法步骤 -->
            <div class="steps-container">
                <!-- 步骤1: 质数选择 -->
                <div class="step-card">
                    <div class="step-header">
                        <span class="step-number">1</span>
                        <h3 class="step-title">选择两个质数 P 和 Q</h3>
                    </div>
                    <div class="step-content">
                        <div class="info-box">
                            <label class="info-label">可选质数列表 (2-100):</label>
                            <div class="prime-list">
                                {{ num_prime_list }}
                            </div>
                        </div>
                        <div class="input-group">
                            <div class="input-field">
                                <label for="input-p">质数 P:</label>
                                <input 
                                    id="input-p"
                                    type="number" 
                                    v-model.number="num_P" 
                                    class="number-input"
                                    min="2"
                                    max="100"
                                />
                            </div>
                            <div class="input-field">
                                <label for="input-q">质数 Q:</label>
                                <input 
                                    id="input-q"
                                    type="number" 
                                    v-model.number="num_Q" 
                                    class="number-input"
                                    min="2"
                                    max="100"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 步骤2: 计算模数N -->
                <div class="step-card">
                    <div class="step-header">
                        <span class="step-number">2</span>
                        <h3 class="step-title">计算模数 N = P × Q</h3>
                    </div>
                    <div class="step-content">
                        <div class="calculation-display">
                            <div class="formula">N = {{ num_P }} × {{ num_Q }} = {{ num_N }}</div>
                        </div>
                        <div class="result-field">
                            <label>模数 N:</label>
                            <input type="text" :value="num_N" readonly class="result-input" />
                        </div>
                    </div>
                </div>

                <!-- 步骤3: 计算欧拉函数 -->
                <div class="step-card">
                    <div class="step-header">
                        <span class="step-number">3</span>
                        <h3 class="step-title">计算欧拉函数 φ(N)</h3>
                    </div>
                    <div class="step-content">
                        <div class="calculation-display">
                            <div class="formula">φ(N) = (P-1) × (Q-1) = {{ num_P - 1 }} × {{ num_Q - 1 }} = {{ num_φN }}</div>
                        </div>
                        <div class="result-field">
                            <label>φ(N):</label>
                            <input type="text" :value="num_φN" readonly class="result-input" />
                        </div>
                    </div>
                </div>

                <!-- 步骤4: 选择公钥指数e -->
                <div class="step-card">
                    <div class="step-header">
                        <span class="step-number">4</span>
                        <h3 class="step-title">选择公钥指数 e</h3>
                    </div>
                    <div class="step-content">
                        <div class="info-box">
                            <label class="info-label">与 φ(N) 互质的数 e:</label>
                            <div class="available-e-list">
                                {{ num_E_List }}
                            </div>
                        </div>
                        <div class="input-field">
                            <label for="input-e">选择 e:</label>
                            <input 
                                id="input-e"
                                type="number" 
                                v-model.number="num_E" 
                                class="number-input"
                                min="2"
                            />
                        </div>
                        <div class="key-display public-key">
                            <span class="key-label">公钥:</span>
                            <span class="key-value">({{ num_E }}, {{ num_N }})</span>
                        </div>
                    </div>
                </div>

                <!-- 步骤5: 计算私钥d -->
                <div class="step-card">
                    <div class="step-header">
                        <span class="step-number">5</span>
                        <h3 class="step-title">计算私钥指数 d</h3>
                    </div>
                    <div class="step-content">
                        <div class="info-box">
                            <label class="info-label">满足条件 (e × d - 1) % φ(N) = 0 的 d 值:</label>
                            <div class="available-d-list">
                                {{ num_D_List }}
                            </div>
                        </div>
                        <div class="input-field">
                            <label for="input-d">选择 d:</label>
                            <input 
                                id="input-d"
                                type="number" 
                                v-model.number="num_D" 
                                class="number-input"
                                min="1"
                            />
                        </div>
                        <div class="key-display private-key">
                            <span class="key-label">私钥:</span>
                            <span class="key-value">({{ num_D }}, {{ num_N }})</span>
                        </div>
                    </div>
                </div>

                <!-- 步骤6: 加密解密演示 -->
                <div class="step-card">
                    <div class="step-header">
                        <span class="step-number">6</span>
                        <h3 class="step-title">加密与解密演示</h3>
                    </div>
                    <div class="step-content">
                        <div class="encrypt-decrypt-container">
                            <div class="input-field">
                                <label for="input-plaintext">原始数据 (须小于 {{ num_N }}):</label>
                                <input 
                                    id="input-plaintext"
                                    type="number" 
                                    v-model.number="num_code_raw" 
                                    class="number-input"
                                    :max="num_N - 1"
                                    min="1"
                                />
                            </div>
                            
                            <div class="process-flow">
                                <div class="flow-item">
                                    <div class="flow-label">加密过程</div>
                                    <div class="flow-formula">C = M^e mod N = {{ num_code_raw }}^{{ num_E }} mod {{ num_N }}</div>
                                    <div class="flow-result encrypted">
                                        <label>密文:</label>
                                        <span class="result-value">{{ num_code_encrypted }}</span>
                                    </div>
                                </div>
                                
                                <div class="flow-arrow">↓</div>
                                
                                <div class="flow-item">
                                    <div class="flow-label">解密过程</div>
                                    <div class="flow-formula">M = C^d mod N = {{ num_code_encrypted }}^{{ num_D }} mod {{ num_N }}</div>
                                    <div class="flow-result decrypted">
                                        <label>解密结果:</label>
                                        <span class="result-value">{{ num_code_decrypted }}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="verification-status">
                                <div class="status" :class="{ success: isEncryptionValid, error: !isEncryptionValid }">
                                    <i class="status-icon">{{ isEncryptionValid ? '✓' : '✗' }}</i>
                                    <span>{{ isEncryptionValid ? '加密解密成功！' : '加密解密失败，请检查参数' }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 对称加密部分 -->
        <section v-show="activeTab === 'symmetric'" class="algorithm-section">
            <div class="section-header">
                <h2 class="section-title">对称加密算法</h2>
                <p class="section-description">使用相同密钥进行加密和解密的高效加密方式</p>
            </div>

            <div class="coming-soon-container">
                <div class="coming-soon-card">
                    <div class="coming-soon-icon">🚧</div>
                    <h3 class="coming-soon-title">功能开发中</h3>
                    <p class="coming-soon-description">
                        对称加密模块正在积极开发中，将包含以下算法：
                    </p>
                    <ul class="feature-list">
                        <li><strong>AES</strong> - 高级加密标准</li>
                        <li><strong>DES/3DES</strong> - 数据加密标准</li>
                        <li><strong>ChaCha20</strong> - 现代流密码</li>
                        <li><strong>RC4</strong> - 经典流密码</li>
                    </ul>
                    <div class="coming-soon-footer">
                        <span class="coming-soon-badge">敬请期待</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

// ========== 响应式数据 ==========
// 当前激活的标签页
const activeTab = ref<'asymmetric' | 'symmetric'>('asymmetric');

// RSA算法相关参数
const num_P = ref<number>(5);  // 第一个质数
const num_Q = ref<number>(11); // 第二个质数
const num_E = ref<number>(7);  // 公钥指数
const num_D = ref<number>(0);  // 私钥指数，自动计算
const num_code_raw = ref<number>(42); // 原始数据

// ========== 计算属性 ==========
// 模数 N = P * Q
const num_N = computed(() => num_P.value * num_Q.value);

// 欧拉函数 φ(N) = (P-1) * (Q-1)
const num_φN = computed(() => (num_P.value - 1) * (num_Q.value - 1));

// 加密后的密文
const num_code_encrypted = computed(() => {
    if (num_E.value === 0 || num_N.value === 0 || num_code_raw.value <= 0) return 0;
    return modPow(num_code_raw.value, num_E.value, num_N.value);
});

// 解密后的明文
const num_code_decrypted = computed(() => {
    if (num_D.value === 0 || num_N.value === 0 || num_code_encrypted.value === 0) return 0;
    return modPow(num_code_encrypted.value, num_D.value, num_N.value);
});

// 验证加密解密是否成功
const isEncryptionValid = computed(() => {
    return num_code_raw.value === num_code_decrypted.value && num_code_raw.value > 0;
});

// ========== 核心算法函数 ==========
/**
 * 模幂运算函数 - 计算 (base^exponent) mod modulus
 * 使用快速幂算法避免大数溢出
 * @param base 底数
 * @param exponent 指数
 * @param modulus 模数
 * @returns 运算结果
 */
const modPow = (base: number, exponent: number, modulus: number): number => {
    if (modulus === 1) return 0;
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    return result;
};

/**
 * 判断一个数是否为质数
 * @param num 要判断的数
 * @returns 是否为质数
 */
const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    for (let i = 3; i * i <= num; i += 2) {
        if (num % i === 0) return false;
    }
    return true;
};

/**
 * 使用辗转相除法计算最大公约数
 * @param a 第一个数
 * @param b 第二个数
 * @returns 最大公约数
 */
const gcd = (a: number, b: number): number => {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

// ========== 辅助函数 ==========
/**
 * 获取指定范围内的所有质数
 * @param start 起始值
 * @param end 结束值
 * @returns 质数列表字符串
 */
const generatePrimeList = (start: number, end: number): string => {
    const list: number[] = [];
    for (let i = start; i <= end; i++) {
        if (isPrime(i)) {
            list.push(i);
        }
    }
    return list.join(', ') || '无';
};

// 2-100范围内的质数列表
const num_prime_list = computed(() => generatePrimeList(2, 100));

/**
 * 计算与φ(N)互质的数e列表
 * 这些数可以作为RSA公钥的指数
 */
const num_E_List = computed(() => {
    if (num_φN.value <= 2) {
        return '没有满足条件的 e 值';
    }
    
    const e_list: number[] = [];
    const maxSearch = Math.min(num_φN.value, 1000); // 限制搜索范围
    
    for (let e = 2; e < maxSearch; e++) {
        if (gcd(e, num_φN.value) === 1) {
            e_list.push(e);
        }
        // 限制显示数量，避免界面过于拥挤
        if (e_list.length >= 50) {
            e_list.push(-1); // 用-1表示还有更多
            break;
        }
    }
    
    let result = e_list.filter(e => e !== -1).join(', ');
    if (e_list.includes(-1)) {
        result += ' ... (更多)';
    }
    
    return result || '没有满足条件的 e 值';
});

/**
 * 计算私钥指数d的可能值列表
 * 满足条件: (e × d - 1) % φ(N) = 0
 */
const num_D_List = computed(() => {
    if (num_E.value === 0 || num_φN.value === 0) {
        return '请先设置有效的 e 值';
    }
    
    const d_list: number[] = [];
    const maxSearch = Math.min(num_φN.value, 500); // 限制搜索范围
    
    for (let d = 1; d <= maxSearch; d++) {
        if ((num_E.value * d - 1) % num_φN.value === 0) {
            d_list.push(d);
        }
        // 限制显示数量
        if (d_list.length >= 20) {
            d_list.push(-1); // 用-1表示还有更多
            break;
        }
    }
    
    let result = d_list.filter(d => d !== -1).join(', ');
    if (d_list.includes(-1)) {
        result += ' ... (更多)';
    }
    
    return result || '没有满足条件的 d 值';
});

// ========== 监听器 ==========
/**
 * 当选择新的e值时，自动选择第一个有效的d值
 */
watch([num_E, num_φN], () => {
    if (num_E.value > 0 && num_φN.value > 0) {
        // 自动找到第一个有效的d值
        for (let d = 1; d <= 1000; d++) {
            if ((num_E.value * d - 1) % num_φN.value === 0) {
                num_D.value = d;
                break;
            }
        }
    }
});

/**
 * 验证输入的质数是否有效
 */
watch([num_P, num_Q], ([newP, newQ]) => {
    // 如果输入的不是质数，给出提示
    if (newP && !isPrime(newP)) {
        console.warn(`${newP} 不是质数`);
    }
    if (newQ && !isPrime(newQ)) {
        console.warn(`${newQ} 不是质数`);
    }
});
</script>

<style scoped lang="scss">
// ========== 响应式断点定义 ==========
$mobile: 480px;
$tablet: 768px;
$desktop: 1024px;
$wide: 1200px;

// ========== 颜色主题 ==========
$primary-color: #667eea;
$secondary-color: #764ba2;
$success-color: #10b981;
$error-color: #ef4444;
$warning-color: #f59e0b;
$info-color: #3b82f6;

$bg-primary: #f8fafc;
$bg-secondary: #ffffff;
$bg-card: #ffffff;
$border-color: #e2e8f0;
$text-primary: #1e293b;
$text-secondary: #64748b;
$text-muted: #94a3b8;

// ========== 混合器 ==========
@mixin card-shadow {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

@mixin card-hover {
    &:hover {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        transform: translateY(-2px);
    }
}

@mixin gradient-bg($color1, $color2) {
    background: linear-gradient(135deg, $color1 0%, $color2 100%);
}

@mixin responsive-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    
    @media (min-width: $tablet) {
        padding: 0 2rem;
    }
    
    @media (min-width: $desktop) {
        padding: 0 3rem;
    }
}

@mixin flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

// ========== 主容器样式 ==========
.common-cryptography-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem 0;
    
    @include responsive-container;
    
    @media (max-width: $mobile) {
        padding: 1rem 0;
    }
}

// ========== 页面头部样式 ==========
.page-header {
    text-align: center;
    margin-bottom: 3rem;
    
    @media (max-width: $tablet) {
        margin-bottom: 2rem;
    }
}

.page-title {
    color: white;
    font-size: 3rem;
    font-weight: 800;
    margin: 0 0 1rem 0;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    
    @media (max-width: $tablet) {
        font-size: 2.5rem;
    }
    
    @media (max-width: $mobile) {
        font-size: 2rem;
    }
    
    .icon-shield {
        margin-right: 0.5rem;
        font-size: 1.1em;
    }
}

.page-description {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.2rem;
    margin: 0;
    font-weight: 300;
    
    @media (max-width: $tablet) {
        font-size: 1.1rem;
    }
    
    @media (max-width: $mobile) {
        font-size: 1rem;
        padding: 0 1rem;
    }
}

// ========== 标签页导航样式 ==========
.algorithm-tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
    gap: 1rem;
    
    @media (max-width: $tablet) {
        margin-bottom: 2rem;
        flex-direction: column;
        align-items: center;
    }
}

.tab-button {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    
    @media (max-width: $tablet) {
        width: 280px;
        padding: 0.875rem 1.5rem;
        font-size: 1rem;
    }
    
    @media (max-width: $mobile) {
        width: 100%;
        max-width: 280px;
    }
    
    .tab-icon {
        margin-right: 0.5rem;
        font-size: 1.2em;
    }
    
    &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    &.active {
        background: white;
        color: $primary-color;
        border-color: white;
        
        &:hover {
            background: rgba(255, 255, 255, 0.95);
        }
    }
}

// ========== 算法部分样式 ==========
.algorithm-section {
    background: white;
    border-radius: 20px;
    padding: 2.5rem;
    @include card-shadow;
    
    @media (max-width: $tablet) {
        padding: 2rem;
        border-radius: 15px;
    }
    
    @media (max-width: $mobile) {
        padding: 1.5rem;
        border-radius: 10px;
        margin: 0 0.5rem;
    }
}

.section-header {
    text-align: center;
    margin-bottom: 3rem;
    
    @media (max-width: $tablet) {
        margin-bottom: 2rem;
    }
}

.section-title {
    color: $text-primary;
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    @include gradient-bg($primary-color, $secondary-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    @media (max-width: $tablet) {
        font-size: 2rem;
    }
    
    @media (max-width: $mobile) {
        font-size: 1.75rem;
    }
}

.section-description {
    color: $text-secondary;
    font-size: 1.1rem;
    margin: 0;
    
    @media (max-width: $mobile) {
        font-size: 1rem;
    }
}

// ========== 步骤卡片样式 ==========
.steps-container {
    display: grid;
    gap: 2rem;
    
    @media (max-width: $mobile) {
        gap: 1.5rem;
    }
}

.step-card {
    background: $bg-card;
    border: 2px solid $border-color;
    border-radius: 16px;
    padding: 2rem;
    transition: all 0.3s ease;
    
    @include card-hover;
    
    @media (max-width: $tablet) {
        padding: 1.5rem;
        border-radius: 12px;
    }
    
    @media (max-width: $mobile) {
        padding: 1.25rem;
        border-radius: 10px;
    }
}

.step-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    
    @media (max-width: $mobile) {
        margin-bottom: 1rem;
        flex-direction: column;
        text-align: center;
        gap: 0.5rem;
    }
}

.step-number {
    @include flex-center;
    width: 3rem;
    height: 3rem;
    background: linear-gradient(135deg, $primary-color, $secondary-color);
    color: white;
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: 700;
    margin-right: 1rem;
    flex-shrink: 0;
    
    @media (max-width: $mobile) {
        margin-right: 0;
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.25rem;
    }
}

.step-title {
    color: $text-primary;
    font-size: 1.4rem;
    font-weight: 600;
    margin: 0;
    
    @media (max-width: $tablet) {
        font-size: 1.25rem;
    }
    
    @media (max-width: $mobile) {
        font-size: 1.1rem;
        text-align: center;
    }
}

.step-content {
    display: grid;
    gap: 1.5rem;
    
    @media (max-width: $mobile) {
        gap: 1rem;
    }
}

// ========== 信息框样式 ==========
.info-box {
    background: $bg-primary;
    border: 1px solid $border-color;
    border-radius: 12px;
    padding: 1.5rem;
    
    @media (max-width: $mobile) {
        padding: 1rem;
        border-radius: 8px;
    }
    
    .info-label {
        display: block;
        color: $text-secondary;
        font-weight: 600;
        margin-bottom: 0.75rem;
        font-size: 0.95rem;
    }
}

.prime-list, .available-e-list, .available-d-list {
    background: white;
    border: 1px solid $border-color;
    border-radius: 8px;
    padding: 1rem;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
    color: $text-primary;
    max-height: 120px;
    overflow-y: auto;
    
    @media (max-width: $mobile) {
        font-size: 0.85rem;
        padding: 0.75rem;
        max-height: 100px;
    }
}

// ========== 输入组件样式 ==========
.input-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    
    @media (max-width: $mobile) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}

.input-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    label {
        color: $text-primary;
        font-weight: 600;
        font-size: 0.95rem;
    }
}

.number-input, .result-input {
    padding: 1rem;
    border: 2px solid $border-color;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    background: white;
    
    @media (max-width: $mobile) {
        padding: 0.875rem;
        font-size: 0.95rem;
    }
    
    &:focus {
        outline: none;
        border-color: $primary-color;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    &:disabled {
        background: $bg-primary;
        color: $text-secondary;
        cursor: not-allowed;
    }
}

.result-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    label {
        color: $text-primary;
        font-weight: 600;
        font-size: 0.95rem;
    }
}

// ========== 计算显示样式 ==========
.calculation-display {
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    border: 2px solid #bae6fd;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    
    @media (max-width: $mobile) {
        padding: 1rem;
    }
    
    .formula {
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 1.2rem;
        font-weight: 600;
        color: #0369a1;
        
        @media (max-width: $tablet) {
            font-size: 1.1rem;
        }
        
        @media (max-width: $mobile) {
            font-size: 1rem;
            word-break: break-all;
        }
    }
}

// ========== 密钥显示样式 ==========
.key-display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1.25rem;
    border-radius: 12px;
    font-weight: 600;
    
    @media (max-width: $mobile) {
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem;
        text-align: center;
    }
    
    &.public-key {
        background: linear-gradient(135deg, #ecfdf5, #d1fae5);
        border: 2px solid #86efac;
        color: #065f46;
    }
    
    &.private-key {
        background: linear-gradient(135deg, #fef7cd, #fef3c7);
        border: 2px solid #fcd34d;
        color: #92400e;
    }
    
    .key-label {
        font-size: 1rem;
    }
    
    .key-value {
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 1.1rem;
        background: rgba(255, 255, 255, 0.5);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        
        @media (max-width: $mobile) {
            font-size: 1rem;
            padding: 0.4rem 0.8rem;
        }
    }
}

// ========== 加密解密流程样式 ==========
.encrypt-decrypt-container {
    display: grid;
    gap: 2rem;
    
    @media (max-width: $mobile) {
        gap: 1.5rem;
    }
}

.process-flow {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    
    @media (max-width: $mobile) {
        gap: 1rem;
    }
}

.flow-item {
    width: 100%;
    max-width: 500px;
    background: $bg-secondary;
    border: 2px solid $border-color;
    border-radius: 16px;
    padding: 1.5rem;
    text-align: center;
    
    @media (max-width: $mobile) {
        padding: 1rem;
        border-radius: 12px;
    }
    
    .flow-label {
        font-weight: 700;
        color: $text-primary;
        font-size: 1.1rem;
        margin-bottom: 0.75rem;
    }
    
    .flow-formula {
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 1rem;
        color: $text-secondary;
        margin-bottom: 1rem;
        word-break: break-all;
        
        @media (max-width: $mobile) {
            font-size: 0.9rem;
        }
    }
    
    .flow-result {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 1rem;
        border-radius: 10px;
        font-weight: 600;
        
        @media (max-width: $mobile) {
            flex-direction: column;
            gap: 0.5rem;
        }
        
        &.encrypted {
            background: linear-gradient(135deg, #fef2f2, #fee2e2);
            border: 1px solid #fca5a5;
            color: #b91c1c;
        }
        
        &.decrypted {
            background: linear-gradient(135deg, #f0fdf4, #dcfce7);
            border: 1px solid #86efac;
            color: #166534;
        }
        
        .result-value {
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 1.25rem;
            background: rgba(255, 255, 255, 0.7);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            
            @media (max-width: $mobile) {
                font-size: 1.1rem;
                padding: 0.4rem 0.8rem;
            }
        }
    }
}

.flow-arrow {
    font-size: 2rem;
    color: $primary-color;
    font-weight: bold;
    
    @media (max-width: $mobile) {
        font-size: 1.5rem;
    }
}

// ========== 验证状态样式 ==========
.verification-status {
    margin-top: 1rem;
    
    .status {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        font-size: 1.1rem;
        
        @media (max-width: $mobile) {
            font-size: 1rem;
            padding: 0.875rem 1.25rem;
        }
        
        &.success {
            background: linear-gradient(135deg, #ecfdf5, #d1fae5);
            border: 2px solid #10b981;
            color: #065f46;
        }
        
        &.error {
            background: linear-gradient(135deg, #fef2f2, #fee2e2);
            border: 2px solid #ef4444;
            color: #b91c1c;
        }
        
        .status-icon {
            font-size: 1.5rem;
            
            @media (max-width: $mobile) {
                font-size: 1.25rem;
            }
        }
    }
}

// ========== 对称加密预览样式 ==========
.coming-soon-container {
    @include flex-center;
    min-height: 400px;
    
    @media (max-width: $mobile) {
        min-height: 300px;
        padding: 1rem;
    }
}

.coming-soon-card {
    background: white;
    border-radius: 20px;
    padding: 3rem;
    text-align: center;
    max-width: 600px;
    width: 100%;
    @include card-shadow;
    
    @media (max-width: $tablet) {
        padding: 2rem;
        border-radius: 15px;
    }
    
    @media (max-width: $mobile) {
        padding: 1.5rem;
        border-radius: 12px;
    }
    
    .coming-soon-icon {
        font-size: 4rem;
        margin-bottom: 1.5rem;
        
        @media (max-width: $mobile) {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
    }
    
    .coming-soon-title {
        color: $text-primary;
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 1rem 0;
        
        @media (max-width: $mobile) {
            font-size: 1.5rem;
        }
    }
    
    .coming-soon-description {
        color: $text-secondary;
        font-size: 1.1rem;
        margin-bottom: 2rem;
        line-height: 1.6;
        
        @media (max-width: $mobile) {
            font-size: 1rem;
            margin-bottom: 1.5rem;
        }
    }
    
    .feature-list {
        text-align: left;
        margin-bottom: 2rem;
        
        li {
            color: $text-secondary;
            font-size: 1rem;
            margin-bottom: 0.75rem;
            padding-left: 1rem;
            position: relative;
            
            &:before {
                content: "🔐";
                position: absolute;
                left: 0;
            }
            
            strong {
                color: $text-primary;
                font-weight: 600;
            }
        }
    }
    
    .coming-soon-footer {
        .coming-soon-badge {
            display: inline-block;
            background: linear-gradient(135deg, $primary-color, $secondary-color);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            font-weight: 600;
            font-size: 1rem;
            
            @media (max-width: $mobile) {
                font-size: 0.95rem;
                padding: 0.625rem 1.25rem;
            }
        }
    }
}

// ========== 动画效果 ==========
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.step-card {
    animation: fadeInUp 0.6s ease-out;
}

.coming-soon-card {
    animation: fadeInUp 0.8s ease-out;
}

// ========== 滚动条美化 ==========
.prime-list, .available-e-list, .available-d-list {
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;
        
        &:hover {
            background: #94a3b8;
        }
    }
}

// ========== 打印样式 ==========
@media print {
    .common-cryptography-container {
        background: white;
        padding: 0;
    }
    
    .algorithm-tabs {
        display: none;
    }
    
    .step-card {
        break-inside: avoid;
        box-shadow: none;
        border: 1px solid #ccc;
    }
}
</style>