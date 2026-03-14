<script setup>
import { ref, computed } from "vue";
import qaData from "./data/vc-qa.json";

const activeCategory = ref("");
const expandedIds = ref(new Set());
const searchQuery = ref("");

const categoryLabels = {
    market: "市場",
    product: "プロダクト",
    technology: "技術",
    security: "セキュリティ",
    business: "ビジネスモデル",
    competition: "競合",
    team: "チーム",
    funding: "資金調達",
    vision: "ビジョン",
    risk: "リスク",
    traction: "トラクション",
};
const categoryColors = {
    market: "#ef4444",
    product: "#3b82f6",
    technology: "#8b5cf6",
    security: "#059669",
    business: "#f59e0b",
    competition: "#ec4899",
    team: "#10b981",
    funding: "#6366f1",
    vision: "#14b8a6",
    risk: "#f97316",
    traction: "#06b6d4",
};

const categoryCounts = computed(() => {
    const counts = {};
    for (const item of qaData) {
        counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
});

const filtered = computed(() => {
    let items = qaData;
    if (activeCategory.value) {
        items = items.filter((d) => d.category === activeCategory.value);
    }
    if (searchQuery.value.trim()) {
        const q = searchQuery.value.trim().toLowerCase();
        items = items.filter(
            (d) =>
                d.q.toLowerCase().includes(q) ||
                d.a.toLowerCase().includes(q),
        );
    }
    return items;
});

function toggleExpand(id) {
    const s = new Set(expandedIds.value);
    if (s.has(id)) s.delete(id);
    else s.add(id);
    expandedIds.value = s;
}

function expandAll() {
    expandedIds.value = new Set(filtered.value.map((d) => d.id));
}

function collapseAll() {
    expandedIds.value = new Set();
}
</script>

<template>
    <div class="qa-page">
        <div class="qa-page-header">
            <span class="qa-page-label">INVESTOR Q&A</span>
            <h1 class="qa-page-title">想定質問 {{ qaData.length }}問</h1>
            <p class="qa-page-sub">
                VCからの質問に対する回答を10カテゴリに分類して準備しています
            </p>
        </div>

        <!-- Search -->
        <div class="qa-page-search-wrap">
            <input
                v-model="searchQuery"
                class="qa-page-search"
                type="text"
                placeholder="キーワードで質問を検索..."
            />
        </div>

        <!-- Category Tabs -->
        <div class="qa-page-tabs">
            <button
                class="qa-page-tab"
                :class="{ active: activeCategory === '' }"
                @click="activeCategory = ''"
            >
                すべて
                <span class="tab-count">{{ qaData.length }}</span>
            </button>
            <button
                v-for="(label, key) in categoryLabels"
                :key="key"
                class="qa-page-tab"
                :class="{ active: activeCategory === key }"
                :style="
                    activeCategory === key
                        ? {
                              borderColor: categoryColors[key],
                              color: categoryColors[key],
                          }
                        : {}
                "
                @click="activeCategory = key"
            >
                {{ label }}
                <span class="tab-count">{{ categoryCounts[key] || 0 }}</span>
            </button>
        </div>

        <!-- Controls -->
        <div class="qa-page-controls">
            <span class="qa-page-count">{{ filtered.length }}件表示</span>
            <div class="qa-page-actions">
                <button class="qa-page-action" @click="expandAll">
                    すべて開く
                </button>
                <button class="qa-page-action" @click="collapseAll">
                    すべて閉じる
                </button>
            </div>
        </div>

        <!-- QA List -->
        <div class="qa-page-list">
            <div
                v-for="item in filtered"
                :key="item.id"
                class="qa-page-item"
                :class="{ expanded: expandedIds.has(item.id) }"
            >
                <button
                    class="qa-page-question"
                    @click="toggleExpand(item.id)"
                >
                    <span
                        class="qa-page-cat-badge"
                        :style="{
                            background: categoryColors[item.category] + '12',
                            color: categoryColors[item.category],
                            borderColor: categoryColors[item.category] + '30',
                        }"
                    >
                        {{ categoryLabels[item.category] }}
                    </span>
                    <span class="qa-page-num">Q{{ item.id }}</span>
                    <span class="qa-page-q-text">{{ item.q }}</span>
                    <svg
                        class="qa-page-chevron"
                        :class="{ open: expandedIds.has(item.id) }"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
                <div
                    v-if="expandedIds.has(item.id)"
                    class="qa-page-answer"
                >
                    <p>{{ item.a }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.qa-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem 2rem 4rem;
}
.qa-page-header {
    text-align: center;
    margin-bottom: 2rem;
}
.qa-page-label {
    display: inline-block;
    font-size: 0.72rem;
    letter-spacing: 0.25em;
    color: #999;
    margin-bottom: 0.8rem;
    padding: 4px 14px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 100px;
}
.qa-page-title {
    font-size: clamp(1.6rem, 3.5vw, 2.2rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.4;
    color: #111;
    margin-bottom: 0.5rem;
}
.qa-page-sub {
    font-size: 0.88rem;
    color: #888;
    line-height: 1.6;
}

/* Search */
.qa-page-search-wrap {
    margin-bottom: 1.2rem;
}
.qa-page-search {
    width: 100%;
    padding: 10px 18px;
    font-size: 0.85rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    outline: none;
    transition: border-color 0.2s;
    font-family: inherit;
}
.qa-page-search:focus {
    border-color: rgba(0, 0, 0, 0.25);
}

/* Tabs */
.qa-page-tabs {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
}
.qa-page-tab {
    padding: 5px 12px;
    font-size: 0.72rem;
    font-weight: 500;
    color: #999;
    background: none;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.15s;
    font-family: inherit;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 4px;
}
.qa-page-tab:hover {
    color: #555;
    border-color: rgba(0, 0, 0, 0.15);
}
.qa-page-tab.active {
    color: #111;
    background: rgba(0, 0, 0, 0.04);
    border-color: rgba(0, 0, 0, 0.18);
}
.tab-count {
    font-size: 0.6rem;
    opacity: 0.5;
}

/* Controls */
.qa-page-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.8rem;
}
.qa-page-count {
    font-size: 0.72rem;
    color: #bbb;
}
.qa-page-actions {
    display: flex;
    gap: 0.8rem;
}
.qa-page-action {
    font-size: 0.7rem;
    color: #bbb;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    transition: color 0.2s;
}
.qa-page-action:hover {
    color: #555;
}

