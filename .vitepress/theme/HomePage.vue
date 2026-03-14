<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import NetworkAnimation from "./NetworkAnimation.vue";
import AiEvidenceSection from "./AiEvidenceSection.vue";
import VcQaSection from "./VcQaSection.vue";

const loaded = ref(false);
const titleLinesVisible = ref([false, false, false]);
const subtitleVisible = ref(false);
const taglineVisible = ref(false);
const scrollIndicator = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);

// ============================
// テキストデータ（編集はここだけ）
// ============================

// --- Brand ---
const logoName = "Soul.lock";

// --- Hero ---
const brandName = "Still the soul remains";
const titleLines = ["Soul.lock"];
const subtitle = "After AI";
const tagline = "機能の価値がゼロになる時代、データ統合だけが残る";
const heroCta = "Talk to us";

// --- Problem ---
const problemHeading = "機能の価値は、\nゼロになる";
const problems = [
    {
        num: "トークン化",
        label: "開発コストの崩壊",
        desc: "システム開発・保守・サポートがトークンに置き換わる。誰でも同等の機能を構築できる時代が来る",
    },
    {
        num: "データ統合",
        label: "AIが機能する唯一の条件",
        desc: "分散したデータではAIは部分最適しかできない。全業務が単一DBに統合されて初めて、AIは横断的に判断・実行できる",
    },
    {
        num: "必然",
        label: "誰かが必ずやる",
        desc: "この事実に気づけば、答えはALL-IN-ONEに行き着く。ならば、我々がやる",
    },
];

const solutions = [
    {
        num: "01",
        title: "AIプロフェッショナル",
        desc: "モジュールごとに専門AIが常駐。会計・人事・営業のプロとして対話し、業務を実行する。スキル層が処理し、システム層がデータの健全性を担保する3層構造。",
    },
    {
        num: "02",
        title: "ALL-IN-ONE統合基盤",
        desc: "20分野・230超の業務機能・600超のデータモデルが単一DBに統合。連携コストゼロでAIが業務全体を横断参照。コア部分は約7割が完成済み。",
    },
    {
        num: "03",
        title: "NEO SNS — 完全情報マーケット",
        desc: "企業の完全情報を掲載し、信用スコアとAI比較で取引先が選ばれる。ハッタリが通用しない透明な市場。載っていない企業は選択肢に入らなくなる。",
    },
];

const advantages = [
    {
        value: "7割",
        label: "コア完成済み",
        desc: "20分野・230超の業務機能。600超のデータモデルが単一DBで稼働中。",
    },
    {
        value: "最適解",
        label: "複製不可能なデータ",
        desc: "業務×スキル×モデルの最適化データが蓄積。後発には複製できない企業価値の核。",
    },
    {
        value: "NW効果",
        label: "完全情報マーケット",
        desc: "企業間AI取引+信用スコア+JPYコイン決済。参加圧力で指数関数的に拡大。",
    },
];

// --- Modules (完成済み汎用モジュール) ---
const modules = [
    { icon: "account_balance", name: "会計・財務", features: "仕訳・元帳・決算・経費・固定資産・予実・請求・見積・消込・自動仕訳" },
    { icon: "badge", name: "人事・労務・給与", features: "勤怠・シフト・有給・残業・給与計算・賞与・手当・評価・OKR・オンボーディング" },
    { icon: "handshake", name: "営業・CRM・MA", features: "商談・パイプライン・リードスコアリング・メールシーケンス・A/Bテスト" },
    { icon: "local_shipping", name: "購買・在庫", features: "発注・分納・仕入先評価・倉庫管理・ロット・BOM・組立・原価積層" },
    { icon: "forum", name: "コミュニケーション", features: "チャット・メール・Wiki・ファイル管理・カレンダー・施設予約" },
    { icon: "task_alt", name: "業務基盤", features: "タスク・ワークフロー・多段階承認・契約・プロジェクト・AI基盤・分析" },
];

