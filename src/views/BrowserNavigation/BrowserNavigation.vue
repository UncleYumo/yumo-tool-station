<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 1.1 window.location 属性演示
const locationData = ref({
    location_href: '点击"解析地址"按钮获取',
    location_protocol: '点击"解析地址"按钮获取',
    location_host: '点击"解析地址"按钮获取',
    location_hostname: '点击"解析地址"按钮获取',
    location_port: '点击"解析地址"按钮获取',
    location_pathname: '点击"解析地址"按钮获取',
    location_search: '点击"解析地址"按钮获取',
    location_origin: '点击"解析地址"按钮获取',
    location_hash: '点击"解析地址"按钮获取',
})

// 1.2 window.location 方法演示
const urlInput = ref('https://developer.mozilla.org/zh-CN/docs/Web/API/Location')
const replaceUrlInput = ref('/BrowserNavigation?demo=replace&from=location')
const isReloadButtonDisabled = ref(false)

// 2.1 window.history 基础属性和方法
const historyData = ref({
    length: 0,
    canGoBack: false,
    canGoForward: false,
})

// 2.2 History API 核心方法演示
const stateInput = ref('{ "page": "demo", "timestamp": "' + Date.now() + '" }')
const titleInput = ref('浏览器导航演示页面')
const urlStateInput = ref('/BrowserNavigation?demo=pushState&time=' + Date.now())
const replaceStateInput = ref('/BrowserNavigation?demo=replaceState&time=' + Date.now())

// 3.1 popstate 事件监听
const popstateLog = ref<string[]>([])
const isPopstateListening = ref(false)

// 3.2 hashchange 事件监听
const hashchangeLog = ref<string[]>([])
const isHashchangeListening = ref(false)
const hashInput = ref('#section-demo-' + Date.now())

// URL查询参数解析演示
const urlParams = ref<Record<string, string>>({})

// 方法实现
const parseCurrentLocation = () => {
    locationData.value = {
        location_href: window.location.href,
        location_protocol: window.location.protocol,
        location_host: window.location.host,
        location_hostname: window.location.hostname,
        location_port: window.location.port || '默认端口',
        location_pathname: window.location.pathname,
        location_search: window.location.search || '无查询参数',
        location_origin: window.location.origin,
        location_hash: window.location.hash || '无哈希值',
    }
    updateHistoryData()
    parseUrlParams()
}

const resetLocationData = () => {
    locationData.value = {
        location_href: '点击"解析地址"按钮获取',
        location_protocol: '点击"解析地址"按钮获取',
        location_host: '点击"解析地址"按钮获取',
        location_hostname: '点击"解析地址"按钮获取',
        location_port: '点击"解析地址"按钮获取',
        location_pathname: '点击"解析地址"按钮获取',
        location_search: '点击"解析地址"按钮获取',
        location_origin: '点击"解析地址"按钮获取',
        location_hash: '点击"解析地址"按钮获取',
    }
}

const handleLocationAssign = () => {
    if (confirm(`即将跳转到: ${urlInput.value}\n确定要离开当前页面吗？`)) {
        window.location.assign(urlInput.value)
    }
}

const handleLocationReplace = () => {
    if (confirm(`即将替换当前页面到: ${replaceUrlInput.value}\n注意：您将无法通过后退按钮返回！`)) {
        window.location.replace(replaceUrlInput.value)
    }
}

const handleLocationReload = () => {
    isReloadButtonDisabled.value = true
    setTimeout(() => {
        window.location.reload()
    }, 1000)
}

const updateHistoryData = () => {
    historyData.value = {
        length: window.history.length,
        canGoBack: window.history.length > 1,
        canGoForward: false, // 这个值很难准确判断
    }
}

const handleHistoryBack = () => {
    if (window.history.length > 1) {
        window.history.back()
    } else {
        alert('没有可返回的历史记录')
    }
}

const handleHistoryForward = () => {
    window.history.forward()
}

const handleHistoryGo = (delta: number) => {
    if (delta === 0) {
        window.location.reload()
    } else {
        window.history.go(delta)
    }
}

const handlePushState = () => {
    try {
        const state = JSON.parse(stateInput.value)
        window.history.pushState(state, titleInput.value, urlStateInput.value)
        alert('pushState 执行成功！\n地址栏URL已更新，历史记录已添加新条目。')
        updateHistoryData()
        parseCurrentLocation()
    } catch (error) {
        alert('状态对象格式错误，请输入有效的JSON格式')
    }
}