/* List */
.qa-page-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.qa-page-item {
    background: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 14px;
    overflow: hidden;
    transition:
        border-color 0.2s,
        box-shadow 0.2s;
}
.qa-page-item:hover {
    border-color: rgba(0, 0, 0, 0.12);
}
.qa-page-item.expanded {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.qa-page-question {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 1rem;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    text-align: left;
}
.qa-page-cat-badge {
    font-size: 0.58rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 100px;
    border: 1px solid;
    flex-shrink: 0;
    white-space: nowrap;
}
.qa-page-num {
    font-size: 0.65rem;
    font-weight: 600;
    color: #ccc;
    font-family: monospace;
    flex-shrink: 0;
    min-width: 30px;
}
.qa-page-q-text {
    font-size: 0.88rem;
    font-weight: 600;
    color: #222;
    flex: 1;
    line-height: 1.5;
}
.qa-page-chevron {
    flex-shrink: 0;
    color: #ccc;
    transition: transform 0.2s;
}
.qa-page-chevron.open {
    transform: rotate(180deg);
}

.qa-page-answer {
    padding: 0 1rem 1rem 6.5rem;
    animation: fadeIn 0.2s ease;
}
.qa-page-answer p {
    font-size: 0.85rem;
    line-height: 1.9;
    color: #555;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-4px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 640px) {
    .qa-page {
        padding: 2rem 1rem 3rem;
    }
    .qa-page-answer {
        padding-left: 1rem;
    }
    .qa-page-cat-badge {
        display: none;
    }
}
</style>
