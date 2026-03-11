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

onMounted(() => {
  if (sessionStorage.getItem('auth') === 'ok') {
    authenticated.value = true
  }
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
  <!-- Authenticated: show custom home or default layout -->
  <template v-if="authenticated">
    <HomePage v-if="frontmatter.layout === 'home'" />
    <Layout v-else />
  </template>

  <!-- Password gate -->
  <div v-else class="gate">
    <div class="gate-bg">
      <div class="gate-orb o1" />
      <div class="gate-orb o2" />
    </div>

    <div class="gate-box" :class="{ shake: shaking }">
      <div class="gate-logo">SOUL.lock</div>
      <div class="gate-divider" />
      <p class="gate-desc">Enter password to continue</p>
      <form @submit.prevent="submit">
        <div class="input-wrap" :class="{ 'has-error': error }">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            autofocus
          />
          <button type="submit">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </form>
      <p v-if="error" class="error-msg">Invalid password</p>
    </div>
  </div>
</template>

<style scoped>
.gate {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #0a0a0a;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
  position: relative;
  overflow: hidden;
}

.gate-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.gate-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

.o1 {
  width: 400px;
  height: 400px;
  top: -10%;
  right: -5%;
  background: rgba(99,102,241,0.12);
  animation: orbFloat1 8s ease-in-out infinite;
}

.o2 {
  width: 300px;
  height: 300px;
  bottom: -10%;
  left: -5%;
  background: rgba(139,92,246,0.08);
  animation: orbFloat2 10s ease-in-out infinite;
}

@keyframes orbFloat1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-20px, 20px); }
}

@keyframes orbFloat2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(15px, -15px); }
}

.gate-box {
  text-align: center;
  position: relative;
  z-index: 2;
  padding: 3.5rem 3rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  max-width: 380px;
  width: 90%;
  animation: gateIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes gateIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.shake {
  animation: shakeAnim 0.6s ease both;
}

@keyframes shakeAnim {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
}

.gate-logo {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #fff 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gate-divider {
  width: 40px;
  height: 1px;
  background: rgba(99,102,241,0.4);
  margin: 1.5rem auto;
}

.gate-desc {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.08em;
  margin-bottom: 2rem;
}

.input-wrap {
  display: flex;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.input-wrap:focus-within {
  border-color: rgba(99,102,241,0.5);
}

.input-wrap.has-error {
  border-color: rgba(239,68,68,0.5);
}

.input-wrap input {
  flex: 1;
  padding: 14px 16px;
  background: transparent;
  border: none;
  color: #fafafa;
  font-size: 1rem;
  outline: none;
  letter-spacing: 0.1em;
}

.input-wrap input::placeholder {
  color: rgba(255,255,255,0.2);
}

.input-wrap button {
  padding: 14px 18px;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.input-wrap button:hover {
  color: #818cf8;
}

.error-msg {
  font-size: 0.8rem;
  color: rgba(239,68,68,0.8);
  margin-top: 1rem;
  letter-spacing: 0.05em;
}
</style>
