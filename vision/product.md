---
layout: doc
breadcrumb: "プロダクト"
---

<script setup>
import Breadcrumb from '../.vitepress/theme/Breadcrumb.vue'
import InfoChip from '../.vitepress/theme/InfoChip.vue'
</script>

<Breadcrumb />

<div class="section-icon"><i class="mi">hub</i></div>

# 3. プロダクト

<div class="highlight-block">
<p><i class="mi mi-brand">auto_awesome</i> AIが業務を行うことを前提に、ゼロから設計された統合業務プラットフォームです。20分野・230を超える業務機能がひとつのデータベースにまとまっており、600を超えるデータの型をAIが分野を横断して参照・実行します。</p>
</div>

## 3層構造——プロ×スキル×システム

ユーザーの目に見えるのは、業務分野ごとの <strong>「AIプロフェッショナル」</strong> です。

会計のプロ、人事のプロ、営業のプロ——それぞれが専門知識を持ち、会話しながらアドバイスと業務の実行を担当します。ユーザーは「優秀な専門家に相談している」感覚で業務を進めることができます。

<div class="diagram-layers">
  <div class="diagram-layer diagram-layer-1">
    <i class="mi">person</i>
    <div>
      <span class="diagram-layer-label">プロフェッショナル層</span>
      <span class="diagram-layer-sub">ユーザー接点 — 業務ごとの専門AIが対話・支援・実行</span>
    </div>
  </div>
  <div class="diagram-layer diagram-layer-2">
    <i class="mi">psychology</i>
    <div>
      <span class="diagram-layer-label">スキル層</span>
      <span class="diagram-layer-sub">裏側 — 指示設計・道具の呼び出し・判断の仕組み</span>
    </div>
  </div>
  <div class="diagram-layer diagram-layer-3">
    <i class="mi">storage</i>
    <div>
      <span class="diagram-layer-label">システム層</span>
      <span class="diagram-layer-sub">基盤 — データ整合性・権限・監査・個人情報検出・不正入力防御</span>
    </div>
  </div>
</div>

<div class="highlight-block">

- <i class="mi mi-muted">person</i> <strong>プロフェッショナル層</strong>（ユーザー接点） — 業務ごとの専門AIが、経理には経理のプロとして、営業には営業のプロとして対話し、判断を支援し、業務を実行します
- <i class="mi mi-muted">psychology</i> <strong>スキル層</strong>（裏側） — 各プロフェッショナルの背後に、業務に特化したスキル群（指示設計・道具の呼び出し・判断の仕組み）が控え、実際の処理を担います
- <i class="mi mi-muted">storage</i> <strong>システム層</strong>（基盤） — データの整合性・権限管理・監査ログ・<InfoChip k="pii" />検出・<InfoChip k="prompt-injection" />防御など、データの健全性をまとめて守ります

</div>

この<InfoChip k="three-layer" />が一体で動くのは、<InfoChip k="all-in-one" />だからこそ可能な構造です。バラバラの<InfoChip k="saas" />の上では、プロフェッショナルは自分のツール内しか見えず、システム層はデータの一貫性を保証できません。

## PULSE — プロダクトが脈打つ

<div class="pull-quote">
Product Updates from Listening to Service Experience<br>
会話がそのまま、進化になります。
</div>

プロフェッショナル層との対話は、単なるサポートではありません。<strong>ユーザーが求める改善——フローの変更、データの正確性、欲しい出力、足りない項目——がチャットから自動的に読み取られ、機能として実装されます。</strong>

<div class="diagram-cycle">
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">chat</i></div>
    <span class="diagram-cycle-text">ユーザーが<br>チャットで要望</span>
  </div>
  <span class="diagram-cycle-arrow">→</span>
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">auto_fix_high</i></div>
    <span class="diagram-cycle-text">AIが<br>ニーズを整理</span>
  </div>
  <span class="diagram-cycle-arrow">→</span>
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">code</i></div>
    <span class="diagram-cycle-text">開発に<br>直接反映</span>
  </div>
  <span class="diagram-cycle-arrow">→</span>
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">rocket_launch</i></div>
    <span class="diagram-cycle-text">機能として<br>提供</span>
  </div>
  <span class="diagram-cycle-arrow">→</span>
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">trending_up</i></div>
    <span class="diagram-cycle-text">プロダクトが<br>進化</span>
  </div>
