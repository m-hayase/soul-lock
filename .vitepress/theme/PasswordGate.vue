<script setup>
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomePage from './HomePage.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()

const authenticated = ref(false)
const password = ref('')
const error = ref(false)
const shaking = ref(false)
const ready = ref(false)

onMounted(() => {
  if (sessionStorage.getItem('auth') === 'ok') {
    authenticated.value = true
  }
  setTimeout(() => { ready.value = true }, 100)
})

async function hashPassword(pw) {
  const encoder = new TextEncoder()
  const data = encoder.encode(pw)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

const EXPECTED = 'ae0facccf0a3723adefbdfe700c097b6c843dbfd06e5cd325602ec13b2361f8b'

async function submit() {
  const hashed = await hashPassword(password.value)
  if (hashed === EXPECTED) {
    authenticated.value = true
    sessionStorage.setItem('auth', 'ok')
    error.value = false
  } else {
    error.value = true
    shaking.value = true
    setTimeout(() => { shaking.value = false }, 600)
  }
}
</script>

<template>
  <template v-if="authenticated">
    <HomePage v-if="frontmatter.layout === 'home'" />
    <Layout v-else />
  </template>

  <div v-else class="gate" :class="{ ready }">
    <!-- Soul orbs -->
    <div class="soul-field">
      <div class="soul s1" />
      <div class="soul s2" />
      <div class="soul s3" />
      <div class="soul s4" />
      <div class="soul s5" />
    </div>

    <div class="gate-card" :class="{ shake: shaking }">
      <div class="gate-logo">SOUL.lock</div>
      <p class="gate-sub">Still the soul remains</p>
      <form @submit.prevent="submit">
        <div class="input-row" :class="{ err: error }">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            autofocus
          />
          <button type="submit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </form>
      <p v-if="error" class="error-text">Invalid password</p>
    </div>
  </div>
</template>

<style scoped>
.gate {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8fa;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transition: opacity 1s ease;
}
.gate.ready { opacity: 1; }

/* Soul orbs - ethereal floating blobs */
.soul-field {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.soul {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
}

.s1 {
  width: 350px; height: 350px;
  top: -5%; right: 10%;
  background: radial-gradient(circle, rgba(167,139,250,0.4), transparent 70%);
  animation: drift1 14s ease-in-out infinite;
}
.s2 {
  width: 250px; height: 250px;
  bottom: 10%; left: 5%;
  background: radial-gradient(circle, rgba(129,140,248,0.35), transparent 70%);
  animation: drift2 18s ease-in-out infinite;
}
.s3 {
  width: 200px; height: 200px;
  top: 40%; left: 30%;
  background: radial-gradient(circle, rgba(196,181,253,0.3), transparent 70%);
  animation: drift3 12s ease-in-out infinite;
}
.s4 {
  width: 180px; height: 180px;
  top: 15%; left: 50%;
  background: radial-gradient(circle, rgba(165,180,252,0.25), transparent 70%);
  animation: drift4 16s ease-in-out infinite;
}
.s5 {
  width: 300px; height: 300px;
  bottom: -5%; right: 30%;
  background: radial-gradient(circle, rgba(199,210,254,0.35), transparent 70%);
  animation: drift5 20s ease-in-out infinite;
}

@keyframes drift1 {
  0%,100% { transform: translate(0,0) scale(1); }
  25% { transform: translate(-30px,40px) scale(1.1); }
  50% { transform: translate(20px,60px) scale(0.95); }
  75% { transform: translate(-15px,20px) scale(1.05); }
}
@keyframes drift2 {
  0%,100% { transform: translate(0,0) scale(1); }
  33% { transform: translate(40px,-30px) scale(1.08); }
  66% { transform: translate(-20px,-50px) scale(0.92); }
}
@keyframes drift3 {
  0%,100% { transform: translate(0,0); }
  50% { transform: translate(50px,-40px); }
}
@keyframes drift4 {
  0%,100% { transform: translate(0,0) scale(1); }
  50% { transform: translate(-40px,30px) scale(1.15); }
}
@keyframes drift5 {
  0%,100% { transform: translate(0,0); }
  33% { transform: translate(30px,-20px); }
  66% { transform: translate(-20px,40px); }
}

/* Frosted glass card */
.gate-card {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 3rem 2.5rem;
  max-width: 380px;
  width: 90%;
  background: rgba(255,255,255,0.55);
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  border: 1px solid rgba(255,255,255,0.7);
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(99,102,241,0.08), 0 1px 3px rgba(0,0,0,0.04);
  animation: cardIn 1s cubic-bezier(0.16,1,0.3,1) 0.3s both;
}

@keyframes cardIn {
  from { opacity:0; transform: translateY(30px) scale(0.97); }
  to { opacity:1; transform: translateY(0) scale(1); }
}

.shake { animation: shakeX 0.5s ease both; }
@keyframes shakeX {
  0%,100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
}

.gate-logo {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #1e1b4b;
}
.gate-sub {
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  color: #94a3b8;
  margin: 0.6rem 0 2rem;
}

.input-row {
  display: flex;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 14px;
  overflow: hidden;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(12px);
  transition: border-color 0.3s;
}
.input-row:focus-within { border-color: rgba(99,102,241,0.4); }
.input-row.err { border-color: rgba(239,68,68,0.4); }

.input-row input {
  flex:1; padding: 14px 16px; border:none; background:transparent;
  font-size: 0.95rem; color: #1e1b4b; outline:none;
}
.input-row input::placeholder { color: #cbd5e1; }

.input-row button {
  padding: 14px 16px; border:none; background:transparent;
  color: #94a3b8; cursor:pointer; display:flex; align-items:center;
  transition: color 0.3s;
}
.input-row button:hover { color: #6366f1; }

.error-text {
  font-size: 0.78rem; color: #ef4444; margin-top: 0.8rem; letter-spacing: 0.04em;
}
</style>
