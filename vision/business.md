---
layout: doc
breadcrumb: "ビジネスモデル"
---

<script setup>
import Breadcrumb from '../.vitepress/theme/Breadcrumb.vue'
import InfoChip from '../.vitepress/theme/InfoChip.vue'
</script>

<Breadcrumb />

<div class="section-icon"><i class="mi">payments</i></div>

# 6. ビジネスモデル

## 料金モデル——シート課金からの脱却

従来の<InfoChip k="saas" />では「シート（席数）課金」が一般的です。つまり、使う人数が増えるほど料金が上がる仕組みです。SOUL.lock<InfoChip k="soul-lock" />はこれとはまったく異なる<InfoChip k="three-layer" />の料金体系を採用しています。

<div class="highlight-block">

- <i class="mi mi-muted">receipt_long</i> <strong>基本料金</strong> — 会社（テナント）ごとの月額固定料金です
- <i class="mi mi-muted">view_module</i> <strong>モジュール料金</strong> — 使いたい業務分野だけを選んで支払う従量制です
- <i class="mi mi-muted">token</i> <strong>トークン利用料</strong> — AI<InfoChip k="agent" />が実際に動いた量に応じて支払う従量課金です

</div>

以下は、すでにコードベースに実装されている課金の仕組みです。

### 課金アーキテクチャ（実装済）

<div class="diagram-layers">
  <div class="diagram-layer diagram-layer-1">
    <i class="mi">receipt_long</i>
    <div>
      <span class="diagram-layer-label">プラットフォーム課金</span>
      <span class="diagram-layer-sub">PlatformPlan → TenantSubscription — 会社ごとの基本料金とプランの管理を行います</span>
    </div>
  </div>
  <div class="diagram-layer diagram-layer-2">
    <i class="mi">view_module</i>
    <div>
      <span class="diagram-layer-label">モジュール課金</span>
      <span class="diagram-layer-sub">AiModulePricing → TenantSubscriptionModule — モジュールごとの月額・付属クレジット・超過時の料金を管理します</span>
    </div>
  </div>
  <div class="diagram-layer diagram-layer-3">
    <i class="mi">smart_toy</i>
    <div>
      <span class="diagram-layer-label">AI<InfoChip k="token" />課金</span>
      <span class="diagram-layer-sub">AiTokenUsage → AiBillingRecord — 使用量をリアルタイムに記録し、月次で請求書を自動作成します</span>
    </div>
  </div>
</div>

| 層 | 実装モデル | 課金ロジック |
|---|---|---|
| <i class="mi mi-muted">receipt_long</i> <strong>基本料金</strong> | `PlatformPlan` → `TenantSubscription` | 会社ごとの月額固定です。プランによってユーザー数の上限・ストレージ容量・利用できるモジュールが決まります |
| <i class="mi mi-muted">view_module</i> <strong>モジュール料金</strong> | `AiModulePricing` → `TenantSubscriptionModule` | モジュールごとの月額に加え、付属クレジットとデータ容量が含まれます。個別に試用・追加・解除ができます |
| <i class="mi mi-muted">smart_toy</i> <strong>トークン利用料</strong> | `AiTokenUsage` → `AiBillingRecord` + `Detail` | AIの利用量（入力・出力・キャッシュ別）をリアルタイムで記録します。付属クレジットを超えた分だけ課金されます |
| <i class="mi mi-muted">tune</i> <strong>モデル別単価</strong> | `TokenPricingRule` | AIモデルごとに入力・出力の単価を設定できます。会社ごとにカスタマイズも可能です |
| <i class="mi mi-muted">payments</i> <strong>決済</strong> | `StripeAccount` + Stripe Connect | サブスクリプション管理・従量課金・Webhook連携を行います |