</div>

これも<InfoChip k="all-in-one" />だからこそ可能です。すべての業務がひとつのプラットフォームにあるからこそ、「会計の改善要望が人事フローにも影響する」といった分野をまたいだニーズを正しく捉え、プロダクト全体として進化させることができます。

<div class="contrast-section">

## 承認と責任のモデル

<InfoChip k="soul-lock" />の名前は「Soul Lock」——魂による確認を意味します。AIがどれほど高度になっても、業務上の最終判断と責任は人間にあります。

AIが起案し、AIが事前チェックを行い、人間が最終承認します。このフローがすべてのモジュールに一貫して適用されます。

</div>

## 20分野の統合モジュール

<div class="stat-row">
  <div class="stat-item">
    <i class="mi mi-brand mi-lg">apps</i>
    <span class="stat-num">230+</span>
    <span class="stat-label">業務機能<br>20分野・単一DB</span>
  </div>
  <div class="stat-item">
    <i class="mi mi-brand mi-lg">database</i>
    <span class="stat-num">600+</span>
    <span class="stat-label">データモデル<br>業務横断連携</span>
  </div>
  <div class="stat-item">
    <i class="mi mi-brand mi-lg">cable</i>
    <span class="stat-num">MCP</span>
    <span class="stat-label">全方位配備<br>AI業務自律実行</span>
  </div>
</div>

<div class="highlight-block">

- <i class="mi mi-muted">account_balance</i> <strong>会計・財務</strong> — 仕訳・元帳・決算・経費・固定資産・予実・請求・見積・消込・自動仕訳
- <i class="mi mi-muted">badge</i> <strong>人事・労務・給与</strong> — 勤怠・シフト・有給・残業・給与計算・賞与・手当・評価・OKR・オンボーディング
- <i class="mi mi-muted">handshake</i> <strong>営業・CRM・MA</strong> — 商談・パイプライン・リードスコアリング・メールシーケンス・A/Bテスト
- <i class="mi mi-muted">local_shipping</i> <strong>購買・在庫</strong> — 発注・分納・仕入先評価・倉庫管理・ロット・BOM・原価積層
- <i class="mi mi-muted">forum</i> <strong>コミュニケーション</strong> — チャット・メール・Wiki・ファイル管理・カレンダー・施設予約
- <i class="mi mi-muted">task_alt</i> <strong>業務基盤</strong> — タスク・ワークフロー・承認・契約・プロジェクト・AI基盤・分析

</div>

## 業種別機能サンプル——VC・LP・ベンチャー企業

<InfoChip k="all-in-one" />の威力は、業種に特化した機能が汎用モジュールとシームレスにつながる点にあります。VC（ベンチャーキャピタル）のエコシステムを例に、3つのプレイヤーがどうつながるかをご紹介します。

### VCファンド運営

<div class="highlight-block">

- <i class="mi mi-muted">gavel</i> <strong>投資委員会（IC）</strong> — 案件スコアカード・DD管理・投票・議事録PDFの自動生成
- <i class="mi mi-muted">payments</i> <strong><InfoChip k="capital-call" /></strong> — LP単位の資金請求・入金追跡・滞納管理・自動通知
- <i class="mi mi-muted">currency_exchange</i> <strong>分配・<InfoChip k="waterfall" /></strong> — European/American waterfall対応。<InfoChip k="carry" />・クローバック・エスクロー計算
- <i class="mi mi-muted">trending_up</i> <strong>パフォーマンス</strong> — <InfoChip k="tvpi" />・<InfoChip k="dpi" />・RVPI・<InfoChip k="irr" />を自動算出します。<InfoChip k="nav" />記録・承認フロー
- <i class="mi mi-muted">receipt_long</i> <strong>マネジメントフィー</strong> — LP別の手数料計算から<InfoChip k="capital-call" />を自動生成します
- <i class="mi mi-muted">description</i> <strong>LP四半期報告</strong> — GPレターテンプレート・ポートフォリオサマリ・PDF一括配信

