---
layout: doc
breadcrumb: "次のステップ"
---

<script setup>
import Breadcrumb from '../.vitepress/theme/Breadcrumb.vue'
import InfoChip from '../.vitepress/theme/InfoChip.vue'
</script>

<Breadcrumb />

<div class="section-icon"><i class="mi">rocket_launch</i></div>

# 7. 次のステップ

## 開発状況と戦略

<div class="highlight-block">

<p><i class="mi mi-brand">check_circle</i> <strong>コア部分は約7割が完成しています。</strong> 20分野・230を超える業務機能・600を超えるデータモデルの基盤はすでに構築済みです。残りはAIによる業務自動化の仕組みと、情報を守るためのセキュリティ強化、そしてシステムが止まらないための冗長性の確保です。</p>

</div>

ここからの開発には、独自の加速する仕組みがあります。<strong><InfoChip k="soul-lock" />自身が<InfoChip k="token" />を使ってコードを書き、テストし、改善します。</strong> 利用者が増えて<InfoChip k="token" />の消費が増えるほど、開発のサイクルが速くなり、製品の完成度がさらに上がっていきます。従来の「エンジニアの人数＝開発速度」という制約から解放されています。

<div class="diagram-cycle">
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">smart_toy</i></div>
    <span class="diagram-cycle-text">AIが<br>コードを書く</span>
  </div>
  <span class="diagram-cycle-arrow">→</span>
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">groups</i></div>
    <span class="diagram-cycle-text">利用者が増え<br>トークン消費↑</span>
  </div>
  <span class="diagram-cycle-arrow">→</span>
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">auto_fix_high</i></div>
    <span class="diagram-cycle-text">PULSEで<br>ニーズ構造化</span>
  </div>
  <span class="diagram-cycle-arrow">→</span>
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">speed</i></div>
    <span class="diagram-cycle-text">開発サイクル<br>加速</span>
  </div>
  <span class="diagram-cycle-arrow">→</span>
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">trending_up</i></div>
    <span class="diagram-cycle-text">完成度が<br>さらに上がる</span>
  </div>
</div>

<div class="highlight-block">

- <i class="mi mi-muted">smart_toy</i> <strong>Phase 1: コア基盤の完成</strong> — AI関連機能（業務自動化・スキル層・<InfoChip k="pulse" />）、セキュリティ（<InfoChip k="pii" />の検出・<InfoChip k="prompt-injection" />への防御・権限管理）、システムの冗長性を整えます。<strong>サービスとして安定して動くことが最優先です</strong>
- <i class="mi mi-muted">view_module</i> <strong>Phase 2: モジュール順次開放</strong> — コア基盤の上に、業務モジュールを順番にリリースしていきます。会計・人事など需要の高い分野から開放し、利用実績とフィードバックで最適な業務パターンのデータを蓄積します
- <i class="mi mi-muted">tune</i> <strong>Phase 3: AI自律改善サイクル</strong> — <InfoChip k="pulse" />による「ニーズの構造化 → 機能の実装」という自律的なサイクルが確立します。<InfoChip k="token" />の消費量に比例して、モジュール追加のスピードが加速していきます

</div>

## ロードマップ

<div class="diagram-phases">
  <div class="diagram-phase">
    <div class="diagram-phase-marker">現在</div>
    <div class="diagram-phase-icon"><i class="mi">engineering</i></div>
    <div class="diagram-phase-title">コア7割完成</div>
    <div class="diagram-phase-desc">20分野・230+機能<br>600+データモデル構築済</div>
  </div>
  <div class="diagram-phase-arrow"><i class="mi">arrow_forward</i></div>
  <div class="diagram-phase">
    <div class="diagram-phase-marker">2026.8</div>
    <div class="diagram-phase-icon"><i class="mi">rocket_launch</i></div>
    <div class="diagram-phase-title">ローンチ</div>
    <div class="diagram-phase-desc">AI+セキュリティ+冗長性<br>サービス開始</div>
  </div>
  <div class="diagram-phase-arrow"><i class="mi">arrow_forward</i></div>
  <div class="diagram-phase">
    <div class="diagram-phase-marker">2026.Q4</div>
    <div class="diagram-phase-icon"><i class="mi">groups</i></div>
    <div class="diagram-phase-title">10社PoC</div>
    <div class="diagram-phase-desc">創業者＋既存企業一部導入<br>シード調達</div>
  </div>
  <div class="diagram-phase-arrow"><i class="mi">arrow_forward</i></div>
  <div class="diagram-phase">
    <div class="diagram-phase-marker">2027</div>
    <div class="diagram-phase-icon"><i class="mi">trending_up</i></div>
    <div class="diagram-phase-title">100社導入</div>
    <div class="diagram-phase-desc">モジュール順次開放<br>JPYコインPoC</div>
  </div>
</div>

| 時期 | マイルストーン |
|---|---|
| <i class="mi mi-muted">engineering</i> 現在（2026.3） | コア部分が7割完成しています。20分野・230を超える業務機能・600を超えるデータモデルを構築済みです |
| <i class="mi mi-muted">rocket_launch</i> <strong>2026年8月</strong> | <strong>ローンチ</strong> — AI・セキュリティ・冗長性を完成させ、サービスを開始します |
| <i class="mi mi-muted">groups</i> 2026年Q4 | 10社でのPoC（創業者＋既存企業への一部導入）を実施し、シード資金を調達します |
| <i class="mi mi-muted">trending_up</i> 2027年 | 100社への導入を目指し、モジュールを順次開放します。<InfoChip k="jpycoin" />による決済のPoCも開始します |
| <i class="mi mi-muted">public</i> 2028-2029年 | <InfoChip k="neo-sns" /> — 法人間のAIネットワーク基盤を構築し、個人向けテナントも開放します |

## コンタクト

30分のミーティングで、<InfoChip k="soul-lock" />の全体像をご説明いたします。

デモ環境での実際の動作をお見せしながら、御社の業務にどのように活用できるかを具体的にお話しいたします。

<strong>Email</strong>: contact@because-and.com

<div class="chapter-nav">
  <a href="./business"><i class="mi">arrow_back</i> 前章: ビジネスモデル</a>
  <a href="./"><i class="mi">menu_book</i> サマリに戻る</a>
</div>