<div class="diagram-cycle">
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">person_add</i></div>
    <span class="diagram-cycle-text">テナント作成<br>プラン選択</span>
  </div>
  <span class="diagram-cycle-arrow">→</span>
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">add_circle</i></div>
    <span class="diagram-cycle-text">モジュール追加<br>7日間無料試用</span>
  </div>
  <span class="diagram-cycle-arrow">→</span>
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">smart_toy</i></div>
    <span class="diagram-cycle-text">AI実行<br>トークン記録</span>
  </div>
  <span class="diagram-cycle-arrow">→</span>
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">notifications</i></div>
    <span class="diagram-cycle-text">50/80/95%<br>アラート通知</span>
  </div>
  <span class="diagram-cycle-arrow">→</span>
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">receipt_long</i></div>
    <span class="diagram-cycle-text">月次請求<br>自動生成</span>
  </div>
</div>

<div class="highlight-block">

- <i class="mi mi-muted">science</i> <strong>試用期間</strong>: プランは14日間、モジュールは7日間お試しできます（期間終了後は自動で有料に切り替わります）
- <i class="mi mi-muted">notifications</i> <strong>使用量アラート</strong>: 50% → 80% → 95% → 100%の4段階でお知らせします
- <i class="mi mi-muted">tune</i> <strong>マークアップ</strong>: AIモデルの原価に対して30%の手数料が加算されます（調整可能）
- <i class="mi mi-muted">security</i> <strong>解約後のデータ保持</strong>: 解約後も90日間はデータを保持しますので、復旧が可能です
- <i class="mi mi-muted">approval</i> <strong>承認フロー</strong>: モジュールの追加・プラン変更・解約には、社内の承認ワークフローを適用できます

</div>

席数課金は「人が増えるほどコストが増える」仕組みです。SOUL.lock<InfoChip k="soul-lock" />はAIの業務処理量に対して課金するため、<strong>AIが業務を代行するほど1人あたりのコストは下がっていきます</strong>。企業が成長することとコストが下がることが、同じ方向を向く設計になっています。

なお、初期段階で極端な低価格にする戦略は取りません。安すぎる価格で提供すると、既存の<InfoChip k="saas" />がすぐに同じ戦略を模倣できてしまいます。<strong>価格ではなく「データ統合による構造的な優位性」で差別化します</strong>。価格競争に巻き込まれる前に、ネットワーク効果と最適解データで先行者としての優位を確立します。

<div class="diagram-vs">
  <div class="diagram-vs-left">
    <span class="diagram-vs-title"><i class="mi" style="font-size:0.8rem;opacity:0.5">group</i> 従来SaaS</span>
    <span class="diagram-vs-value">シート × 人数</span>
    <span class="diagram-vs-desc">人が増えるほどコスト増<br>AIが業務をしても課金は同じ<br>成長＝コスト増</span>
  </div>
  <div class="diagram-vs-mid">vs</div>
  <div class="diagram-vs-right">
    <span class="diagram-vs-title"><i class="mi" style="font-size:0.8rem;opacity:0.5">hub</i> SOUL.lock</span>
    <span class="diagram-vs-value">基本＋モジュール＋トークン</span>
    <span class="diagram-vs-desc">AIが代行するほど1人あたり低下<br>業務量に応じた従量制<br>成長＝効率向上</span>
  </div>
</div>

<div class="contrast-section">

## JPYコイン——企業間決済の新しい基盤

SOUL.lock<InfoChip k="soul-lock" />のプラットフォーム上で、企業間の請求・支払い・決済を<InfoChip k="jpycoin" />（日本円と連動したデジタル通貨）で完結させます。

取引先への請求書発行、入金の消込、支払い処理——これらがプラットフォーム内でリアルタイムに決済されます。銀行振込の手数料や着金待ちの時間、消込作業が不要になり、AIが自動で決済処理を実行します。

<strong>ネットワーク上の企業が増えるほど、決済の価値は飛躍的に高まります。</strong> 料金モデルに「決済手数料」という第4の収益レイヤーが加わる構造です。