const handleReplaceState = () => {
    try {
        const state = JSON.parse(stateInput.value)
        window.history.replaceState(state, titleInput.value, replaceStateInput.value)
        alert('replaceState 执行成功！\n地址栏URL已更新，但没有添加新的历史记录。')
        updateHistoryData()
        parseCurrentLocation()
    } catch (error) {
        alert('状态对象格式错误，请输入有效的JSON格式')
    }
}

const addPopstateLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    popstateLog.value.unshift(`[${timestamp}] ${message}`)
    if (popstateLog.value.length > 10) {
        popstateLog.value.pop()
    }
}

const addHashchangeLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    hashchangeLog.value.unshift(`[${timestamp}] ${message}`)
    if (hashchangeLog.value.length > 10) {
        hashchangeLog.value.pop()
    }
}

const onPopstate = (event: PopStateEvent) => {
    addPopstateLog(`popstate 事件触发 - URL: ${window.location.href}, State: ${JSON.stringify(event.state)}`)
    updateHistoryData()
    parseCurrentLocation()
}

const onHashchange = (event: HashChangeEvent) => {
    addHashchangeLog(`hashchange 事件触发 - 新Hash: ${event.newURL.split('#')[1] || '无'}, 旧Hash: ${event.oldURL.split('#')[1] || '无'}`)
    parseCurrentLocation()
}

const togglePopstateListener = () => {
    if (isPopstateListening.value) {
        window.removeEventListener('popstate', onPopstate)
        isPopstateListening.value = false
        addPopstateLog('已停止监听 popstate 事件')
    } else {
        window.addEventListener('popstate', onPopstate)
        isPopstateListening.value = true
        addPopstateLog('开始监听 popstate 事件')
    }
}

const toggleHashchangeListener = () => {
    if (isHashchangeListening.value) {
        window.removeEventListener('hashchange', onHashchange)
        isHashchangeListening.value = false
        addHashchangeLog('已停止监听 hashchange 事件')
    } else {
        window.addEventListener('hashchange', onHashchange)
        isHashchangeListening.value = true
        addHashchangeLog('开始监听 hashchange 事件')
    }
}

const changeHash = () => {
    window.location.hash = hashInput.value
}

const parseUrlParams = () => {
    const params = new URLSearchParams(window.location.search)
    const paramsObj: Record<string, string> = {}
    params.forEach((value, key) => {
        paramsObj[key] = value
    })
    urlParams.value = paramsObj
}

const clearLogs = (type: 'popstate' | 'hashchange') => {
    if (type === 'popstate') {
        popstateLog.value = []
    } else {
        hashchangeLog.value = []
    }
}

onMounted(() => {
    updateHistoryData()
    parseUrlParams()
})

onUnmounted(() => {
    if (isPopstateListening.value) {
        window.removeEventListener('popstate', onPopstate)
    }
    if (isHashchangeListening.value) {
        window.removeEventListener('hashchange', onHashchange)
    }
})

</script>

