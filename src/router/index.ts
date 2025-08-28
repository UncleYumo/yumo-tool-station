import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                title: '羽沫 AI 工具站'
            }
        },
        {
            path: '/responsive-layout',
            name: 'ResponsiveLayout',
            component: () => import('../views/ResponsiveLayoutDemo/ResponsiveLayoutDemo.vue'),
            meta: {
                title: '响应式布局案例'
            }
        },
        {
            path: '/waterfall-layout',
            name: 'WaterfallLayout',
            component: () => import('../views/WaterfallLayoutDemo/WaterfallLayoutDemo.vue'),
            meta: {
                title: '瀑布流布局案例'
            }
        },
        {
            path: '/box-shadow-style',
            name: 'BoxShadowStyle',
            component: () => import('../views/BoxShadowStyle/BoxShadowStyle.vue'),
            meta: {
                title: 'Box-Shadow 样式演示'
            }
        },
        {
            path: '/browser-navigation',
            name: 'BrowserNavigation',
            component: () => import('../views/BrowserNavigation/BrowserNavigation.vue'),
            meta: {
                title: '掌握浏览器导航：深入解析Location、History和现代路由API'
            }
        },
        {
            path: '/common-cryptography',
            name: 'CommonCryptography',
            component: () => import('../views/CommonCryptography/CommonCryptography.vue'),
            meta: {
                title: '常用加密算法'
            }
        },
        {
            path: '/vue-router-case',
            name: 'VueRouterCase',
            component: () => import('../views/VueRouterCase/VueRouterCase.vue'),
            meta: {
                title: 'Vue Router 示例'
            },
            children: [
                {
                    path: ':caseType',
                    component: () => import('../views/VueRouterCase/Component/CommonRouterPage.vue'),
                    meta: {
                        title: 'vue router 示例子目录'
                    }
                }
            ]
        },
        {
            path: '/mute-time-helper',
            name: 'MuteTimeHelper',
            component: () => import('../views/MuteTimeHelper/MuteTimeHelper.vue'),
            meta: {
                title: '禁言时长助手'
            }
        },
        {
            // 404 页面重定向到首页
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('../views/Error/404NotFound.vue'),
        }
    ]
})

export default router;