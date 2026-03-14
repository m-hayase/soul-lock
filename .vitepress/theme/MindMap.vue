<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import humanToAi from './data/ai-evidence-human-to-ai.json'
import aiSystems from './data/ai-evidence-ai-systems.json'
import futureWork from './data/ai-evidence-future-work.json'

const allData = [...humanToAi, ...aiSystems, ...futureWork]

// Theme definitions
const themes = {
  'job-displacement': { label: '雇用置換', color: '#ef4444', icon: '👤' },
  'economic-impact': { label: '経済規模', color: '#f59e0b', icon: '📊' },
  'ai-capability': { label: 'AI能力', color: '#3b82f6', icon: '🤖' },
  'corporate-restructuring': { label: '企業変革', color: '#10b981', icon: '🏢' },
  'ai-native-saas': { label: 'AI-Native SaaS', color: '#8b5cf6', icon: '☁️' },
  'tech-infrastructure': { label: '技術基盤', color: '#06b6d4', icon: '⚙️' },
  'human-ai-coexistence': { label: '人間×AI協働', color: '#ec4899', icon: '🤝' },
  'inequality-risk': { label: '格差リスク', color: '#f97316', icon: '⚠️' },
  'ai-governance': { label: 'AIガバナンス', color: '#6366f1', icon: '🏛️' },
  'startup-opportunity': { label: 'スタートアップ機会', color: '#14b8a6', icon: '🚀' },
  'future-vision': { label: '未来構想', color: '#a855f7', icon: '🔮' },
}

// Category definitions
const categories = {
  'human-to-ai': { label: '人間からAIへ', color: '#ef4444' },
  'ai-systems': { label: 'システムのAI操作', color: '#3b82f6' },
  'future-work': { label: '未来の働き方', color: '#8b5cf6' },
}

// Group data by theme
const themeGroups = computed(() => {
  const groups = {}
  for (const d of allData) {
    const t = d.theme || 'other'
    if (!groups[t]) groups[t] = []
    groups[t].push(d)
  }
  return groups
})

const activeTheme = ref(null)
const activeCard = ref(null)
const hoveredTheme = ref(null)

function selectTheme(t) {
  if (activeTheme.value === t) {
    activeTheme.value = null
    activeCard.value = null
  } else {
    activeTheme.value = t
    activeCard.value = null
  }
}

function selectCard(d) {
  activeCard.value = activeCard.value === d ? null : d
}

// Canvas for connection lines
const canvasRef = ref(null)
const containerRef = ref(null)
let resizeObserver = null

function drawConnections() {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return

  const rect = container.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height

  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw lines from center to each theme node
  const center = container.querySelector('.center-node')
  if (!center) return
  const centerRect = center.getBoundingClientRect()
  const cx = centerRect.left + centerRect.width / 2 - rect.left
  const cy = centerRect.top + centerRect.height / 2 - rect.top

  const nodes = container.querySelectorAll('.theme-node')
  nodes.forEach(node => {
    const nr = node.getBoundingClientRect()
    const nx = nr.left + nr.width / 2 - rect.left
    const ny = nr.top + nr.height / 2 - rect.top

    const theme = node.dataset.theme
    const color = themes[theme]?.color || '#ccc'
    const isActive = activeTheme.value === theme || hoveredTheme.value === theme
    const alpha = activeTheme.value && activeTheme.value !== theme ? 0.1 : (isActive ? 0.6 : 0.2)

    ctx.beginPath()
    // Curved line
    const midX = (cx + nx) / 2
    const midY = (cy + ny) / 2 - 20
    ctx.moveTo(cx, cy)
    ctx.quadraticCurveTo(midX, midY, nx, ny)
    ctx.strokeStyle = color + (alpha < 0.2 ? '1a' : alpha < 0.4 ? '33' : '99')
    ctx.lineWidth = isActive ? 2.5 : 1.5
    ctx.stroke()
  })
}

onMounted(() => {
  nextTick(() => {
    drawConnections()
    resizeObserver = new ResizeObserver(() => drawConnections())
    if (containerRef.value) resizeObserver.observe(containerRef.value)
  })
})

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect()
})

// Redraw on state change
function onThemeHover(t) {
  hoveredTheme.value = t
  nextTick(drawConnections)
}
function onThemeLeave() {
  hoveredTheme.value = null
  nextTick(drawConnections)
}
function onThemeClick(t) {
  selectTheme(t)
  nextTick(drawConnections)
}

