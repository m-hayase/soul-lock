<script setup>
import { ref, computed } from "vue";
import qaData from "./data/vc-qa.json";

const activeCategory = ref("");
const expandedId = ref(null);
const searchQuery = ref("");

const categoryLabels = {
    market: "市場",
    product: "プロダクト",
    technology: "技術",
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
    business: "#f59e0b",
    competition: "#ec4899",
    team: "#10b981",
    funding: "#6366f1",
    vision: "#14b8a6",
    risk: "#f97316",
    traction: "#06b6d4",
};

// Default to first category
if (!activeCategory.value) {
    activeCategory.value = "market";
}

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
    expandedId.value = expandedId.value === id ? null : id;
}

function expandAll() {
    expandedId.value = -1; // special value: expand all
}

function collapseAll() {
    expandedId.value = null;
}

function isExpanded(id) {
    return expandedId.value === -1 || expandedId.value === id;
}
</script>

<template>
    <div class="qa-inner">
        <div class="qa-header">
            <span class="qa-label">INVESTOR Q&A</span>
            <h2 class="qa-title">
                VCからの想定質問<br />100の回答を準備しています
            </h2>
        </div>

        <!-- Search -->
        <div class="qa-search-wrap">
            <input
                v-model="searchQuery"
                class="qa-search"
                type="text"
                placeholder="質問を検索..."
            />
        </div>

        <!-- Category Tabs -->
        <div class="qa-tabs">
            <button
                v-for="(label, key) in categoryLabels"
                :key="key"
                class="qa-tab"
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
        <div class="qa-controls">
            <span class="qa-count">{{ filtered.length }}件</span>
            <div class="qa-actions">
                <button class="qa-action" @click="expandAll">すべて開く</button>
                <button class="qa-action" @click="collapseAll">
                    すべて閉じる
                </button>
            </div>
        </div>

        <!-- QA List -->
        <div class="qa-list-wrap">
            <div class="qa-list">
                <div
                    v-for="item in filtered"
                    :key="item.id"
                    class="qa-item"
                    :class="{ expanded: isExpanded(item.id) }"
                >
                    <button class="qa-question" @click="toggleExpand(item.id)">
                        <span
                            class="qa-cat-dot"
                            :style="{
                                background: categoryColors[item.category],
                            }"
                        />
                        <span class="qa-num">Q{{ item.id }}</span>
                        <span class="qa-q-text">{{ item.q }}</span>
                        <i
                            class="material-icons-outlined qa-chevron"
                            :class="{ open: isExpanded(item.id) }"
                            style="font-size: 18px;"
                        >expand_more</i>
                    </button>
                    <div
                        v-if="isExpanded(item.id)"
                        class="qa-answer"
                    >
                        <p>{{ item.a }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.qa-inner {
    width: 100%;
}
.qa-header {
    text-align: center;
    max-width: 600px;
    margin: 0 auto 0.8rem;
    padding: 0 2rem;
}
.qa-label {
    display: inline-block;
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    color: #999;
    margin-bottom: 0.6rem;
    padding: 4px 12px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 100px;
}
.qa-title {
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.6;
    color: #111;
}

/* Search */
.qa-search-wrap {
    max-width: 1200px;
    margin: 0 auto 0.6rem;
    padding: 0 2rem;
}
.qa-search {
    width: 100%;
    max-width: 400px;
    padding: 6px 14px;
    font-size: 0.72rem;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 100px;
    background: rgba(255, 255, 255, 0.5);
    outline: none;
    transition: border-color 0.2s;
    font-family: inherit;
}
.qa-search:focus {
    border-color: rgba(0, 0, 0, 0.2);
}

/* Tabs */
.qa-tabs {
    max-width: 1200px;
    margin: 0 auto 0.5rem;
    padding: 0 2rem;
    display: flex;
    gap: 0.3rem;
    flex-wrap: wrap;
}
.qa-tab {
    padding: 3px 10px;
    font-size: 0.62rem;
    font-weight: 500;
    color: #aaa;
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
.qa-tab:hover {
    color: #666;
    border-color: rgba(0, 0, 0, 0.15);
}
.qa-tab.active {
    background: transparent;
}
.tab-count {
    font-size: 0.55rem;
    opacity: 0.6;
}

/* Controls */
.qa-controls {
    max-width: 1200px;
    margin: 0 auto 0.4rem;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.qa-count {
    font-size: 0.6rem;
    color: #ccc;
}
.qa-actions {
    display: flex;
    gap: 0.5rem;
}
.qa-action {
    font-size: 0.58rem;
    color: #bbb;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    transition: color 0.2s;
}
.qa-action:hover {
    color: #666;
}

/* QA List */
.qa-list-wrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    height: calc(100vh - 370px);
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.08) transparent;
}
.qa-list-wrap::-webkit-scrollbar {
    width: 3px;
}
.qa-list-wrap::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.08);
    border-radius: 3px;
}
.qa-list {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding-bottom: 1rem;
}

.qa-item {
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    overflow: hidden;
    transition:
        border-color 0.2s,
        box-shadow 0.2s;
}
.qa-item:hover {
    border-color: rgba(0, 0, 0, 0.1);
}
.qa-item.expanded {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.qa-question {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 0.8rem;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    text-align: left;
}
.qa-cat-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
}
.qa-num {
    font-size: 0.6rem;
    font-weight: 600;
    color: #ccc;
    font-family: monospace;
    flex-shrink: 0;
    min-width: 28px;
}
.qa-q-text {
    font-size: 0.78rem;
    font-weight: 600;
    color: #222;
    flex: 1;
    line-height: 1.5;
}
.qa-chevron {
    flex-shrink: 0;
    color: #ccc;
    transition: transform 0.2s;
}
.qa-chevron.open {
    transform: rotate(180deg);
}

.qa-answer {
    padding: 0 0.8rem 0.7rem 2.8rem;
    animation: fadeIn 0.2s ease;
}
.qa-answer p {
    font-size: 0.74rem;
    line-height: 1.8;
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
    .qa-list-wrap {
        padding: 0 1rem;
        height: calc(100vh - 390px);
    }
    .qa-tabs {
        padding: 0 1rem;
    }
    .qa-search-wrap {
        padding: 0 1rem;
    }
    .qa-controls {
        padding: 0 1rem;
    }
    .qa-answer {
        padding-left: 1.5rem;
    }
}
</style>
