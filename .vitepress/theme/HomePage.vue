<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const heroRef = ref(null)
const sectionsRef = ref([])
const mouseX = ref(0)
const mouseY = ref(0)
const scrollY = ref(0)
const loaded = ref(false)
const titleChars = ref([])
const subtitleVisible = ref(false)
const taglineVisible = ref(false)
const scrollIndicatorVisible = ref(false)

const title = 'SOUL.lock'
const subtitle = 'Still the soul remains'
const tagline = 'After AIにおける新しい社会を作る'

const features = [
  {
    num: '01',
    title: '業務網羅性',
    desc: 'チャット・CRM・会計・人事・購買・在庫など40以上のモジュールを統合。すべての業務を一つのプラットフォームで。',
  },
  {
    num: '02',
    title: 'AI業務完結',
    desc: 'AIエージェントが定型業務を自動処理。人間は判断と承認に集中し、創造的な仕事に時間を使える。',
  },
  {
    num: '03',
    title: 'データ主権',
    desc: 'テナント単位でデータを完全分離。セキュリティとプライバシーを確保し、安心して利用できる基盤。',
  },
]

const stats = [
  { value: '40+', label: 'Modules' },
  { value: '24/7', label: 'AI Agent' },
  { value: '100%', label: 'Data Isolation' },
]

let rafId = null

function onMouseMove(e) {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 2
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 2
}

function onScroll() {
  scrollY.value = window.scrollY
}

function initCharAnimation() {
  title.split('').forEach((char, i) => {
    setTimeout(() => {
      titleChars.value.push(char)
    }, 100 + i * 80)
  })
  setTimeout(() => { subtitleVisible.value = true }, 100 + title.length * 80 + 300)
  setTimeout(() => { taglineVisible.value = true }, 100 + title.length * 80 + 800)
  setTimeout(() => { scrollIndicatorVisible.value = true }, 100 + title.length * 80 + 1400)
}

// Intersection Observer for scroll-triggered animations
let observer = null

