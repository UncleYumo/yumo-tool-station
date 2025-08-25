import type { Plugin, IndexHtmlTransformContext } from 'vite'

export interface DebugDivBorderOptions {
  /**
   * 是否在开发环境中注入（默认：true）
   */
  injectInDev?: boolean

  /**
   * 是否在生产环境中注入（默认：false）
   */
  injectInProd?: boolean
  
  /**
   * 边框样式（默认：#333333 solid 1px）
   */
  borderStyle?: string
}

/**
 * Vite插件：在开发时为所有div元素添加边框，方便调试布局
 */
export default function debugDivBorder(options: DebugDivBorderOptions = {}): Plugin {
  const {
    injectInDev = true,
    injectInProd = false,
    borderStyle = '#333333 solid 1px'
  } = options

  // 定义要注入的CSS样式
  const debugCss = `
  <style id="debug-div-border">
    div {
      border: ${borderStyle} !important;
    }
  </style>`

  return {
    name: 'debug-div-border',

    transformIndexHtml(html, ctx: IndexHtmlTransformContext) {
      // 根据当前模式和配置决定是否注入
      const shouldInject = (ctx.server?.config.mode === 'development' && injectInDev) ||
                          (ctx.server?.config.mode === 'production' && injectInProd)

      if (!shouldInject) {
        return html
      }

      // 注入到<head>标签中
      return html.replace('</head>', `${debugCss}\n  </head>`)
    }
  }
}