// --- Industry Example (業種別適応の一例としてVC) ---
const industryExample = {
    title: "業種別適応例 — VCエコシステム",
    sub: "汎用モジュールの上に業種特化機能がシームレスに連携。64モデル・35サービスが単一DBで繋がる",
    groups: [
        {
            icon: "account_balance",
            name: "VCファンド運営",
            items: "IC・キャピタルコール・ウォーターフォール・IRR/TVPI自動算出・マネジメントフィー・LP四半期報告",
        },
        {
            icon: "people",
            name: "LP管理",
            items: "LPポータル・資本勘定明細書・セカンダリー取引・税務書類・GP-LP通信",
        },
        {
            icon: "rocket_launch",
            name: "ポートフォリオ企業",
            items: "キャップテーブル・ストックオプション・KPI(MRR/ARR/NDR等)・EXIT準備・取締役会・ESG評価",
        },
    ],
    flow: "KPI報告 → バリュエーション自動更新 → ファンドNAV・IRR即時反映 → LPポータルでリアルタイム確認 → 四半期報告書に自動統合",
};

// --- Solution ---
const solutionHeading = "What we build";
const solutionSub = "AIが業務を遂行することを前提にゼロから設計された統合業務プラットフォーム";
const screenshotLabel = "Product Preview — Confidential";

// --- Why Us ---
const whyHeading = "Why SOUL.lock";

// --- Vision ---
const visionQuote = "あるべき姿から逆算して設計する。現在の延長線上には、この答えはない";
const founderName = "早瀬 基二";
const founderRole = "Founder & CEO";
const stageLabel = "Pre-Seed — 2026年8月ローンチ目標";

// --- CTA ---
const ctaHeading = "Let's talk";
const ctaDesc =
    "30分のミーティングで、実動作デモとビジネスモデルをご説明します";
const ctaButton = "ミーティングを予約する";
const ctaEmail = "contact@because-and.com";

// --- Nav Menu ---
const navLinks = [
    { text: "ビジョン", href: "/soul-lock/vision/" },
    { text: "メッセージ", href: "/soul-lock/message" },
    { text: "プロフィール", href: "/soul-lock/profile" },
    { text: "コンタクト", href: "/soul-lock/contact" },
];

// --- Footer ---
const footLogo = "SOUL.lock";
const footCopy = "© 2026 Soul.lock";
const footTag = "Still the soul remains";
const marqueeText = "SOUL.lock — Still the soul remains — ";

// ============================

let observer = null;

function onMouse(e) {
    mouseX.value = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY.value = (e.clientY / window.innerHeight - 0.5) * 2;
}

function initTitle() {
    titleLines.forEach((_, i) => {
        setTimeout(
            () => {
                titleLinesVisible.value[i] = true;
            },
            200 + i * 350,
        );
    });
    const base = 200 + titleLines.length * 350;
    setTimeout(() => {
        subtitleVisible.value = true;
    }, base + 300);
    setTimeout(() => {
        taglineVisible.value = true;
    }, base + 700);
    setTimeout(() => {
        scrollIndicator.value = true;
    }, base + 1200);
}

function setupObserver() {
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) e.target.classList.add("in-view");
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".obs").forEach((el) => observer.observe(el));
}

onMounted(() => {
    window.addEventListener("mousemove", onMouse);
    setTimeout(() => {
        loaded.value = true;
        initTitle();
    }, 200);
    setTimeout(setupObserver, 600);
});

onUnmounted(() => {
    window.removeEventListener("mousemove", onMouse);
    if (observer) observer.disconnect();
});
</script>

