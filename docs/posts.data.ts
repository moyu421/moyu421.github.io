import {createContentLoader} from 'vitepress'
import * as fs from 'node:fs'
import * as path from 'node:path'

interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
}

export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
        .filter(page => page.frontmatter.title) // 只保留有标题的文章
        .map(({frontmatter, url}) => {
          // 获取文件路径并读取文件修改时间
          const filePath = path.join(process.cwd(), 'docs', url.replace(/\.html$/, '.md'))
          const fileStat = fs.statSync(filePath)
          const fileTime = fileStat.mtimeMs

          // 优先使用 frontmatter 中的 date，如果没有则使用文件修改时间
          const dateValue = frontmatter.date || new Date(fileTime).toISOString().split('T')[0]

          return {
            title: frontmatter.title,
            url,
            date: formatDate(dateValue),
          }
        })
        .sort((a, b) => b.date.time - a.date.time) // 按日期降序排列
  },
})

function formatDate(raw: string): Post['date'] {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}