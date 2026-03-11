<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const loaded = ref(false)
const titleChars = ref([])
const subtitleVisible = ref(false)
const taglineVisible = ref(false)
const scrollIndicator = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

const title = 'SOUL.lock'
const subtitle = 'Still the soul remains'
const tagline = 'After AIにおける新しい社会を作る'

const features = [
  { num: '01', title: '業務網羅性', desc: 'チャット・CRM・会計・人事・購買・在庫など40以上のモジュールを統合。すべての業務を一つのプラットフォームで。' },
  { num: '02', title: 'AI業務完結', desc: 'AIエージェントが定型業務を自動処理。人間は判断と承認に集中し、創造的な仕事に時間を使える。' },
  { num: '03', title: 'データ主権', desc: 'テナント単位でデータを完全分離。セキュリティとプライバシーを確保し、安心して利用できる基盤。' },
]

const stats = [
  { value: '40+', label: 'Modules' },
  { value: '24/7', label: 'AI Agent' },
  { value: '100%', label: 'Data Isolation' },
]

let observer = null

function onMouse(e) {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 2
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 2
}

function initTitle() {
  title.split('').forEach((c, i) => {
    setTimeout(() => { titleChars.value.push(c) }, 120 + i * 90)
  })
  const base = 120 + title.length * 90
  setTimeout(() => { subtitleVisible.value = true }, base + 400)
  setTimeout(() => { taglineVisible.value = true }, base + 900)
  setTimeout(() => { scrollIndicator.value = true }, base + 1500)
}

function setupObserver() {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view') })
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
  document.querySelectorAll('.obs').forEach(el => observer.observe(el))
}

onMounted(() => {
  window.addEventListener('mousemove', onMouse)
  setTimeout(() => { loaded.value = true; initTitle() }, 200)
  setTimeout(setupObserver, 600)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouse)
  if (observer) observer.disconnect()
})
</script>

<template>
<div class="page" :class="{ loaded }">

  <!-- ========== SOUL BACKGROUND ========== -->
  <div class="soul-bg" aria-hidden="true">
    <div class="soul a" :style="{ transform: `translate(${mouseX*12}px, ${mouseY*12}px)` }" />
    <div class="soul b" :style="{ transform: `translate(${mouseX*-8}px, ${mouseY*-8}px)` }" />
    <div class="soul c" :style="{ transform: `translate(${mouseX*6}px, ${mouseY*-10}px)` }" />
    <div class="soul d" />
    <div class="soul e" />
    <div class="soul f" />
    <div class="soul g" />
    <!-- Wisp trails -->
    <div class="wisp w1" />
    <div class="wisp w2" />
    <div class="wisp w3" />
  </div>

  <!-- ========== HERO ========== -->
  <section class="hero">
    <div class="hero-inner">
      <p class="hero-label obs">
        <span class="label-line" />
        <span>ソウルロック</span>
      </p>

      <h1 class="hero-title">
        <span v-for="(c, i) in titleChars" :key="i" class="ch" :style="{ animationDelay: i*0.04+'s' }">{{ c }}</span>
      </h1>

      <p class="hero-sub" :class="{ show: subtitleVisible }">{{ subtitle }}</p>
      <p class="hero-tag" :class="{ show: taglineVisible }">{{ tagline }}</p>

      <div class="hero-cta" :class="{ show: taglineVisible }">
        <a href="#features" class="btn">
          <span>Explore</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
        </a>
      </div>
    </div>

    <div class="scroll-hint" :class="{ show: scrollIndicator }">
      <div class="scroll-dot" />
      <span>Scroll</span>
    </div>
  </section>

  <!-- ========== STATS ========== -->
  <section class="stats">
    <div class="stats-row">
      <div v-for="(s, i) in stats" :key="i" class="stat-item obs glass-panel" :style="{ transitionDelay: i*0.12+'s' }">
        <span class="stat-val">{{ s.value }}</span>
        <span class="stat-lbl">{{ s.label }}</span>
      </div>
    </div>
  </section>

  <!-- ========== FEATURES ========== -->
  <section id="features" class="features">
    <div class="sec-head obs">
      <span class="sec-num">001</span>
      <h2>What we build</h2>
    </div>
    <div class="feat-grid">
      <div v-for="(f, i) in features" :key="i" class="feat-card glass-panel obs" :style="{ transitionDelay: i*0.15+'s' }">
        <span class="feat-num">{{ f.num }}</span>
        <h3>{{ f.title }}</h3>
        <p>{{ f.desc }}</p>
        <div class="feat-accent" />
      </div>
    </div>
  </section>

  <!-- ========== VISION ========== -->
  <section class="vision">
    <div class="vision-card glass-panel obs">
      <span class="sec-num">002</span>
      <h2>AIと人間が<br/><span class="gradient-text">共創する未来</span>を<br/>実装する</h2>
      <p class="vision-body">
        私たちは、AIが人間の能力を拡張し、すべての人がより創造的な仕事に集中できる社会を目指しています。テクノロジーは手段であり、目的は人間の可能性の解放です。
      </p>
    </div>
  </section>

  <!-- ========== MARQUEE ========== -->
  <section class="marquee">
    <div class="marquee-track">
      <div class="marquee-slide">
        <span v-for="i in 10" :key="i">SOUL.lock — Still the soul remains —&nbsp;</span>
      </div>
    </div>
  </section>

  <!-- ========== FOOTER ========== -->
  <footer class="foot">
    <div class="foot-inner glass-panel">
      <div>
        <span class="foot-logo">SOUL.lock</span>
        <span class="foot-copy">&copy; 2026 Soul.lock</span>
      </div>
      <span class="foot-tag">Still the soul remains</span>
    </div>
  </footer>

