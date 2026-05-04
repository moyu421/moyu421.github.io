---
title: 文章归档
layout: page
---

<script setup>import { data as posts } from './content-loader'
</script>

<div class="archives">
  <h1>文章归档</h1>

  <div class="post-list">
    <div v-for="post of posts" :key="post.url" class="post-item">
      <a :href="post.url" class="post-link">
        <h2 class="post-title">{{ post.title }}</h2>
      </a>
      <time class="post-date">{{ post.date.string }}</time>
    </div>
  </div>

  <div v-if="posts.length === 0" class="empty-tip">
    还没有文章，快去写第一篇吧！
  </div>
</div>