<template>
    <div class="page" :class="{ loaded }">
        <!-- ========== NETWORK ANIMATION (削除時: このブロックとimportを消すだけ) ========== -->
        <NetworkAnimation />

        <!-- ========== SOUL BACKGROUND ========== -->
        <div class="soul-bg" aria-hidden="true">
            <div
                class="soul sa"
                :style="{
                    transform: `translate(${mouseX * 12}px, ${mouseY * 12}px)`,
                }"
            />
            <div
                class="soul sb"
                :style="{
                    transform: `translate(${mouseX * -8}px, ${mouseY * -8}px)`,
                }"
            />
            <div
                class="soul sc"
                :style="{
                    transform: `translate(${mouseX * 6}px, ${mouseY * -10}px)`,
                }"
            />
            <div class="soul sd" />
            <div class="soul se" />
            <div class="wisp wA" />
            <div class="wisp wB" />
            <div class="wisp wC" />
        </div>

        <!-- ========== NAV ========== -->
        <nav class="top-nav">
            <span class="nav-logo">{{ logoName }}</span>
            <div class="nav-links">
                <a
                    v-for="(link, i) in navLinks"
                    :key="i"
                    :href="link.href"
                    class="nav-link"
                    >{{ link.text }}</a
                >
            </div>
        </nav>

        <!-- ========== 1. HERO ========== -->
        <section class="slide hero">
            <div class="hero-inner">
                <p class="hero-label obs">
                    <span class="label-line" />
                    <span>{{ brandName }}</span>
                </p>
                <h1 class="hero-title">
                    <span
                        v-for="(line, i) in titleLines"
                        :key="i"
                        class="title-line"
                        :class="{ show: titleLinesVisible[i] }"
                        :style="{ transitionDelay: i * 0.15 + 's' }"
                        >{{ line }}</span
                    >
                </h1>
                <p class="hero-sub" :class="{ show: subtitleVisible }">
                    {{ subtitle }}
                </p>
                <p class="hero-tag" :class="{ show: taglineVisible }">
                    {{ tagline }}
                </p>
                <div class="hero-cta" :class="{ show: taglineVisible }">
                    <a href="#contact" class="btn-primary">
                        <span>{{ heroCta }}</span>
                        <i class="material-icons-outlined" style="font-size: 16px;">north_east</i>
                    </a>
                </div>
            </div>
            <div class="scroll-hint" :class="{ show: scrollIndicator }">
                <div class="scroll-dot" />
                <span>Scroll</span>
            </div>
        </section>

        <!-- ========== 2. PROBLEM ========== -->
        <section class="slide problem">
            <div class="problem-inner">
                <div class="sec-head obs">
                    <span class="sec-num">001</span>
                    <h2 v-html="problemHeading.replace('\n', '<br/>')"></h2>
                </div>
                <div class="problem-grid">
                    <div
                        v-for="(p, i) in problems"
                        :key="i"
                        class="problem-card glass-panel obs"
                        :style="{ transitionDelay: i * 0.15 + 's' }"
                    >
                        <div class="problem-top">
                            <span class="problem-num">{{ p.num }}</span>
                            <span class="problem-label">{{ p.label }}</span>
                        </div>
                        <p class="problem-desc">{{ p.desc }}</p>
                        <span v-if="p.note" class="problem-note">{{
                            p.note
                        }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 3. SOLUTION ========== -->
        <section class="slide solution">
            <div class="solution-inner">
                <div class="sec-head obs">
                    <span class="sec-num">002</span>
                    <h2>{{ solutionHeading }}</h2>
                    <p class="sec-sub">{{ solutionSub }}</p>
                </div>
                <div class="solution-grid">
                    <div
                        v-for="(s, i) in solutions"
                        :key="i"
                        class="solution-card glass-panel obs"
                        :style="{ transitionDelay: i * 0.15 + 's' }"
                    >
                        <span class="feat-num">{{ s.num }}</span>
                        <h3>{{ s.title }}</h3>
                        <p>{{ s.desc }}</p>
                        <div class="feat-accent" />
                    </div>
                </div>
                <div class="solution-screenshot obs">
                    <div class="screenshot-placeholder glass-panel">
                        <div class="screenshot-blur">
                            <div class="screenshot-mock">
                                <div class="mock-sidebar" />
                                <div class="mock-main">
                                    <div class="mock-bar" />
                                    <div class="mock-content">
                                        <div class="mock-card" />
                                        <div class="mock-card" />
                                        <div class="mock-card" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span class="screenshot-label">{{
                            screenshotLabel
                        }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 3.5 MODULES ========== -->
        <section class="slide modules-section">
            <div class="modules-inner">
                <div class="sec-head obs">
                    <span class="sec-num">003</span>
                    <h2>20分野・230超の業務機能</h2>
                    <p class="sec-sub">コア部分は約7割が完成。600超のデータモデルが単一DBに統合済み</p>
                </div>
                <div class="modules-grid">
                    <div
                        v-for="(m, i) in modules"
                        :key="i"
                        class="module-card glass-panel obs"
                        :style="{ transitionDelay: i * 0.1 + 's' }"
                    >
                        <div class="module-header">
                            <i class="material-icons-outlined module-icon">{{ m.icon }}</i>
                            <h3>{{ m.name }}</h3>
                        </div>
                        <p class="module-features">{{ m.features }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 3.6 INDUSTRY EXAMPLE ========== -->
        <section class="slide industry-section">
            <div class="industry-inner">
                <div class="sec-head obs">
                    <span class="sec-num">004</span>
                    <h2>{{ industryExample.title }}</h2>
                    <p class="sec-sub">{{ industryExample.sub }}</p>
                </div>
                <div class="industry-grid">
                    <div
                        v-for="(g, i) in industryExample.groups"
                        :key="i"
                        class="industry-card glass-panel obs"
                        :style="{ transitionDelay: i * 0.12 + 's' }"
                    >
                        <div class="industry-card-header">
                            <i class="material-icons-outlined industry-icon">{{ g.icon }}</i>
                            <h3>{{ g.name }}</h3>
                        </div>
                        <p class="industry-items">{{ g.items }}</p>
                    </div>
                </div>
                <div class="industry-flow obs">
                    <p class="industry-flow-label">ALL-IN-ONEだからできる横断連携</p>
                    <p class="industry-flow-text">{{ industryExample.flow }}</p>
                </div>
            </div>
        </section>

        <!-- ========== 5. WHY US ========== -->
        <section class="slide why-us">
            <div class="why-inner">
                <div class="sec-head obs">
                    <span class="sec-num">005</span>
                    <h2>{{ whyHeading }}</h2>
                </div>
                <div class="why-grid">
                    <div
                        v-for="(a, i) in advantages"
                        :key="i"
                        class="why-card obs"
                        :style="{ transitionDelay: i * 0.12 + 's' }"
                    >
                        <span class="why-value">{{ a.value }}</span>
                        <span class="why-label">{{ a.label }}</span>
                        <p class="why-desc">{{ a.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 4.5 AI EVIDENCE ========== -->
        <section class="slide carousel-slide">
            <AiEvidenceSection />
        </section>

        <!-- ========== 4.6 VC Q&A ========== -->
        <section class="slide carousel-slide">
            <VcQaSection />
        </section>

        <!-- ========== 5. VISION / TEAM ========== -->
        <section class="slide vision">
            <div class="vision-card glass-panel obs">
                <span class="sec-num">006</span>
                <blockquote class="vision-quote">
                    "{{ visionQuote }}"
                </blockquote>
                <div class="founder-row">
                    <div class="founder-avatar" />
                    <div class="founder-info">
                        <span class="founder-name">{{ founderName }}</span>
                        <span class="founder-role">{{ founderRole }}</span>
                    </div>
                </div>
                <p class="vision-stage">{{ stageLabel }}</p>
            </div>
        </section>

        <!-- ========== 6. CTA ========== -->
        <section id="contact" class="slide cta">
            <div class="cta-card glass-panel obs">
                <h2>{{ ctaHeading }}</h2>
                <p class="cta-desc">{{ ctaDesc }}</p>
                <div class="cta-buttons">
                    <a :href="`mailto:${ctaEmail}`" class="btn-primary btn-lg">
                        <span>{{ ctaButton }}</span>
                        <i class="material-icons-outlined" style="font-size: 18px;">north_east</i>
                    </a>
                </div>
                <p class="cta-note">{{ ctaEmail }}</p>
            </div>
        </section>

        <!-- ========== FOOTER ========== -->
        <section class="slide foot-section">
            <footer class="foot-wrap">
                <div class="marquee-wrap">
                    <div class="marquee-track">
                        <div class="marquee-content">
                            <span v-for="i in 10" :key="i">{{
                                marqueeText
                            }}</span>
                        </div>
                    </div>
                </div>
                <div class="foot-inner glass-panel">
                    <div>
                        <span class="foot-logo">{{ footLogo }}</span>
                        <span class="foot-copy">{{ footCopy }}</span>
                    </div>
                    <span class="foot-tag">{{ footTag }}</span>
                </div>
            </footer>
        </section>
    </div>
</template>

<style scoped>
/* ===== NAV ===== */
.top-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2.5rem;
    background: rgba(250, 250, 250, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}
.nav-logo {
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #111;
}
.nav-links {
    display: flex;
    gap: 2rem;
}
.nav-link {
    font-size: 0.85rem;
    color: #888;
    text-decoration: none;
    letter-spacing: 0.04em;
    transition: color 0.3s;
}
.nav-link:hover {
    color: #111;
}

/* ===== RESET & BASE ===== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.page {
    height: 100vh;
    background: #fafafa;
    color: #111;
    font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
        sans-serif;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    opacity: 0;
    transition: opacity 0.8s ease;
}
.page.loaded {
    opacity: 1;
}

/* ===== SLIDE ===== */
.slide {
    min-height: 100vh;
    scroll-snap-align: start;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
}

/* ===== GLASS PANEL ===== */
.glass-panel {
    background: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(24px) saturate(1.2);
    -webkit-backdrop-filter: blur(24px) saturate(1.2);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    box-shadow:
        0 4px 30px rgba(0, 0, 0, 0.04),
        0 1px 2px rgba(0, 0, 0, 0.02);
}

/* ===== SOUL BACKGROUND ===== */
.soul-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}
.soul {
    position: absolute;
    border-radius: 50%;
    filter: blur(45px);
    transition: transform 0.5s ease-out;
}
.soul.sa {
    width: 550px;
    height: 550px;
    top: -8%;
    right: 5%;
    background: radial-gradient(
        circle,
        rgba(147, 51, 234, 0.35) 0%,
        rgba(79, 70, 229, 0.15) 40%,
        transparent 70%
    );
    animation: soulA 16s ease-in-out infinite;
}
.soul.sb {
    width: 450px;
    height: 450px;
    bottom: 5%;
    left: -3%;
    background: radial-gradient(
        circle,
        rgba(59, 130, 246, 0.3) 0%,
        rgba(6, 182, 212, 0.12) 40%,
        transparent 70%
    );
    animation: soulB 20s ease-in-out infinite;
}
.soul.sc {
    width: 400px;
    height: 400px;
    top: 35%;
    left: 25%;
    background: radial-gradient(
        circle,
        rgba(236, 72, 153, 0.28) 0%,
        rgba(244, 114, 182, 0.12) 40%,
        transparent 70%
    );
    animation: soulC 14s ease-in-out infinite;
}
.soul.sd {
    width: 300px;
    height: 300px;
    top: 60%;
    right: 15%;
    background: radial-gradient(
        circle,
        rgba(245, 158, 11, 0.25) 0%,
        rgba(251, 191, 36, 0.1) 40%,
        transparent 70%
    );
    animation: soulD 18s ease-in-out infinite;
}
.soul.se {
    width: 350px;
    height: 350px;
    top: 10%;
    left: 45%;
    background: radial-gradient(
        circle,
        rgba(16, 185, 129, 0.25) 0%,
        rgba(52, 211, 153, 0.1) 40%,
        transparent 70%
    );
    animation: soulE 22s ease-in-out infinite;
}
.wisp {
    position: absolute;
    filter: blur(25px);
}
.wisp.wA {
    width: 700px;
    height: 100px;
    top: 28%;
    left: -5%;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(147, 51, 234, 0.18) 30%,
        rgba(79, 70, 229, 0.22) 50%,
        rgba(147, 51, 234, 0.18) 70%,
        transparent 100%
    );
    border-radius: 50%;
    animation: wispA 14s ease-in-out infinite;
}
.wisp.wB {
    width: 600px;
    height: 80px;
    top: 58%;
    right: -8%;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(59, 130, 246, 0.15) 30%,
        rgba(236, 72, 153, 0.18) 50%,
        rgba(59, 130, 246, 0.15) 70%,
        transparent 100%
    );
    border-radius: 50%;
    animation: wispB 18s ease-in-out infinite;
}
.wisp.wC {
    width: 500px;
    height: 70px;
    top: 78%;
    left: 15%;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(16, 185, 129, 0.13) 30%,
        rgba(245, 158, 11, 0.16) 50%,
        rgba(16, 185, 129, 0.13) 70%,
        transparent 100%
    );
    border-radius: 50%;
    animation: wispC 20s ease-in-out infinite;
}

@keyframes soulA {
    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }
    30% {
        transform: translate(-40px, 50px) scale(1.12);
    }
    60% {
        transform: translate(20px, 80px) scale(0.95);
    }
}
@keyframes soulB {
    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }
    40% {
        transform: translate(50px, -40px) scale(1.1);
    }
    70% {
        transform: translate(-20px, -60px) scale(0.9);
    }
}
@keyframes soulC {
    0%,
    100% {
        transform: translate(0, 0);
    }
    50% {
        transform: translate(60px, -50px);
    }
}
@keyframes soulD {
    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }
    50% {
        transform: translate(-50px, 40px) scale(1.15);
    }
}
@keyframes soulE {
    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }
    50% {
        transform: translate(30px, 40px) scale(1.2);
    }
}
@keyframes wispA {
    0%,
    100% {
        transform: translateX(0) rotate(-5deg);
    }
    50% {
        transform: translateX(100px) rotate(-3deg);
    }
}
@keyframes wispB {
    0%,
    100% {
        transform: translateX(0) rotate(3deg);
    }
    50% {
        transform: translateX(-80px) rotate(5deg);
    }
}
@keyframes wispC {
    0%,
    100% {
        transform: translateX(0) rotate(-2deg);
    }
    50% {
        transform: translateX(60px) rotate(0deg);
    }
}