</div>

## 営業戦略——2つの入口

<div class="highlight-block">

<p><i class="mi mi-brand">rocket_launch</i> <strong>入口1: これから創業する方</strong> — SOUL.lock<InfoChip k="soul-lock" />のメインターゲットは「これから事業を始める方」です。既存システムへの依存がないため、最初からAI前提の業務設計ができます。個人事業主やフリーランスの方も含め、1人から使える設計になっています。AI<InfoChip k="agent" />が経理・人事・営業を代行してくれるので、創業者は本業に集中できます。</p>

</div>

<div class="highlight-block">

<p><i class="mi mi-brand">domain</i> <strong>入口2: 既存企業の一部導入</strong> — すでに事業を運営されている企業には、<InfoChip k="mcp" />で現在の環境と共存しながら、一部の業務から導入していただけます。AIの進化がもたらす構造変化——ソフトウェアの機能価値がゼロに近づくこと、データ統合が避けられないこと——をお伝えし、「今動かなければ取り残される」という認識を共有します。1つのモジュールでの成功体験が、全業務統合への自然な移行の道筋となります。</p>

</div>

## NEO SNS——完全情報が参加を促す

SOUL.lock<InfoChip k="soul-lock" />の最終形は、業務プラットフォームがそのままソーシャルネットワークになる<InfoChip k="neo-sns" />です。その中核にあるのは<strong>「完全情報」</strong>という考え方です。

<div class="contrast-section">

### 完全情報——広告もWEB調査も要らなくなる

SOUL.lock<InfoChip k="soul-lock" />上の企業は、業務データが統合されているからこそ<strong>自社の完全な情報を掲載できます</strong>。財務状況・取引実績・サービス内容・評価——すべてが整理されたデータとして存在します。

これはどういうことでしょうか？

<div class="highlight-block">

- <i class="mi mi-muted">visibility</i> <strong>内部の利益構造まで透明にできます</strong> — SOUL.lock<InfoChip k="soul-lock" />上の企業は業務データが統合されているため、原価構造・利益率・取引条件を自ら開示できます。隠す必要がありません。内部構造を公開した企業は<strong>「論理的に完全に信用できる事業者」</strong>として認識されます。正直な商売が構造的に有利になる世界です
- <i class="mi mi-muted">search_off</i> <strong>広告・WEB調査が不要になります</strong> — これまで、サービスを比較するには広告やWebサイトや口コミに頼るしかありませんでした。SOUL.lock上では、完全情報に基づいてAIがサービスを比較・おすすめしてくれます。情報の偏りがなくなります
- <i class="mi mi-muted">credit_score</i> <strong>実データに基づく<InfoChip k="credit-score" /></strong> — 財務の健全性・取引の履行率・サービス品質をAIが構造的に評価します。自己申告ではなく、実際の業務データから信用スコアが自動で算出されます
- <i class="mi mi-muted">currency_exchange</i> <strong>決済が即時に完結します</strong> — <InfoChip k="jpycoin" />によるプラットフォーム内決済で、銀行振込の手数料・着金待ち・消込作業が不要になります

</div>

</div>

### 参加しなければ、選ばれない

従来のビジネスでは、見せかけの実績、誇張された広告、不透明な料金体系——いわゆる「ハッタリ」が通用する面がありました。SOUL.lock<InfoChip k="soul-lock" />の完全情報マーケットでは、<strong>実データに基づく<InfoChip k="credit-score" />がすべてを決めます。</strong> 正直に事業を行っている企業ほど有利になり、ハッタリは通用しません。

ここに強力なネットワーク効果が生まれます。<strong>完全情報で比較されるマーケットプレイスに掲載されていない企業は、比較対象にすらなりません。</strong>

個人テナントが開放される前に、企業はこのプラットフォームに参加しておく必要があります。なぜなら、個人が発注先・就職先・取引先を選ぶとき、完全情報が揃っているプラットフォーム上の企業を優先するからです。「載っていない企業」は選択肢に入らなくなります。