</div>
</template>

<style scoped>
/* ===== RESET & BASE ===== */
* { margin:0; padding:0; box-sizing:border-box; }

.page {
  min-height: 100vh;
  background: #f8f8fa;
  color: #1e1b4b;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
  overflow-x: hidden;
  opacity: 0;
  transition: opacity 0.8s ease;
}
.page.loaded { opacity: 1; }

/* ===== GLASS PANEL ===== */
.glass-panel {
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(20px) saturate(1.3);
  -webkit-backdrop-filter: blur(20px) saturate(1.3);
  border: 1px solid rgba(255,255,255,0.7);
  border-radius: 20px;
  box-shadow: 0 4px 30px rgba(99,102,241,0.06), 0 1px 2px rgba(0,0,0,0.03);
}

/* ===== SOUL BACKGROUND ===== */
.soul-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.soul {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  transition: transform 0.5s ease-out;
}

.soul.a {
  width: 500px; height: 500px;
  top: -8%; right: 5%;
  background: radial-gradient(circle, rgba(167,139,250,0.3) 0%, rgba(167,139,250,0) 70%);
  animation: soulA 16s ease-in-out infinite;
}
.soul.b {
  width: 400px; height: 400px;
  bottom: 5%; left: -3%;
  background: radial-gradient(circle, rgba(129,140,248,0.25) 0%, transparent 70%);
  animation: soulB 20s ease-in-out infinite;
}
.soul.c {
  width: 350px; height: 350px;
  top: 35%; left: 25%;
  background: radial-gradient(circle, rgba(196,181,253,0.2) 0%, transparent 70%);
  animation: soulC 14s ease-in-out infinite;
}
.soul.d {
  width: 250px; height: 250px;
  top: 60%; right: 15%;
  background: radial-gradient(circle, rgba(165,180,252,0.22) 0%, transparent 70%);
  animation: soulD 18s ease-in-out infinite;
}
.soul.e {
  width: 200px; height: 200px;
  top: 10%; left: 40%;
  background: radial-gradient(circle, rgba(224,231,255,0.35) 0%, transparent 70%);
  animation: soulE 22s ease-in-out infinite;
}
.soul.f {
  width: 300px; height: 300px;
  bottom: 25%; right: 35%;
  background: radial-gradient(circle, rgba(199,210,254,0.2) 0%, transparent 70%);
  animation: soulF 15s ease-in-out infinite;
}
.soul.g {
  width: 180px; height: 180px;
  top: 70%; left: 55%;
  background: radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%);
  animation: soulG 17s ease-in-out infinite;
}

