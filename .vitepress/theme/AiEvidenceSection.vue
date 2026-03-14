<script setup>
import { ref, computed } from "vue";
import humanToAi from "./data/ai-evidence-human-to-ai.json";
import aiSystems from "./data/ai-evidence-ai-systems.json";
import futureWork from "./data/ai-evidence-future-work.json";

const allData = [...humanToAi, ...aiSystems, ...futureWork]
    .sort((a, b) => b.date.localeCompare(a.date) || (b.importance || 3) - (a.importance || 3));

// --- Filter state ---
const activePeriod = ref("");
const activeCategories = ref(new Set(["human-to-ai", "ai-systems", "future-work"]));
const activeSourceTypes = ref(new Set(["keyperson", "system", "research", "news"]));

// --- Period options ---
const periods = computed(() => {
    const map = new Map();
    for (const d of allData) {
        const y = d.date.slice(0, 4);
        if (y === "2026") {
            const key = d.date; // 2026-01, 2026-02, etc
            const months = ["", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
            const m = parseInt(d.date.slice(5));
            map.set(key, `2026 ${months[m]}`);
        } else {
            if (!map.has(y)) map.set(y, y);
        }
    }
    const sorted = Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
    return sorted; // [[key, label], ...]
});

// Default to newest period
if (!activePeriod.value && periods.value.length) {
    activePeriod.value = periods.value[0][0];
}

const categoryLabels = {
    "human-to-ai": "人間からAIへ",
    "ai-systems": "システムのAI操作",
    "future-work": "未来の働き方",
};
const categoryColors = {
    "human-to-ai": "#ef4444",
    "ai-systems": "#3b82f6",
    "future-work": "#8b5cf6",
};

const sourceTypeLabels = {
    keyperson: "キーパーソン",
    system: "システム",
    research: "調査",
    news: "ニュース",
};
const sourceTypeIcons = {
    keyperson: "person",
    system: "device",
    research: "chart",
    news: "news",
};

function toggleCategory(c) {
    const s = new Set(activeCategories.value);
    if (s.has(c)) { if (s.size > 1) s.delete(c); }
    else s.add(c);
    activeCategories.value = s;
}

function toggleSourceType(t) {
    const s = new Set(activeSourceTypes.value);
    if (s.has(t)) { if (s.size > 1) s.delete(t); }
    else s.add(t);
    activeSourceTypes.value = s;
}

const filtered = computed(() => {
    return allData.filter(d => {
        // Period
        const y = d.date.slice(0, 4);
        if (y === "2026") {
            if (d.date !== activePeriod.value && activePeriod.value.startsWith("2026")) return false;
            if (!activePeriod.value.startsWith("2026") && y !== activePeriod.value) return false;
        } else {
            if (y !== activePeriod.value) return false;
        }
        // Category
        if (!activeCategories.value.has(d.category)) return false;
        // Source type
        if (!activeSourceTypes.value.has(d.sourceType)) return false;
        return true;
    });
});

const filteredCount = computed(() => filtered.value.length);

function formatDate(d) {
    const [y, m] = d.split("-");
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(m)]} ${y}`;
}
</script>

<template>
    <div class="evidence-inner">
        <div class="evidence-header">
            <span class="evidence-label">AI EVIDENCE</span>
            <h2 class="evidence-title">AIによる変革は<br/>すでに始まっている</h2>
        </div>

        <!-- Filters -->
        <div class="filters">
            <!-- Period -->
            <div class="filter-row">
                <span class="filter-title">時期</span>
                <div class="filter-chips">
                    <button
                        v-for="[key, label] in periods" :key="key"
                        class="chip" :class="{ active: activePeriod === key }"
                        @click="activePeriod = key"
                    >{{ label }}</button>
                </div>
            </div>
            <!-- Category -->
            <div class="filter-row">
                <span class="filter-title">カテゴリ</span>
                <div class="filter-chips">
                    <button
                        v-for="(label, key) in categoryLabels" :key="key"
                        class="chip cat-chip" :class="{ active: activeCategories.has(key) }"
                        :style="activeCategories.has(key) ? { borderColor: categoryColors[key], color: categoryColors[key] } : {}"
                        @click="toggleCategory(key)"
                    >{{ label }}</button>
                </div>
            </div>
            <!-- Source Type -->
            <div class="filter-row">
                <span class="filter-title">発信者</span>
                <div class="filter-chips">
                    <button
                        v-for="(label, key) in sourceTypeLabels" :key="key"
                        class="chip" :class="{ active: activeSourceTypes.has(key) }"
                        @click="toggleSourceType(key)"
                    >{{ label }}</button>
                </div>
            </div>
            <div class="filter-count">{{ filteredCount }}件</div>
        </div>

        <!-- Grid -->
        <div class="evidence-grid-wrap">
            <div class="evidence-grid">
                <a
                    v-for="(d, i) in filtered" :key="d.date + i"
                    class="evidence-card"
                    :href="d.url"
                    target="_blank"
                    rel="noopener"
                >
                    <!-- Tags -->
                    <div class="card-tags">
                        <span class="tag cat-tag" :style="{ background: categoryColors[d.category] + '15', color: categoryColors[d.category], borderColor: categoryColors[d.category] + '30' }">
                            {{ categoryLabels[d.category] }}
                        </span>
                        <span class="tag src-tag">{{ sourceTypeLabels[d.sourceType] }}</span>
                    </div>
                    <!-- Who -->
                    <div class="card-who">
                        <span class="card-name">{{ d.nameJa }}</span>
                        <span class="card-title">{{ d.title }}</span>
                    </div>
                    <!-- Content -->
                    <div class="card-ja">{{ d.ja }}</div>
                    <div class="card-quote">"{{ d.quote }}"</div>
                    <!-- Footer -->
                    <div class="card-footer">
                        <span class="card-date">{{ formatDate(d.date) }}</span>
                        <span class="card-source">
                            <!-- Source type icon -->
                            <svg v-if="d.type === 'video'" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"/></svg>
                            <svg v-else-if="d.type === 'report'" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            <svg v-else-if="d.type === 'blog'" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
                            <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                            {{ d.source }}
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left:2px"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                        </span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.evidence-inner { width: 100%; }
.evidence-header { text-align: center; max-width: 600px; margin: 0 auto 0.8rem; padding: 0 2rem; }
.evidence-label { display: inline-block; font-size: 0.7rem; letter-spacing: 0.25em; color: #999; margin-bottom: 0.6rem; padding: 4px 12px; border: 1px solid rgba(0,0,0,0.08); border-radius: 100px; }
.evidence-title { font-size: clamp(1.1rem, 2.5vw, 1.5rem); font-weight: 700; letter-spacing: -0.02em; line-height: 1.6; color: #111; }

/* Filters */
.filters { max-width: 1200px; margin: 0 auto 0.6rem; padding: 0 2rem; }
.filter-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem; flex-wrap: wrap; }
.filter-title { font-size: 0.62rem; font-weight: 600; color: #999; min-width: 50px; letter-spacing: 0.05em; }
.filter-chips { display: flex; gap: 0.3rem; flex-wrap: wrap; }
.chip {
    padding: 2px 10px;
    font-size: 0.65rem;
    font-weight: 500;
    color: #aaa;
    background: none;
    border: 1px solid rgba(0,0,0,0.06);
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.15s;
    font-family: inherit;
    white-space: nowrap;
}
.chip:hover { color: #666; border-color: rgba(0,0,0,0.15); }
.chip.active { color: #111; background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.18); }
.cat-chip.active { background: transparent; }
.filter-count { font-size: 0.6rem; color: #ccc; text-align: right; }

/* Grid */
.evidence-grid-wrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    height: calc(100vh - 340px);
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(0,0,0,0.08) transparent;
}
.evidence-grid-wrap::-webkit-scrollbar { width: 3px; }
.evidence-grid-wrap::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 3px; }
.evidence-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 0.7rem;
    padding-bottom: 1rem;
    /* subgrid: 各カードの行を5行で統一（tags, who, ja, quote, footer） */
    grid-auto-rows: auto;
}
.evidence-card {
    background: rgba(255,255,255,0.5);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 12px;
    padding: 1rem 0.9rem 0.8rem;
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 5;
    gap: 0.35rem;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
}
.evidence-card:hover {
    border-color: rgba(0,0,0,0.12);
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    transform: translateY(-1px);
}

/* Tags */
.card-tags { display: flex; gap: 0.3rem; flex-wrap: wrap; align-self: start; }
.tag {
    font-size: 0.55rem;
    font-weight: 600;
    padding: 1px 7px;
    border-radius: 100px;
    letter-spacing: 0.02em;
}
.cat-tag { border: 1px solid; }
.src-tag { background: rgba(0,0,0,0.04); color: #888; }

/* Card content */
.card-who { display: flex; flex-direction: column; gap: 0.05rem; align-self: start; }
.card-name { font-size: 0.78rem; font-weight: 700; color: #111; }
.card-title { font-size: 0.6rem; color: #999; }
.card-ja { font-size: 0.82rem; font-weight: 600; line-height: 1.6; color: #111; align-self: start; }
.card-quote { font-size: 0.68rem; line-height: 1.5; color: #aaa; font-style: italic; align-self: start; }
.card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 0.3rem; align-self: end; }
.card-date { font-size: 0.58rem; color: #ccc; font-family: monospace; }
.card-source {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 0.58rem;
    color: #bbb;
    transition: color 0.2s;
}
.evidence-card:hover .card-source { color: #666; }

@media (max-width: 640px) {
    .evidence-grid { grid-template-columns: 1fr; }
    .evidence-grid-wrap { padding: 0 1rem; height: calc(100vh - 360px); }
    .filters { padding: 0 1rem; }
    .filter-row { gap: 0.3rem; }
}
</style>
