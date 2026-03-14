<script setup>
import { ref } from 'vue'
import { glossary } from './data/glossary.js'

const props = defineProps({
  k: { type: String, required: true },
})

const open = ref(false)
const entry = glossary[props.k] || { term: props.k, body: '' }

function toggle() { open.value = !open.value }
function close() { open.value = false }
</script>

<template>
  <span class="info-chip" @click.stop="toggle">
    <span class="info-chip-term">{{ entry.term }}</span>
    <span class="info-chip-icon">i</span>
    <Teleport to="body">
      <div v-if="open" class="info-modal-overlay" @click="close">
        <div class="info-modal" @click.stop>
          <button class="info-modal-close" @click="close">&times;</button>
          <h3 class="info-modal-title">{{ entry.term }}</h3>
          <p class="info-modal-body">{{ entry.body }}</p>
        </div>
      </div>
    </Teleport>
  </span>
</template>

<style scoped>
.info-chip {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  border-bottom: 1px dashed rgba(99, 102, 241, 0.4);
  padding-bottom: 1px;
  transition: border-color 0.2s;
}
.info-chip:hover {
  border-bottom-color: rgba(99, 102, 241, 0.8);
}
.info-chip-term {
  font-weight: 600;
  color: #333;
}
.info-chip-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.12);
  color: var(--vp-c-brand-1, #6366f1);
  font-size: 9px;
  font-weight: 700;
  font-style: italic;
  flex-shrink: 0;
  line-height: 1;
}
.info-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: fadeIn 0.2s ease;
}
.info-modal {
  background: #fff;
  border-radius: 16px;
  padding: 2rem 2.5rem;
  max-width: 480px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  animation: modalUp 0.25s ease;
}
.info-modal-close {
  position: absolute;
  top: 0.8rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  line-height: 1;
  padding: 0.2rem;
}
.info-modal-close:hover { color: #333; }
.info-modal-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 1rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.info-modal-body {
  font-size: 0.92rem;
  line-height: 1.85;
  color: #444;
  margin: 0;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes modalUp {
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