// Arrange themes in a circle
const themeKeys = Object.keys(themes)
function getThemePosition(index) {
  const total = themeKeys.length
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  const rx = 38  // % radius x
  const ry = 36  // % radius y
  return {
    left: `${50 + rx * Math.cos(angle)}%`,
    top: `${50 + ry * Math.sin(angle)}%`,
  }
}
</script>

<template>
  <div class="mindmap-container" ref="containerRef">
    <canvas ref="canvasRef" class="connection-canvas" />

    <!-- Center node: SOUL.lock -->
    <div class="center-node" :class="{ dimmed: activeTheme }">
      <div class="center-glow" />
      <div class="center-content">
        <span class="center-label">SOUL.lock</span>
        <span class="center-sub">AI業務空間</span>
        <span class="center-count">{{ allData.length }}件のエビデンス</span>
      </div>
    </div>

    <!-- Theme nodes -->
    <div
      v-for="(key, i) in themeKeys"
      :key="key"
      :data-theme="key"
      class="theme-node"
      :class="{ active: activeTheme === key, dimmed: activeTheme && activeTheme !== key }"
      :style="getThemePosition(i)"
      @click="onThemeClick(key)"
      @mouseenter="onThemeHover(key)"
      @mouseleave="onThemeLeave"
    >
      <span class="theme-icon">{{ themes[key].icon }}</span>
      <span class="theme-label">{{ themes[key].label }}</span>
      <span class="theme-count">{{ (themeGroups[key] || []).length }}</span>
      <div class="theme-ring" :style="{ borderColor: themes[key].color }" />
    </div>

    <!-- Detail panel -->
    <Transition name="panel">
      <div v-if="activeTheme" class="detail-panel">
        <div class="panel-header">
          <span class="panel-icon">{{ themes[activeTheme].icon }}</span>
          <h3 class="panel-title">{{ themes[activeTheme].label }}</h3>
          <span class="panel-count">{{ (themeGroups[activeTheme] || []).length }}件</span>
          <button class="panel-close" @click="onThemeClick(activeTheme)">&times;</button>
        </div>

        <div class="panel-cards">
          <div
            v-for="(d, i) in (themeGroups[activeTheme] || [])"
            :key="i"
            class="panel-card"
            :class="{ expanded: activeCard === d }"
            @click="selectCard(d)"
          >
            <div class="pcard-top">
              <span class="pcard-cat" :style="{ color: categories[d.category]?.color }">
                {{ categories[d.category]?.label }}
              </span>
              <span class="pcard-date">{{ d.date }}</span>
            </div>
            <div class="pcard-name">{{ d.nameJa }}</div>
            <div class="pcard-ja">{{ d.ja }}</div>
            <Transition name="expand">
              <div v-if="activeCard === d" class="pcard-detail">
                <div class="pcard-quote">"{{ d.quote }}"</div>
                <div v-if="d.prediction" class="pcard-prediction">
                  <span class="pcard-label">予測</span>
                  {{ d.prediction }}
                </div>
                <div v-if="d.connection" class="pcard-connection">
                  <span class="pcard-label">SOUL.lock</span>
                  {{ d.connection }}
                </div>
                <a v-if="d.url" :href="d.url" target="_blank" rel="noopener" class="pcard-source">
                  {{ d.source }} &nearr;
                </a>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.mindmap-container {
  position: relative;
  width: 100%;
  min-height: 600px;
  height: calc(100vh - 200px);
  max-height: 800px;
}

.connection-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

/* Center node */
.center-node {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
  transition: opacity 0.3s;
}
.center-node.dimmed { opacity: 0.4; }
.center-glow {
  position: absolute;
  inset: -30px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
  animation: pulseGlow 4s ease-in-out infinite;
}
@keyframes pulseGlow {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.15); opacity: 1; }
}
.center-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 1.5rem 2rem;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(99,102,241,0.3);
  border-radius: 50%;
  width: 140px;
  height: 140px;
  justify-content: center;
}
.center-label {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111;
  letter-spacing: -0.02em;
}
.center-sub {
  font-size: 0.65rem;
  color: #888;
}
.center-count {
  font-size: 0.6rem;
  color: #aaa;
  margin-top: 0.2rem;
}