</div>

### LP（出資者）

<div class="highlight-block">

- <i class="mi mi-muted">dashboard</i> <strong>LPポータル</strong> — 全ファンドのコミットメント・分配・パフォーマンスを一覧で確認できます
- <i class="mi mi-muted">assignment</i> <strong>資本勘定明細書</strong> — <InfoChip k="capital-call" />・分配・手数料の明細をPDFで自動生成します
- <i class="mi mi-muted">swap_horiz</i> <strong>セカンダリー取引</strong> — LP持分の売買・GP同意管理・ROFR（先買権）処理
- <i class="mi mi-muted">calculate</i> <strong>税務書類</strong> — K-1フォーム・年間分配レポートの自動配信
- <i class="mi mi-muted">forum</i> <strong>GP-LP通信</strong> — 問い合わせ管理・フォローアップ追跡

</div>

### ベンチャー企業（ポートフォリオ）

<div class="highlight-block">

- <i class="mi mi-muted">pie_chart</i> <strong><InfoChip k="cap-table" /></strong> — 種類株条件（優先分配倍率・参加型/非参加型・希薄化防止）・株主構成・資金調達ラウンド管理
- <i class="mi mi-muted">card_giftcard</i> <strong>ストックオプション</strong> — 付与・<InfoChip k="vesting" />（クリフ対応）・行使・進捗率の自動計算
- <i class="mi mi-muted">analytics</i> <strong>KPI管理</strong> — <InfoChip k="mrr" />・ARR・チャーンレート・<InfoChip k="ndr" />・CAC・LTV・グロスマージンの推移とベンチマーク比較
- <i class="mi mi-muted">check_circle</i> <strong>EXIT準備</strong> — EXIT準備度スコア・マイルストーン管理・フォローオン投資判定
- <i class="mi mi-muted">groups</i> <strong>取締役会</strong> — 議事録・出席者管理・コベナンツ監視
- <i class="mi mi-muted">eco</i> <strong>ESG評価</strong> — 環境・社会・ガバナンスのスコアリング・SDGs17項目

</div>

### ALL-IN-ONEだからできる横断連携

<div class="diagram-cycle">
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">rocket_launch</i></div>
    <span class="diagram-cycle-text">ベンチャーが<br>KPIを報告</span>
  </div>
  <span class="diagram-cycle-arrow">→</span>
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">smart_toy</i></div>
    <span class="diagram-cycle-text">AIがバリュエーション<br>を自動更新</span>
  </div>
  <span class="diagram-cycle-arrow">→</span>
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">account_balance</i></div>
    <span class="diagram-cycle-text">ファンド<InfoChip k="nav" />・<br><InfoChip k="irr" />に即時反映</span>
  </div>
  <span class="diagram-cycle-arrow">→</span>
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">people</i></div>
    <span class="diagram-cycle-text">LPポータルで<br>リアルタイム確認</span>
  </div>
  <span class="diagram-cycle-arrow">→</span>
  <div class="diagram-cycle-step">
    <div class="diagram-cycle-icon"><i class="mi">description</i></div>
    <span class="diagram-cycle-text">四半期報告書に<br>自動統合</span>
  </div>
</div>

バラバラの<InfoChip k="saas" />では、ベンチャーのKPIはスプレッドシートで報告され、VCが手動でバリュエーションを更新し、LPレポートに転記します。SOUL.lockでは、<strong>データが入力された瞬間にすべての階層に伝わり、AIが整合性を守ります。</strong> これが64個のVCモデル・35個のサービスがひとつのDBでつながっている構造の価値です。

<div class="chapter-nav">
  <a href="./problem"><i class="mi">arrow_back</i> 前章: 課題とインサイト</a>
  <a href="./strategy"><i class="mi">arrow_forward</i> 次章: 競争優位</a>
</div>