<template>
    <div class="browser-navigation-container">
        <div class="header">
            <h1 class="title">掌握浏览器导航：深入解析Location、History和现代路由API</h1>
            <p class="subtitle">系统性学习和实践浏览器提供的核心导航相关API</p>
        </div>

        <!-- 1. window.location 属性演示 -->
        <div class="section">
            <h2 class="section-title">一、window.location：URL的解析与操控器</h2>
            
            <div class="subsection">
                <h3 class="subsection-title">1.1 核心属性演示</h3>
                <div class="description">
                    <p>window.location对象提供了关于当前文档位置（URL）的详细信息。点击"解析地址"查看当前页面URL的各个组成部分：</p>
                </div>
                
                <div class="display-section">
                    <div class="property-item">
                        <div class="property-label">location.href <span class="property-desc">- 完整的URL字符串</span></div>
                        <div class="property-value">{{ locationData.location_href }}</div>
                    </div>

                    <div class="property-item">
                        <div class="property-label">location.protocol <span class="property-desc">- 协议部分（如 https:）</span></div>
                        <div class="property-value">{{ locationData.location_protocol }}</div>
                    </div>

                    <div class="property-item">
                        <div class="property-label">location.host <span class="property-desc">- 主机名和端口号</span></div>
                        <div class="property-value">{{ locationData.location_host }}</div>
                    </div>

                    <div class="property-item">
                        <div class="property-label">location.hostname <span class="property-desc">- 主机名（域名）</span></div>
                        <div class="property-value">{{ locationData.location_hostname }}</div>
                    </div>

                    <div class="property-item">
                        <div class="property-label">location.port <span class="property-desc">- 端口号</span></div>
                        <div class="property-value">{{ locationData.location_port }}</div>
                    </div>

                    <div class="property-item">
                        <div class="property-label">location.pathname <span class="property-desc">- 路径部分</span></div>
                        <div class="property-value">{{ locationData.location_pathname }}</div>
                    </div>

                    <div class="property-item">
                        <div class="property-label">location.search <span class="property-desc">- 查询字符串</span></div>
                        <div class="property-value">{{ locationData.location_search }}</div>
                    </div>

                    <div class="property-item">
                        <div class="property-label">location.hash <span class="property-desc">- 哈希/片段标识符</span></div>
                        <div class="property-value">{{ locationData.location_hash }}</div>
                    </div>

                    <div class="property-item">
                        <div class="property-label">location.origin <span class="property-desc">- 协议+主机名+端口</span></div>
                        <div class="property-value">{{ locationData.location_origin }}</div>
                    </div>
                </div>

                <div class="control-section">
                    <button class="btn btn-reset" @click="resetLocationData">重置显示</button>
                    <button class="btn btn-primary" @click="parseCurrentLocation">解析当前地址</button>
                </div>
            </div>

            <div class="subsection">
                <h3 class="subsection-title">1.2 URL查询参数解析</h3>
                <div class="description">
                    <p>使用URLSearchParams API解析当前URL的查询参数：</p>
                </div>
                
                <div class="display-section">
                    <div v-if="Object.keys(urlParams).length === 0" class="no-params">
                        当前URL没有查询参数，可以通过History API添加一些参数来测试
                    </div>
                    <div v-else>
                        <div v-for="(value, key) in urlParams" :key="key" class="param-item">
                            <span class="param-key">{{ key }}</span> = <span class="param-value">{{ value }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <h3 class="subsection-title">1.3 核心方法演示</h3>
                <div class="description">
                    <p><strong>注意：</strong>以下方法会导致页面跳转或刷新，请谨慎操作！</p>
                </div>
                
                <div class="method-demo">
                    <div class="method-item">
                        <h4>location.assign() - 跳转到新页面（可后退）</h4>
                        <div class="input-group">
                            <input v-model="urlInput" class="url-input" placeholder="输入要跳转的URL">
                            <button class="btn btn-warning" @click="handleLocationAssign">执行跳转</button>
                        </div>
                    </div>

                    <div class="method-item">
                        <h4>location.replace() - 替换当前页面（不可后退）</h4>
                        <div class="input-group">
                            <input v-model="replaceUrlInput" class="url-input" placeholder="输入要替换的URL">
                            <button class="btn btn-danger" @click="handleLocationReplace">执行替换</button>
                        </div>
                    </div>

                    <div class="method-item">
                        <h4>location.reload() - 重新加载当前页面</h4>
                        <button class="btn btn-secondary" :disabled="isReloadButtonDisabled" @click="handleLocationReload">
                            {{ isReloadButtonDisabled ? '1秒后刷新...' : '重新加载页面' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 2. window.history API 演示 -->
        <div class="section">
            <h2 class="section-title">二、window.history：会话历史的管理器</h2>
            
            <div class="subsection">
                <h3 class="subsection-title">2.1 基础属性与方法</h3>
                
                <div class="display-section">
                    <div class="property-item">
                        <div class="property-label">history.length <span class="property-desc">- 当前会话历史条目数量</span></div>
                        <div class="property-value">{{ historyData.length }}</div>
                    </div>
                </div>

                <div class="control-section">
                    <button class="btn btn-secondary" @click="handleHistoryBack">history.back() 后退</button>
                    <button class="btn btn-secondary" @click="handleHistoryForward">history.forward() 前进</button>
                    <button class="btn btn-secondary" @click="handleHistoryGo(-2)">history.go(-2) 后退2步</button>
                    <button class="btn btn-secondary" @click="handleHistoryGo(0)">history.go(0) 刷新</button>
                </div>
            </div>

            <div class="subsection">
                <h3 class="subsection-title">2.2 History API 核心方法</h3>
                <div class="description">
                    <p>HTML5 History API的两个核心方法，是实现SPA路由的基础：</p>
                </div>
                
                <div class="history-api-demo">
                    <div class="input-group-vertical">
                        <label>状态对象 (JSON格式)：</label>
                        <textarea v-model="stateInput" class="state-input" rows="3"></textarea>
                    </div>

                    <div class="input-group-vertical">
                        <label>页面标题：</label>
                        <input v-model="titleInput" class="title-input" placeholder="页面标题">
                    </div>

                    <div class="method-item">
                        <h4>history.pushState() - 添加新的历史记录条目</h4>
                        <div class="input-group">
                            <input v-model="urlStateInput" class="url-input" placeholder="新的URL路径">
                            <button class="btn btn-primary" @click="handlePushState">执行 pushState</button>
                        </div>
                    </div>

                    <div class="method-item">
                        <h4>history.replaceState() - 替换当前历史记录条目</h4>
                        <div class="input-group">
                            <input v-model="replaceStateInput" class="url-input" placeholder="要替换的URL路径">
                            <button class="btn btn-warning" @click="handleReplaceState">执行 replaceState</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 3. 导航事件监听演示 -->
        <div class="section">
            <h2 class="section-title">三、导航事件：响应导航变化</h2>
            
            <div class="subsection">
                <h3 class="subsection-title">3.1 popstate 事件监听</h3>
                <div class="description">
                    <p>当用户点击浏览器前进/后退按钮或调用history.back()/forward()/go()时触发。<br>
                    <strong>注意：</strong>调用pushState()或replaceState()不会触发此事件。</p>
                </div>
                
                <div class="event-demo">
                    <div class="control-section">
                        <button class="btn" :class="isPopstateListening ? 'btn-danger' : 'btn-success'" @click="togglePopstateListener">
                            {{ isPopstateListening ? '停止监听' : '开始监听' }} popstate 事件
                        </button>
                        <button class="btn btn-secondary" @click="clearLogs('popstate')">清空日志</button>
                    </div>
                    
                    <div class="log-section">
                        <div class="log-title">popstate 事件日志：</div>
                        <div class="log-container">
                            <div v-if="popstateLog.length === 0" class="no-log">暂无日志记录</div>
                            <div v-for="log in popstateLog" :key="log" class="log-item">{{ log }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <h3 class="subsection-title">3.2 hashchange 事件监听</h3>
                <div class="description">
                    <p>当URL的哈希值发生改变时触发，是Hash模式前端路由的基础。</p>
                </div>
                
                <div class="event-demo">
                    <div class="control-section">
                        <button class="btn" :class="isHashchangeListening ? 'btn-danger' : 'btn-success'" @click="toggleHashchangeListener">
                            {{ isHashchangeListening ? '停止监听' : '开始监听' }} hashchange 事件
                        </button>
                        <button class="btn btn-secondary" @click="clearLogs('hashchange')">清空日志</button>
                    </div>
                    
                    <div class="hash-demo">
                        <div class="input-group">
                            <input v-model="hashInput" class="hash-input" placeholder="输入新的哈希值（如 #section1）">
                            <button class="btn btn-primary" @click="changeHash">修改哈希值</button>
                        </div>
                    </div>
                    
                    <div class="log-section">
                        <div class="log-title">hashchange 事件日志：</div>
                        <div class="log-container">
                            <div v-if="hashchangeLog.length === 0" class="no-log">暂无日志记录</div>
                            <div v-for="log in hashchangeLog" :key="log" class="log-item">{{ log }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 使用说明 -->
        <div class="section">
            <h2 class="section-title">使用说明与实践建议</h2>
            <div class="usage-guide">
                <div class="guide-item">
                    <h4>🎯 学习路径建议：</h4>
                    <ol>
                        <li>先熟悉 window.location 的各个属性，理解URL的组成结构</li>
                        <li>尝试 location 的方法，体验不同跳转方式的区别</li>
                        <li>实践 History API，理解 pushState 和 replaceState 的差异</li>
                        <li>开启事件监听，观察不同操作触发的事件</li>
                        <li>结合实际项目需求，选择合适的API组合</li>
                    </ol>
                </div>
                
                <div class="guide-item">
                    <h4>⚠️ 注意事项：</h4>
                    <ul>
                        <li>location.assign() 和 location.replace() 会实际跳转页面</li>
                        <li>pushState/replaceState 只能在同源页面间使用</li>
                        <li>popstate 事件不是由 pushState/replaceState 触发</li>
                        <li>现代框架（如Vue Router）已经封装了这些底层API</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.browser-navigation-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
}

.header {
    text-align: center;
    margin-bottom: 40px;
    padding: 30px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
}

.title {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 10px 0;
}

.subtitle {
    font-size: 16px;
    opacity: 0.9;
    margin: 0;
}

.section {
    margin-bottom: 50px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
}

.section-title {
    font-size: 24px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
    padding: 20px 30px;
    background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    border-radius: 12px 12px 0 0;
}

.subsection {
    padding: 25px 30px;
    border-bottom: 1px solid #f3f4f6;
}

.subsection:last-child {
    border-bottom: none;
}

.subsection-title {
    font-size: 20px;
    font-weight: 600;
    color: #374151;
    margin: 0 0 15px 0;
}

.description {
    margin-bottom: 20px;
    color: #6b7280;
    background: #f8fafc;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #3b82f6;
}

.display-section {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 10px;
    border: 1px solid #e9ecef;
    margin-bottom: 20px;
}

.property-item {
    margin-bottom: 20px;
    padding: 15px;
    background: white;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.property-item:last-child {
    margin-bottom: 0;
}

.property-label {
    font-size: 14px;
    font-weight: 600;
    color: #1e40af;
    margin-bottom: 8px;
}

.property-desc {
    font-weight: 400;
    color: #64748b;
    font-size: 13px;
}

.property-value {
    word-break: break-all;
    color: #0f172a;
    font-size: 16px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    background: #f1f5f9;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #cbd5e1;
}

.control-section {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 120px;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-primary {
    background-color: #3b82f6;
    color: white;
}

.btn-primary:hover:not(:disabled) {
    background-color: #2563eb;
}

.btn-secondary {
    background-color: #6b7280;
    color: white;
}

.btn-secondary:hover:not(:disabled) {
    background-color: #4b5563;
}

.btn-success {
    background-color: #10b981;
    color: white;
}

.btn-success:hover:not(:disabled) {
    background-color: #059669;
}

.btn-warning {
    background-color: #f59e0b;
    color: white;
}

.btn-warning:hover:not(:disabled) {
    background-color: #d97706;
}

.btn-danger {
    background-color: #ef4444;
    color: white;
}

.btn-danger:hover:not(:disabled) {
    background-color: #dc2626;
}

.btn-reset {
    background-color: #6b7280;
    color: white;
}

.btn-reset:hover:not(:disabled) {
    background-color: #4b5563;
}

.btn:active {
    transform: translateY(1px);
}

.input-group {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
}

.input-group-vertical {
    margin-bottom: 15px;
}

.input-group-vertical label {
    display: block;
    font-weight: 500;
    color: #374151;
    margin-bottom: 5px;
}

.url-input,
.hash-input,
.title-input {
    flex: 1;
    min-width: 300px;
    padding: 10px 15px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
}

.state-input {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    resize: vertical;
}

.method-demo {
    space-y: 20px;
}

.method-item {
    margin-bottom: 25px;
    padding: 20px;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.method-item h4 {
    margin: 0 0 15px 0;
    color: #1e40af;
    font-size: 16px;
}

.history-api-demo {
    space-y: 20px;
}

.event-demo {
    space-y: 15px;
}

.log-section {
    margin-top: 20px;
}

.log-title {
    font-weight: 600;
    color: #374151;
    margin-bottom: 10px;
}

.log-container {
    max-height: 200px;
    overflow-y: auto;
    background: #1f2937;
    border-radius: 6px;
    padding: 15px;
}

.log-item {
    color: #d1d5db;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 12px;
    margin-bottom: 5px;
    padding: 5px 0;
    border-bottom: 1px solid #374151;
}

.log-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.no-log,
.no-params {
    color: #6b7280;
    font-style: italic;
    text-align: center;
    padding: 20px;
}

.param-item {
    margin-bottom: 10px;
    padding: 10px;
    background: white;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
}

.param-key {
    font-weight: 600;
    color: #1e40af;
}

.param-value {
    color: #059669;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.hash-demo {
    margin-bottom: 20px;
}

.usage-guide {
    padding: 30px;
}

.guide-item {
    margin-bottom: 30px;
    padding: 20px;
    background: #f8fafc;
    border-radius: 8px;
    border-left: 4px solid #3b82f6;
}

.guide-item h4 {
    margin: 0 0 15px 0;
    color: #1e40af;
}

.guide-item ol,
.guide-item ul {
    margin: 0;
    padding-left: 20px;
}

.guide-item li {
    margin-bottom: 8px;
    color: #4b5563;
}
</style>