/* Theme nodes */
.theme-node {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.8rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 16px;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0,0,0,0.06);
  min-width: 90px;
}
.theme-node:hover {
  transform: translate(-50%, -50%) scale(1.08);
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  z-index: 15;
}
.theme-node.active {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 6px 30px rgba(0,0,0,0.12);
  z-index: 15;
}
.theme-node.dimmed {
  opacity: 0.25;
  transform: translate(-50%, -50%) scale(0.92);
}
.theme-icon { font-size: 1.3rem; }
.theme-label {
  font-size: 0.62rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  white-space: nowrap;
}
.theme-count {
  font-size: 0.55rem;
  color: #aaa;
  font-family: monospace;
}
.theme-ring {
  position: absolute;
  inset: -2px;
  border-radius: 18px;
  border: 2px solid transparent;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}
.theme-node:hover .theme-ring,
.theme-node.active .theme-ring {
  opacity: 1;
}

/* Detail panel */
.detail-panel {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 380px;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(24px);
  border-left: 1px solid rgba(0,0,0,0.08);
  border-radius: 0 0 0 16px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.panel-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.2rem;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.panel-icon { font-size: 1.2rem; }
.panel-title { font-size: 0.95rem; font-weight: 700; color: #111; flex: 1; }
.panel-count { font-size: 0.7rem; color: #aaa; }
.panel-close {
  background: none;
  border: none;
  font-size: 1.4rem;
  color: #aaa;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  transition: color 0.2s;
}
.panel-close:hover { color: #333; }

.panel-cards {
  flex: 1;
  overflow-y: auto;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(0,0,0,0.08) transparent;
}

/* Panel card */
.panel-card {
  padding: 0.8rem;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.06);
  cursor: pointer;
  transition: all 0.2s;
  background: rgba(255,255,255,0.6);
}
.panel-card:hover {
  border-color: rgba(0,0,0,0.12);
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.panel-card.expanded {
  border-color: rgba(99,102,241,0.3);
  background: rgba(255,255,255,0.9);
}
.pcard-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
}
.pcard-cat { font-size: 0.6rem; font-weight: 600; }
.pcard-date { font-size: 0.58rem; color: #ccc; font-family: monospace; }
.pcard-name { font-size: 0.78rem; font-weight: 700; color: #111; margin-bottom: 0.2rem; }
.pcard-ja {
  font-size: 0.72rem;
  line-height: 1.55;
  color: #555;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.panel-card.expanded .pcard-ja {
  -webkit-line-clamp: unset;
}

/* Detail section */
.pcard-detail { margin-top: 0.6rem; }
.pcard-quote {
  font-size: 0.65rem;
  line-height: 1.5;
  color: #999;
  font-style: italic;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: rgba(0,0,0,0.02);
  border-radius: 6px;
}
.pcard-prediction, .pcard-connection {
  font-size: 0.68rem;
  line-height: 1.5;
  color: #555;
  margin-bottom: 0.4rem;
  padding: 0.4rem 0.5rem;
  border-radius: 6px;
}
.pcard-prediction {
  background: rgba(245,158,11,0.06);
  border-left: 2px solid rgba(245,158,11,0.4);
}
.pcard-connection {
  background: rgba(99,102,241,0.06);
  border-left: 2px solid rgba(99,102,241,0.4);
}
.pcard-label {
  display: inline-block;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-right: 0.3rem;
  color: #888;
}
.pcard-source {
  display: inline-block;
  font-size: 0.62rem;
  color: var(--vp-c-brand-1, #6366f1);
  text-decoration: none;
  margin-top: 0.3rem;
}
.pcard-source:hover { text-decoration: underline; }

/* Transitions */
.panel-enter-active { transition: all 0.3s ease; }
.panel-leave-active { transition: all 0.25s ease; }
.panel-enter-from { transform: translateX(100%); opacity: 0; }
.panel-leave-to { transform: translateX(100%); opacity: 0; }

.expand-enter-active { transition: all 0.3s ease; }
.expand-leave-active { transition: all 0.2s ease; }
.expand-enter-from { opacity: 0; max-height: 0; }
.expand-leave-to { opacity: 0; max-height: 0; }

/* Responsive */
@media (max-width: 768px) {
  .mindmap-container { min-height: 500px; }
  .theme-node { min-width: 70px; padding: 0.5rem 0.6rem; }
  .theme-label { font-size: 0.55rem; }
  .theme-icon { font-size: 1rem; }
  .center-content { width: 110px; height: 110px; }
  .center-label { font-size: 0.9rem; }
  .detail-panel { width: 100%; border-left: none; border-top: 1px solid rgba(0,0,0,0.08); border-radius: 16px 16px 0 0; top: auto; height: 60%; }
}
</style>
