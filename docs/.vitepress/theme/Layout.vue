<script setup>
import DefaultTheme from 'vitepress/theme'
import {useRoute} from 'vitepress'
import {computed} from 'vue'
import {data as posts} from '../../posts.data.ts'

const {Layout} = DefaultTheme
const route = useRoute()

const normalizePath = (path) => {
  if (!path) return ''
  const decoded = decodeURIComponent(path)
  return decoded.replace(/\/$/, '').replace(/\.html$/, '')
}

const currentPath = computed(() => normalizePath(route.path))

const currentIndex = computed(() => {
  return posts.findIndex(post => normalizePath(post.url) === currentPath.value)
})

const prevPost = computed(() => {
  const index = currentIndex.value
  if (index === -1) return null
  return index < posts.length - 1 ? posts[index + 1] : null
})

const nextPost = computed(() => {
  const index = currentIndex.value
  if (index === -1) return null
  return index > 0 ? posts[index - 1] : null
})
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <div v-if="prevPost || nextPost" class="custom-prev-next">
        <a v-if="prevPost" :href="prevPost.url" class="link prev">
          <span class="label">上一篇</span>
          <span class="title">{{ prevPost.title }}</span>
        </a>
        <div v-else class="spacer"></div>

        <a v-if="nextPost" :href="nextPost.url" class="link next">
          <span class="label">下一篇</span>
          <span class="title">{{ nextPost.title }}</span>
        </a>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.custom-prev-next {
  display: flex;
  justify-content: space-between;
  gap: 32px;
  padding-top: 32px;
  margin-top: 32px;
  border-top: 1px solid var(--vp-c-divider);
}

.link {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 0;
  width: 50%;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: all 0.2s ease;
  position: relative;
}

.link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--vp-c-brand-1);
  transition: width 0.3s ease;
}

.link:hover::after {
  width: 100%;
}

.link.prev {
  align-items: flex-start;
}

.link.next {
  align-items: flex-end;
  text-align: right;
  margin-left: auto;
}

.link .label {
  font-size: 0.85em;
  color: var(--vp-c-text-3);
  font-weight: 500;
  letter-spacing: 0.05em;
}

.link:hover .label {
  color: var(--vp-c-brand-1);
}

.link .title {
  font-size: 1em;
  font-weight: 500;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  transition: color 0.2s ease;
}

.link:hover .title {
  color: var(--vp-c-brand-1);
}

.spacer {
  width: 50%;
}

@media (max-width: 640px) {
  .custom-prev-next {
    flex-direction: column;
    gap: 20px;
  }

  .link,
  .spacer {
    width: 100%;
  }

  .link.prev,
  .link.next {
    align-items: flex-start;
    text-align: left;
  }

  .link.next {
    margin-left: 0;
  }
}
</style>