/* ===== OBSERVER ===== */
.obs {
    opacity: 0;
    transform: translateY(40px);
    transition:
        opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.obs.in-view {
    opacity: 1;
    transform: translateY(0);
}

/* ===== SECTION HEAD ===== */
.sec-head {
    margin-bottom: 3rem;
}
.sec-num {
    display: block;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: #bbb;
    margin-bottom: 0.8rem;
    font-family: monospace;
}
.sec-head h2 {
    font-size: clamp(1.6rem, 3.5vw, 2.4rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.5;
}
.sec-sub {
    font-size: 0.95rem;
    color: #888;
    margin-top: 0.8rem;
    letter-spacing: 0.02em;
}

/* ===== BUTTONS ===== */
.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    background: #111;
    color: #fff;
    border: 1px solid #111;
    border-radius: 100px;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    transition: all 0.4s ease;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
}
.btn-primary:hover {
    background: #333;
    border-color: #333;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
}
.btn-lg {
    padding: 18px 40px;
    font-size: 1rem;
}

/* ===== 1. HERO ===== */
.hero {
    flex-direction: column;
}
.hero-inner {
    text-align: center;
    padding: 0 2rem;
}

.hero-label {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 2rem;
    font-size: 0.82rem;
    letter-spacing: 0.2em;
    color: #555;
    text-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
}
.label-line {
    display: block;
    width: 36px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.4));
}
.hero-title {
    font-size: clamp(2.8rem, 8vw, 6rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin-bottom: 2rem;
    color: #000;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.5);
}
.title-line {
    display: block;
    opacity: 0;
    transform: translateY(40px);
    filter: blur(8px);
    transition:
        opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
        transform 1s cubic-bezier(0.16, 1, 0.3, 1),
        filter 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.title-line.show {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
}
.hero-sub {
    font-size: clamp(1.05rem, 2.2vw, 1.5rem);
    font-weight: 300;
    letter-spacing: 0.15em;
    color: #222;
    margin-bottom: 0.8rem;
    text-shadow: 0 0 16px rgba(255, 255, 255, 0.8);
    opacity: 0;
    transform: translateY(25px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.hero-sub.show {
    opacity: 1;
    transform: translateY(0);
}
.hero-tag {
    font-size: clamp(0.9rem, 1.6vw, 1.1rem);
    color: #444;
    text-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
    letter-spacing: 0.04em;
    margin-bottom: 2.5rem;
    opacity: 0;
    transform: translateY(25px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
}
.hero-tag.show {
    opacity: 1;
    transform: translateY(0);
}
.hero-cta {
    opacity: 0;
    transform: translateY(20px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
}
.hero-cta.show {
    opacity: 1;
    transform: translateY(0);
}

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
.scroll-hint.show {
    opacity: 1;
}
.scroll-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    animation: dotBounce 2s ease-in-out infinite;
}
@keyframes dotBounce {
    0%,
    100% {
        transform: translateY(0);
        opacity: 1;
    }
    50% {
        transform: translateY(12px);
        opacity: 0.3;
    }
}
.scroll-hint span {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    color: #bbb;
    text-transform: uppercase;
}

/* ===== 2. PROBLEM ===== */
.problem {
    flex-direction: column;
    padding: 4rem 2rem;
}
.problem-inner {
    max-width: 1000px;
    width: 100%;
}
.problem-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}
.problem-card {
    padding: 2.5rem 2rem;
    text-align: center;
    transition:
        transform 0.4s ease,
        box-shadow 0.4s ease;
}
.problem-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 36px rgba(0, 0, 0, 0.06);
}
.problem-top {
    margin-bottom: 1.2rem;
}
.problem-num {
    display: block;
    font-size: clamp(2rem, 3.5vw, 2.8rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #111;
}
.problem-label {
    display: block;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    color: #999;
    margin-top: 1.3rem;
    text-transform: uppercase;
}
.problem-desc {
    font-size: 0.88rem;
    line-height: 1.8;
    color: #666;
}
.problem-note {
    display: block;
    font-size: 0.65rem;
    color: #bbb;
    margin-top: 0.6rem;
}

/* ===== 3. SOLUTION ===== */
.solution {
    flex-direction: column;
    padding: 4rem 2rem;
}
.solution-inner {
    max-width: 1100px;
    width: 100%;
}
.solution-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-bottom: 3rem;
}
.solution-card {
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
    transition:
        transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 0.5s ease;
    cursor: default;
}
.solution-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.08);
}
.feat-num {
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    color: #ccc;
    font-family: monospace;
    margin-bottom: 1.2rem;
    display: block;
}
.solution-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
}
.solution-card p {
    font-size: 0.9rem;
    line-height: 1.85;
    color: #666;
}
.feat-accent {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(
        90deg,
        rgba(147, 51, 234, 0.4),
        rgba(59, 130, 246, 0.3),
        transparent
    );
    transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.solution-card:hover .feat-accent {
    width: 100%;
}

/* Screenshot preview (blurred mock) */
.solution-screenshot {
    text-align: center;
}
.screenshot-placeholder {
    display: inline-block;
    padding: 1.5rem;
    max-width: 700px;
    width: 100%;
}
.screenshot-blur {
    border-radius: 12px;
    overflow: hidden;
    filter: blur(3px);
    opacity: 0.7;
}
.screenshot-mock {
    display: flex;
    height: 200px;
    background: #f0f0f0;
    border-radius: 8px;
    overflow: hidden;
}
.mock-sidebar {
    width: 60px;
    background: linear-gradient(180deg, #e8e8e8, #ddd);
}
.mock-main {
    flex: 1;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.mock-bar {
    height: 24px;
    background: #e0e0e0;
    border-radius: 6px;
}
.mock-content {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
}
.mock-card {
    background: #e8e8e8;
    border-radius: 8px;
}
.screenshot-label {
    display: block;
    font-size: 0.7rem;
    color: #bbb;
    letter-spacing: 0.1em;
    margin-top: 1rem;
}

/* ===== 3.5 MODULES ===== */
.modules-section {
    flex-direction: column;
    padding: 4rem 2rem;
}
.modules-inner {
    max-width: 1100px;
    width: 100%;
}
.modules-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
}
.module-card {
    padding: 1.8rem 1.5rem;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.module-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 36px rgba(0, 0, 0, 0.06);
}
.module-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 0.8rem;
}
.module-icon {
    font-size: 1.3rem;
    color: #9333ea;
    opacity: 0.7;
}
.module-header h3 {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.01em;
}
.module-features {
    font-size: 0.82rem;
    line-height: 1.7;
    color: #888;
}

/* ===== 3.6 INDUSTRY EXAMPLE ===== */
.industry-section {
    flex-direction: column;
    padding: 4rem 2rem;
}
.industry-inner {
    max-width: 1100px;
    width: 100%;
}
.industry-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
}
.industry-card {
    padding: 2rem 1.8rem;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.industry-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 36px rgba(0, 0, 0, 0.06);
}
.industry-card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 0.8rem;
}
.industry-icon {
    font-size: 1.3rem;
    color: #4f46e5;
    opacity: 0.7;
}
.industry-card-header h3 {
    font-size: 1.05rem;
    font-weight: 600;
}
.industry-items {
    font-size: 0.85rem;
    line-height: 1.8;
    color: #666;
}
.industry-flow {
    text-align: center;
    padding: 1.5rem 2rem;
    background: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 12px;
}
.industry-flow-label {
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    color: #999;
    margin-bottom: 0.5rem;
}
.industry-flow-text {
    font-size: 0.9rem;
    color: #555;
    letter-spacing: 0.02em;
}