function setupObserver() {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
      }
    })
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' })

  document.querySelectorAll('.observe').forEach(el => {
    observer.observe(el)
  })
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('scroll', onScroll, { passive: true })

  setTimeout(() => {
    loaded.value = true
    initCharAnimation()
  }, 200)

  setTimeout(() => {
    setupObserver()
  }, 500)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('scroll', onScroll)
  if (observer) observer.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div class="site" :class="{ loaded }">
    <!-- Cursor follower -->
    <div
      class="cursor-glow"
      :style="{
        transform: `translate(${mouseX * 30}px, ${mouseY * 30}px)`
      }"
    />

    <!-- HERO -->
    <section ref="heroRef" class="hero">
      <div class="hero-bg">
        <div
          class="hero-gradient g1"
          :style="{ transform: `translate(${mouseX * 15}px, ${mouseY * 15}px)` }"
        />
        <div
          class="hero-gradient g2"
          :style="{ transform: `translate(${mouseX * -10}px, ${mouseY * -10}px)` }"
        />
        <div
          class="hero-gradient g3"
          :style="{ transform: `translate(${mouseX * 8}px, ${mouseY * -12}px)` }"
        />
      </div>

      <!-- Grid lines -->
      <div class="grid-overlay">
        <div class="grid-line v" v-for="i in 5" :key="'v'+i" :style="{ left: `${i * 16.66}%` }" />
        <div class="grid-line h" v-for="i in 3" :key="'h'+i" :style="{ top: `${i * 25}%` }" />
      </div>

      <div class="hero-content">
        <div class="hero-label observe">
          <span class="label-line" />
          <span class="label-text">ソウルロック</span>
        </div>

        <h1 class="hero-title">
          <span
            v-for="(char, i) in titleChars"
            :key="i"
            class="char"
            :style="{ animationDelay: `${i * 0.05}s` }"
          >{{ char === ' ' ? '\u00A0' : char }}</span>
        </h1>

        <p class="hero-subtitle" :class="{ visible: subtitleVisible }">
          {{ subtitle }}
        </p>

        <p class="hero-tagline" :class="{ visible: taglineVisible }">
          {{ tagline }}
        </p>

        <div class="hero-cta" :class="{ visible: taglineVisible }">
          <a href="#features" class="btn-primary">
            <span>Explore</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="scroll-indicator" :class="{ visible: scrollIndicatorVisible }">
        <div class="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>

    <!-- STATS BAR -->
    <section class="stats-bar">
      <div class="stats-inner">
        <div v-for="(stat, i) in stats" :key="i" class="stat observe">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section id="features" class="features">
      <div class="section-header observe">
        <span class="section-num">001</span>
        <h2>What we build</h2>
      </div>

      <div class="features-grid">
        <div
          v-for="(feature, i) in features"
          :key="i"
          class="feature-card observe"
          :style="{ transitionDelay: `${i * 0.15}s` }"
        >
          <div class="feature-num">{{ feature.num }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.desc }}</p>
          <div class="feature-line" />
        </div>
      </div>
    </section>

    <!-- VISION -->
    <section class="vision">
      <div class="vision-inner">
        <div class="vision-text observe">
          <span class="section-num">002</span>
          <h2 class="vision-heading">
            AIと人間が<br/>
            <span class="accent">共創する未来</span>を<br/>
            実装する
          </h2>
        </div>
        <div class="vision-desc observe">
          <p>
            私たちは、AIが人間の能力を拡張し、
            すべての人がより創造的な仕事に集中できる社会を目指しています。
            テクノロジーは手段であり、目的は人間の可能性の解放です。
          </p>
        </div>
      </div>
    </section>

    <!-- MARQUEE -->
    <section class="marquee-section">
      <div class="marquee-track">
        <div class="marquee-content">
          <span v-for="i in 8" :key="i">
            SOUL.lock — Still the soul remains —&nbsp;
          </span>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="footer-logo">SOUL.lock</span>
          <span class="footer-copy">&copy; 2026 Soul.lock</span>
        </div>
        <div class="footer-tagline">
          Still the soul remains
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* ===== BASE ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.site {
  background: #0a0a0a;
  color: #fafafa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
  overflow-x: hidden;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.site.loaded {
  opacity: 1;
}

/* ===== CURSOR GLOW ===== */
.cursor-glow {
  position: fixed;
  top: 20%;
  left: 30%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  transition: transform 0.3s ease-out;
}

/* ===== HERO ===== */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-gradient {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  transition: transform 0.4s ease-out;
}

.g1 {
  width: 600px;
  height: 600px;
  top: -10%;
  right: -5%;
  background: rgba(99,102,241,0.15);
  animation: pulse1 8s ease-in-out infinite;
}

.g2 {
  width: 500px;
  height: 500px;
  bottom: -10%;
  left: -5%;
  background: rgba(139,92,246,0.12);
  animation: pulse2 10s ease-in-out infinite;
}

.g3 {
  width: 400px;
  height: 400px;
  top: 40%;
  left: 40%;
  background: rgba(59,130,246,0.08);
  animation: pulse3 12s ease-in-out infinite;
}

@keyframes pulse1 {
  0%, 100% { transform: scale(1); opacity: 0.15; }
  50% { transform: scale(1.2); opacity: 0.25; }
}
@keyframes pulse2 {
  0%, 100% { transform: scale(1); opacity: 0.12; }
  50% { transform: scale(1.15); opacity: 0.2; }
}
@keyframes pulse3 {
  0%, 100% { transform: scale(1) translate(0,0); }
  50% { transform: scale(1.1) translate(20px, -20px); }
}

/* Grid overlay */
.grid-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.grid-line {
  position: absolute;
  background: rgba(255,255,255,0.03);
}

.grid-line.v {
  width: 1px;
  height: 100%;
  top: 0;
}

.grid-line.h {
  height: 1px;
  width: 100%;
  left: 0;
}

/* Hero content */
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 2rem;
}

.hero-label {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-label.in-view {
  opacity: 1;
  transform: translateY(0);
}

.label-line {
  display: block;
  width: 40px;
  height: 1px;
  background: rgba(99,102,241,0.6);
}

.label-text {
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.5);
  text-transform: uppercase;
}

