<script setup>
import { ref, onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme

const authenticated = ref(false)
const password = ref('')
const error = ref(false)

// SHA-256 hash of "soul"
const HASH = 'a]dvnW' // placeholder, we use simple comparison via hashing

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

// SHA-256 of "soul"
const EXPECTED = 'ae0facccf0a3723adefbdfe700c097b6c843dbfd06e5cd325602ec13b2361f8b'

async function submit() {
  const hashed = await hashPassword(password.value)
  if (hashed === EXPECTED) {
    authenticated.value = true
    sessionStorage.setItem('auth', 'ok')
    error.value = false
  } else {
    error.value = true
  }
}
</script>

<template>
  <Layout v-if="authenticated" />
  <div v-else class="gate">
    <div class="gate-box">
      <h1>Soul.lock</h1>
      <p>このサイトはパスワードで保護されています</p>
      <form @submit.prevent="submit">
        <input
          v-model="password"
          type="password"
          placeholder="パスワードを入力"
          autofocus
        />
        <button type="submit">Enter</button>
      </form>
      <p v-if="error" class="error">パスワードが正しくありません</p>
    </div>
  </div>
</template>

<style scoped>
.gate {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f6f6f7;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.gate-box {
  text-align: center;
  background: #fff;
  padding: 3rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  max-width: 380px;
  width: 90%;
}
.gate-box h1 {
  margin: 0 0 0.5rem;
  font-size: 1.8rem;
  color: #1a1a1a;
}
.gate-box p {
  margin: 0 0 1.5rem;
  color: #666;
  font-size: 0.9rem;
}
.gate-box form {
  display: flex;
  gap: 0.5rem;
}
.gate-box input {
  flex: 1;
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}
.gate-box input:focus {
  border-color: #3451b2;
}
.gate-box button {
  padding: 0.6rem 1.2rem;
  background: #3451b2;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.gate-box button:hover {
  background: #2c3e8f;
}
.error {
  color: #e53e3e !important;
  margin-top: 1rem !important;
}
</style>