/* Soul wisps — thin elongated shapes */
.wisp {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.3;
}
.w1 {
  width: 600px; height: 80px;
  top: 30%; left: -10%;
  background: linear-gradient(90deg, transparent, rgba(167,139,250,0.2), transparent);
  animation: wispDrift1 12s ease-in-out infinite;
  transform: rotate(-8deg);
}
.w2 {
  width: 500px; height: 60px;
  top: 55%; right: -5%;
  background: linear-gradient(90deg, transparent, rgba(129,140,248,0.18), transparent);
  animation: wispDrift2 15s ease-in-out infinite;
  transform: rotate(5deg);
}
.w3 {
  width: 400px; height: 50px;
  top: 80%; left: 20%;
  background: linear-gradient(90deg, transparent, rgba(196,181,253,0.15), transparent);
  animation: wispDrift3 18s ease-in-out infinite;
  transform: rotate(-3deg);
}

@keyframes soulA {
  0%,100% { transform: translate(0,0) scale(1); opacity:0.3; }
  30% { transform: translate(-40px,50px) scale(1.12); opacity:0.45; }
  60% { transform: translate(20px,80px) scale(0.95); opacity:0.3; }
}
@keyframes soulB {
  0%,100% { transform: translate(0,0) scale(1); }
  40% { transform: translate(50px,-40px) scale(1.1); }
  70% { transform: translate(-20px,-60px) scale(0.9); }
}
@keyframes soulC {
  0%,100% { transform: translate(0,0); }
  50% { transform: translate(60px,-50px); }
}
@keyframes soulD {
  0%,100% { transform: translate(0,0) scale(1); }
  50% { transform: translate(-50px,40px) scale(1.15); }
}
@keyframes soulE {
  0%,100% { transform: translate(0,0) scale(1); opacity:0.35; }
  50% { transform: translate(30px,40px) scale(1.2); opacity:0.5; }
}
@keyframes soulF {
  0%,100% { transform: translate(0,0); }
  33% { transform: translate(40px,-30px); }
  66% { transform: translate(-30px,20px); }
}
@keyframes soulG {
  0%,100% { transform: translate(0,0) scale(1); }
  50% { transform: translate(-35px,-25px) scale(1.1); }
}
@keyframes wispDrift1 {
  0%,100% { transform: rotate(-8deg) translateX(0); opacity: 0.2; }
  50% { transform: rotate(-8deg) translateX(80px); opacity: 0.4; }
}
@keyframes wispDrift2 {
  0%,100% { transform: rotate(5deg) translateX(0); opacity: 0.15; }
  50% { transform: rotate(5deg) translateX(-60px); opacity: 0.35; }
}
@keyframes wispDrift3 {
  0%,100% { transform: rotate(-3deg) translateX(0); }
  50% { transform: rotate(-3deg) translateX(50px); }
}

/* ===== OBSERVER ANIMATIONS ===== */
.obs {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
}
.obs.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* ===== HERO ===== */
.hero {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-inner { text-align: center; padding: 0 2rem; }

.hero-label {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 2rem;
  font-size: 0.82rem;
  letter-spacing: 0.2em;
  color: #94a3b8;
}
.label-line {
  display: block;
  width: 36px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(99,102,241,0.5));
}