.hero-title {
  font-size: clamp(3.5rem, 10vw, 8rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 1.5rem;
  min-height: 1.2em;
}

.char {
  display: inline-block;
  animation: charIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  background: linear-gradient(135deg, #fff 0%, #c7d2fe 50%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes charIn {
  from {
    opacity: 0;
    transform: translateY(60px) rotateX(40deg);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
    filter: blur(0);
  }
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2.5vw, 1.6rem);
  font-weight: 300;
  color: rgba(255,255,255,0.7);
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-subtitle.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-tagline {
  font-size: clamp(0.95rem, 1.8vw, 1.2rem);
  color: rgba(255,255,255,0.4);
  letter-spacing: 0.05em;
  margin-bottom: 2.5rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
}

.hero-tagline.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-cta {
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
}

.hero-cta.visible {
  opacity: 1;
  transform: translateY(0);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: rgba(99,102,241,0.15);
  border: 1px solid rgba(99,102,241,0.3);
  border-radius: 100px;
  color: #c7d2fe;
  text-decoration: none;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3));
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: inherit;
}

.btn-primary:hover {
  border-color: rgba(99,102,241,0.6);
  transform: scale(1.05);
}

.btn-primary:hover::before {
  opacity: 1;
}

.btn-primary span,
.btn-primary svg {
  position: relative;
  z-index: 1;
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  opacity: 0;
  transition: opacity 1s ease;
  z-index: 2;
}

.scroll-indicator.visible {
  opacity: 1;
}

.scroll-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, rgba(99,102,241,0.6), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { transform: scaleY(1); opacity: 1; }
  50% { transform: scaleY(0.5); opacity: 0.4; }
}

.scroll-indicator span {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.3);
  text-transform: uppercase;
}

/* ===== STATS BAR ===== */
.stats-bar {
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding: 3rem 2rem;
}

.stats-inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.stat {
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.stat.in-view {
  opacity: 1;
  transform: translateY(0);
}

.stat-value {
  display: block;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #fff, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.35);
  text-transform: uppercase;
  margin-top: 0.5rem;
  display: block;
}

/* ===== FEATURES ===== */
.features {
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.section-header.in-view {
  opacity: 1;
  transform: translateY(0);
}

.section-num {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: rgba(99,102,241,0.6);
  margin-bottom: 1rem;
  font-family: monospace;
}

.section-header h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 2.5rem;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.feature-card.in-view {
  opacity: 1;
  transform: translateY(0);
}

.feature-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card:hover {
  border-color: rgba(99,102,241,0.2);
  transform: translateY(-8px);
}

.feature-num {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: rgba(99,102,241,0.5);
  font-family: monospace;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  position: relative;
}

.feature-card p {
  font-size: 0.95rem;
  line-height: 1.8;
  color: rgba(255,255,255,0.5);
  position: relative;
}

.feature-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(99,102,241,0.6), transparent);
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.feature-card:hover .feature-line {
  width: 100%;
}

/* ===== VISION ===== */
.vision {
  padding: 10rem 2rem;
  position: relative;
}

.vision::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
  pointer-events: none;
}

.vision-inner {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.vision-text {
  opacity: 0;
  transform: translateX(-40px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.vision-text.in-view {
  opacity: 1;
  transform: translateX(0);
}

.vision-heading {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -0.01em;
}

.accent {
  background: linear-gradient(135deg, #818cf8, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.vision-desc {
  opacity: 0;
  transform: translateX(40px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
}

.vision-desc.in-view {
  opacity: 1;
  transform: translateX(0);
}

.vision-desc p {
  font-size: 1.05rem;
  line-height: 2;
  color: rgba(255,255,255,0.5);
}

/* ===== MARQUEE ===== */
.marquee-section {
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding: 2rem 0;
  overflow: hidden;
}

.marquee-track {
  display: flex;
  width: max-content;
}

.marquee-content {
  display: flex;
  animation: marquee 20s linear infinite;
  white-space: nowrap;
}

.marquee-content span {
  font-size: clamp(1rem, 2vw, 1.4rem);
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.15);
  font-weight: 300;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ===== FOOTER ===== */
.site-footer {
  padding: 4rem 2rem;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.footer-logo {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.footer-copy {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.3);
}

.footer-tagline {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.2);
  letter-spacing: 0.1em;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .vision-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .stats-inner {
    flex-direction: column;
    gap: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
}
</style>