/* ===== 5. WHY US ===== */
.why-us {
    flex-direction: column;
    padding: 4rem 2rem;
}
.why-inner {
    max-width: 1000px;
    width: 100%;
}
.why-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}
.why-card {
    text-align: center;
}
.why-value {
    display: block;
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #111;
    line-height: 1.2;
}
.why-label {
    display: block;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    color: #999;
    text-transform: uppercase;
    margin: 0.6rem 0 1rem;
}
.why-desc {
    font-size: 0.9rem;
    line-height: 1.7;
    color: #666;
}

/* ===== 5. VISION / TEAM ===== */
.vision {
    padding: 4rem 2rem;
}
.vision-card {
    max-width: 650px;
    width: 100%;
    padding: 4rem 3.5rem;
    text-align: center;
}
.vision-quote {
    font-size: clamp(1.2rem, 2.5vw, 1.7rem);
    font-weight: 500;
    line-height: 1.7;
    color: #222;
    margin: 1.5rem 0 2.5rem;
    font-style: normal;
    border: none;
    padding: 0;
}
.founder-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: 1.5rem;
}
.founder-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(
        135deg,
        rgba(147, 51, 234, 0.2),
        rgba(59, 130, 246, 0.2)
    );
}
.founder-info {
    text-align: left;
}
.founder-name {
    display: block;
    font-size: 0.95rem;
    font-weight: 600;
    color: #111;
}
.founder-role {
    display: block;
    font-size: 0.75rem;
    color: #999;
    letter-spacing: 0.06em;
}
.vision-stage {
    font-size: 0.78rem;
    color: #bbb;
    letter-spacing: 0.1em;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
}