<div class="diagram-phases">
  <div class="diagram-phase">
    <div class="diagram-phase-marker">Phase 1</div>
    <div class="diagram-phase-icon"><i class="mi">domain</i></div>
    <div class="diagram-phase-title">法人間ネットワーク</div>
    <div class="diagram-phase-desc">完全情報＋信用スコア<br>AI自動取引・JPYコイン決済</div>
  </div>
  <div class="diagram-phase-arrow"><i class="mi">arrow_forward</i></div>
  <div class="diagram-phase">
    <div class="diagram-phase-marker">圧力</div>
    <div class="diagram-phase-icon"><i class="mi">priority_high</i></div>
    <div class="diagram-phase-title">参加しなければ選ばれない</div>
    <div class="diagram-phase-desc">完全情報マーケットから<br>非参加企業は除外されます</div>
  </div>
  <div class="diagram-phase-arrow"><i class="mi">arrow_forward</i></div>
  <div class="diagram-phase">
    <div class="diagram-phase-marker">Phase 2</div>
    <div class="diagram-phase-icon"><i class="mi">person_add</i></div>
    <div class="diagram-phase-title">個人テナント開放</div>
    <div class="diagram-phase-desc">個人のAIが完全情報で<br>企業を比較・選択・取引します</div>
  </div>
  <div class="diagram-phase-arrow"><i class="mi">arrow_forward</i></div>
  <div class="diagram-phase">
    <div class="diagram-phase-marker">NEO SNS</div>
    <div class="diagram-phase-icon"><i class="mi">public</i></div>
    <div class="diagram-phase-title">完全情報の経済圏</div>
    <div class="diagram-phase-desc">全員がAIを持ち<br>情報の偏りが消える世界です</div>
  </div>
</div>

## 収益レイヤーの拡張

| レイヤー | 時期 | 収益源 |
|---|---|---|
| <i class="mi mi-muted">receipt_long</i> SaaS課金 | Phase 1 | 基本料金＋モジュール料金＋<InfoChip k="token" />利用料 |
| <i class="mi mi-muted">currency_exchange</i> 決済手数料 | Phase 1-2 | <InfoChip k="jpycoin" />による企業間決済の手数料 |
| <i class="mi mi-muted">hub</i> ネットワーク利用料 | Phase 2 | AIによる自動交渉・マッチングのプラットフォーム手数料 |
| <i class="mi mi-muted">tune</i> 最適化データ | 全Phase | 業務×スキル×モデルの最適な組合せから生まれる精度・効率の優位性 |

<div class="diagram-layers">
  <div class="diagram-layer diagram-layer-1">
    <i class="mi">receipt_long</i>
    <div>
      <span class="diagram-layer-label">SaaS課金</span>
      <span class="diagram-layer-sub">基本＋モジュール＋トークン — 全フェーズの基盤となります</span>
    </div>
  </div>
  <div class="diagram-layer diagram-layer-2">
    <i class="mi">currency_exchange</i>
    <div>
      <span class="diagram-layer-label">決済手数料</span>
      <span class="diagram-layer-sub">JPYコインによる企業間決済 — ネットワーク効果で拡大します</span>
    </div>
  </div>
  <div class="diagram-layer diagram-layer-3">
    <i class="mi">public</i>
    <div>
      <span class="diagram-layer-label">ネットワーク＋最適化データ</span>
      <span class="diagram-layer-sub">AI自動交渉の手数料＋他社には真似できない掛合せノウハウ</span>
    </div>
  </div>
</div>

<div class="chapter-nav">
  <a href="./trust"><i class="mi">arrow_back</i> 前章: 信頼と安全</a>
  <a href="./action"><i class="mi">arrow_forward</i> 次章: 次のステップ</a>
</div>
