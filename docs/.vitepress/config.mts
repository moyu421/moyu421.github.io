import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // ------ 站点元数据 ------
  title: "Moyu's Blog",
  description: "Just playing around.",
  lang: 'zh-CN',
  base: '/',

  // ------ 主题配置 ------
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 导航栏
    nav: [
      {text: '首页', link: '/'},
      {text: '归档', link: '/archives'},
      {text: '关于', link: '/about'}
    ],

    // 侧边栏：按博客目录结构分组
    // sidebar: [],

    // 页脚
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2026 My Tech Blog'
    },

    // 大纲配置（右侧目录层级）
    outline: {
      label: '本页目录',
      level: [2, 3],                  // 显示 h2 和 h3 标题[reference:12]
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于'
    },

    // 编辑链接
    // editLink: {
    //   pattern: 'https://github.com/你的用户名/你的仓库/edit/main/docs/:path',
    //   text: '在 GitHub 上编辑此页'
    // },

    socialLinks: [
      {icon: 'github', link: 'https://github.com/moyu421/moyu421.github.io'}
    ],

    // 搜索栏
    search: {
      provider: 'local',
      options: {
        async _render(src: any, env: any, md: { renderAsync: (arg0: any, arg1: any) => any }) {
          const html = await md.renderAsync(src, env)
          if (env.frontmatter?.search === false) return ''
          if (env.relativePath.startsWith('some/path')) return ''
          return html
        },
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '清除搜索条件',
                backButtonTitle: '关闭搜索',
                noResultsText: '无法找到相关结果',
                footer: {
                  selectText: '选择',
                  closeText: '关闭',
                  selectKeyAriaLabel: '输入',
                  navigateText: '切换',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeKeyAriaLabel: 'Esc'
                }
              }
            },
          }
        },
        miniSearch: {
          /**
           * @type {Pick<import('minisearch').Options, 'extractField' | 'tokenize' | 'processTerm'>}
           */
          options: {},
          /**
           * @type {import('minisearch').SearchOptions}
           * @default
           * { fuzzy: 0.2, prefix: true, boost: { title: 4, text: 2, titles: 1 } }
           */
          searchOptions: {
            prefix: true,    // 开启前缀搜索
            fuzzy: 0.2,     // 模糊匹配度 (0.0 - 1.0)
            boost: {title: 4, text: 2, titles: 1}, // 标题权重更高
          }
        }
      }
    }
  },

  // ------ Markdown 配置 ------
  markdown: {
    lineNumbers: true,                 // 代码块显示行号
    container: {                       // 自定义信息框
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险'
    }
  },

  // ------ Vite 配置 ------
  vite: {
    // 可直接配置底层 Vite 实例[reference:13]
  }
})