.hero-title {
  font-size: clamp(3.5rem, 10vw, 8rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 1.5rem;
  min-height: 1.1em;
}

.ch {
  display: inline-block;
  animation: charReveal 0.7s cubic-bezier(0.16,1,0.3,1) both;
  background: linear-gradient(135deg, #1e1b4b 0%, #6366f1 60%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes charReveal {
  from { opacity:0; transform: translateY(50px) scale(0.8); filter: blur(12px); }
  to { opacity:1; transform: translateY(0) scale(1); filter: blur(0); }
}

.hero-sub {
  font-size: clamp(1.05rem, 2.2vw, 1.5rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  color: #64748b;
  margin-bottom: 0.8rem;
  opacity: 0;
  transform: translateY(25px);
  transition: all 1s cubic-bezier(0.16,1,0.3,1);
}
.hero-sub.show { opacity:1; transform: translateY(0); }

.hero-tag {
  font-size: clamp(0.9rem, 1.6vw, 1.1rem);
  color: #94a3b8;
  letter-spacing: 0.04em;
  margin-bottom: 2.5rem;
  opacity: 0;
  transform: translateY(25px);
  transition: all 1s cubic-bezier(0.16,1,0.3,1) 0.15s;
}
.hero-tag.show { opacity:1; transform: translateY(0); }

.hero-cta {
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s cubic-bezier(0.16,1,0.3,1) 0.3s;
}
.hero-cta.show { opacity:1; transform: translateY(0); }

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 30px;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(99,102,241,0.2);
  border-radius: 100px;
  color: #4f46e5;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  transition: all 0.4s ease;
  box-shadow: 0 2px 16px rgba(99,102,241,0.08);
}
.btn:hover {
  background: rgba(99,102,241,0.1);
  border-color: rgba(99,102,241,0.4);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(99,102,241,0.15);
}

/* Scroll hint */
.scroll-hint {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transition: opacity 1s ease;
  z-index: 2;
}
.scroll-hint.show { opacity:1; }

.scroll-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(99,102,241,0.4);
  animation: dotBounce 2s ease-in-out infinite;
}
@keyframes dotBounce {
  0%,100% { transform: translateY(0); opacity:1; }
  50% { transform: translateY(12px); opacity:0.3; }
}
.scroll-hint span {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: #cbd5e1;
  text-transform: uppercase;
}

/* ===== STATS ===== */
.stats {
  position: relative;
  z-index: 1;
  padding: 3rem 2rem;
}
.stats-row {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}
.stat-item {
  flex: 1;
  text-align: center;
  padding: 2rem 1.5rem;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.stat-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 36px rgba(99,102,241,0.1);
}
.stat-val {
  display: block;
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #4f46e5, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.stat-lbl {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #94a3b8;
  text-transform: uppercase;
  margin-top: 0.4rem;
}

/* ===== FEATURES ===== */
.features {
  position: relative;
  z-index: 1;
  padding: 6rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.sec-head { margin-bottom: 3.5rem; }
.sec-num {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: rgba(99,102,241,0.5);
  margin-bottom: 0.8rem;
  font-family: monospace;
}
.sec-head h2 {
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.feat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.feat-card {
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease;
  cursor: default;
}
.feat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 48px rgba(99,102,241,0.12), 0 1px 2px rgba(0,0,0,0.03);
}

.feat-num {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: rgba(99,102,241,0.4);
  font-family: monospace;
  margin-bottom: 1.2rem;
  display: block;
}
.feat-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
}
.feat-card p {
  font-size: 0.92rem;
  line-height: 1.85;
  color: #64748b;
}

.feat-accent {
  position: absolute;
  bottom: 0; left: 0;
  width: 0; height: 2px;
  background: linear-gradient(90deg, rgba(99,102,241,0.5), rgba(167,139,250,0.3), transparent);
  transition: width 0.6s cubic-bezier(0.16,1,0.3,1);
}
.feat-card:hover .feat-accent { width: 100%; }

/* ===== VISION ===== */
.vision {
  position: relative;
  z-index: 1;
  padding: 6rem 2rem;
  display: flex;
  justify-content: center;
}
.vision-card {
  max-width: 700px;
  width: 100%;
  padding: 4rem 3.5rem;
  text-align: center;
}
.vision-card h2 {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 600;
  line-height: 1.6;
  margin: 1rem 0 1.5rem;
}
.gradient-text {
  background: linear-gradient(135deg, #6366f1, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.vision-body {
  font-size: 0.95rem;
  line-height: 2;
  color: #64748b;
}

/* ===== MARQUEE ===== */
.marquee {
  position: relative;
  z-index: 1;
  padding: 1.8rem 0;
  overflow: hidden;
  border-top: 1px solid rgba(0,0,0,0.04);
  border-bottom: 1px solid rgba(0,0,0,0.04);
}
.marquee-track {
  display: flex;
  width: max-content;
}
.marquee-slide {
  display: flex;
  white-space: nowrap;
  animation: slide 25s linear infinite;
}
.marquee-slide span {
  font-size: clamp(0.85rem, 1.5vw, 1.1rem);
  letter-spacing: 0.1em;
  color: rgba(0,0,0,0.08);
  font-weight: 400;
}
@keyframes slide {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ===== FOOTER ===== */
.foot {
  position: relative;
  z-index: 1;
  padding: 3rem 2rem;
}
.foot-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.foot-logo {
  display: block;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #1e1b4b;
  margin-bottom: 0.3rem;
}
.foot-copy {
  font-size: 0.75rem;
  color: #94a3b8;
}
.foot-tag {
  font-size: 0.8rem;
  color: #cbd5e1;
  letter-spacing: 0.08em;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .stats-row { flex-direction: column; gap: 1rem; }
  .feat-grid { grid-template-columns: 1fr; }
  .vision-card { padding: 2.5rem 2rem; }
  .foot-inner { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
}
</style>
