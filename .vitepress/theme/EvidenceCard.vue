<template>
  <div class="evidence-card" v-if="ja">
    <div class="ev-quote">{{ ja }}</div>
    <div class="ev-quote-en">"{{ quote }}"</div>
    <div class="ev-source">
      <strong>{{ nameJa }}</strong>
      <span v-if="title"> — {{ title }}</span>
      <span class="ev-meta">{{ source }} / {{ date }}</span>
    </div>
    <div class="ev-analysis">
      <div class="ev-prediction" v-if="prediction"><span class="ev-label">→ 予測:</span> {{ prediction }}</div>
      <div class="ev-connection" v-if="connection"><span class="ev-label">→ 示唆:</span> {{ connection }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  nameJa: String,
  title: String,
  quote: String,
  ja: String,
  source: String,
  date: String,
  prediction: String,
  connection: String,
})
</script>

<style scoped>
.evidence-card {
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1.2rem 0;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.evidence-card:hover {
  border-color: rgba(0, 0, 0, 0.12);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.ev-quote {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.8;
  color: #111;
  margin-bottom: 0.6rem;
}

.ev-quote-en {
  font-size: 0.85rem;
  line-height: 1.6;
  color: #999;
  font-style: italic;
  margin-bottom: 0.8rem;
}

.ev-source {
  font-size: 0.82rem;
  color: #555;
  margin-bottom: 0.8rem;
  line-height: 1.5;
}

.ev-source strong {
  color: #111;
}

.ev-meta {
  display: block;
  font-size: 0.75rem;
  color: #bbb;
  margin-top: 0.2rem;
}

.ev-analysis {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding-top: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.ev-prediction,
.ev-connection {
  font-size: 0.82rem;
  line-height: 1.6;
  color: #555;
}

.ev-label {
  font-weight: 600;
  color: #111;
}

.dark .evidence-card {
  background: rgba(30, 30, 30, 0.55);
  border-color: rgba(255, 255, 255, 0.06);
}

.dark .evidence-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}

.dark .ev-quote {
  color: #e5e5e5;
}

.dark .ev-quote-en {
  color: #666;
}

.dark .ev-source {
  color: #aaa;
}

.dark .ev-source strong {
  color: #e5e5e5;
}

.dark .ev-meta {
  color: #555;
}

.dark .ev-analysis {
  border-top-color: rgba(255, 255, 255, 0.06);
}

.dark .ev-prediction,
.dark .ev-connection {
  color: #aaa;
}

.dark .ev-label {
  color: #e5e5e5;
}
</style>
