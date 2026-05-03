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
    sidebar: [
      {
        text: '文章列表',
        items: [
          {text: '示例文章', link: '/posts/markdown-examples'},
          {text: 'quick-start', link: 'posts/quick-start'}
          // {text: 'Markdown Examples', link: '/markdown-examples'},
          // {text: 'Runtime API Examples', link: '/api-examples'}
        ]
      }
    ],

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
      {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
    ],
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