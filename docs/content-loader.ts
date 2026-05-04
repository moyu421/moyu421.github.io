import {createContentLoader} from 'vitepress'

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
        .map(({frontmatter, url}) => ({
          title: frontmatter.title,
          url,
          date: formatDate(frontmatter.date),
        }))
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