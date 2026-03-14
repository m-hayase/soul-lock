<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

const crumbs = computed(() => {
  const path = route.path
  const items = [{ text: 'Home', link: '/soul-lock/' }]

  if (path.includes('/vision')) {
    items.push({ text: '企画背景', link: '/soul-lock/vision/' })
    const page = frontmatter.value?.breadcrumb
    if (page) {
      items.push({ text: page })
    }
  }
  return items
})
</script>

<template>
  <nav v-if="crumbs.length > 1" class="breadcrumb" aria-label="パンくずリスト">
    <template v-for="(crumb, i) in crumbs" :key="i">
      <a v-if="crumb.link && i < crumbs.length - 1" :href="crumb.link" class="crumb-link">{{ crumb.text }}</a>
      <span v-else class="crumb-current">{{ crumb.text }}</span>
      <span v-if="i < crumbs.length - 1" class="crumb-sep">/</span>
    </template>
  </nav>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.crumb-link {
  color: var(--vp-c-brand-1, #6366f1);
  text-decoration: none;
  transition: color 0.2s;
}
.crumb-link:hover {
  color: var(--vp-c-brand-2, #818cf8);
  text-decoration: underline;
}
.crumb-current {
  color: #666;
}
.crumb-sep {
  color: #ccc;
  font-size: 0.7rem;
}
</style>