/* ===== 6. CTA ===== */
.cta {
    padding: 4rem 2rem;
}
.cta-card {
    max-width: 600px;
    width: 100%;
    padding: 4rem 3rem;
    text-align: center;
}
.cta-card h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-bottom: 1.2rem;
}
.cta-desc {
    font-size: 0.95rem;
    line-height: 1.8;
    color: #666;
    margin-bottom: 2.5rem;
}
.cta-buttons {
    margin-bottom: 1.5rem;
}
.cta-note {
    font-size: 0.78rem;
    color: #bbb;
    letter-spacing: 0.04em;
}

/* ===== CAROUSEL SLIDES ===== */
.carousel-slide {
    scroll-snap-align: start;
    padding: 2rem 1.5rem;
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}

/* ===== FOOTER ===== */
.foot-section {
    flex-direction: column;
    min-height: auto;
    padding: 0;
}
.foot-wrap {
    width: 100%;
    padding: 3rem 2rem;
}
.marquee-wrap {
    width: 100%;
    overflow: hidden;
    padding: 1.8rem 0;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
}
.marquee-track {
    display: flex;
    width: max-content;
}
.marquee-content {
    display: flex;
    white-space: nowrap;
    animation: slide 25s linear infinite;
}
.marquee-content span {
    font-size: clamp(0.85rem, 1.5vw, 1.1rem);
    letter-spacing: 0.1em;
    color: rgba(0, 0, 0, 0.08);
    font-weight: 400;
}
@keyframes slide {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
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
    color: #111;
    margin-bottom: 0.3rem;
}
.foot-copy {
    font-size: 0.75rem;
    color: #999;
}
.foot-tag {
    font-size: 0.8rem;
    color: #ccc;
    letter-spacing: 0.08em;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
    .problem-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    .solution-grid {
        grid-template-columns: 1fr;
    }
    .modules-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .industry-grid {
        grid-template-columns: 1fr;
    }
    .why-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
    }
    .hero-title {
        font-size: clamp(2.5rem, 12vw, 4rem);
    }
    .problem-card {
        padding: 2rem 1.5rem;
    }
    .solution-card {
        padding: 2rem 1.5rem;
    }
    .vision-card {
        padding: 2.5rem 2rem;
    }
    .cta-card {
        padding: 3rem 2rem;
    }
    .foot-inner {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5rem;
    }
    .mock-content {
        grid-template-columns: 1fr;
    }
    .screenshot-mock {
        height: 150px;
    }
    .cta-desc br {
        display: none;
    }
    .sec-head h2 br {
        display: none;
    }
}
</style>
