---
layout: doc
breadcrumb: "信頼と安全"
---

<script setup>
import Breadcrumb from '../.vitepress/theme/Breadcrumb.vue'
import InfoChip from '../.vitepress/theme/InfoChip.vue'
</script>

<Breadcrumb />

<div class="section-icon"><i class="mi">verified_user</i></div>

# 5. 信頼と安全——守れるから、任せられる

<div class="pull-quote">
昨日つくった機能の価値は、今日にはもう下がっています。<br>
しかし「安心して使い続けられる基盤」の価値は、時間とともに上がっていきます。<br>
だからこそ、安全性は機能の付け足しではなく、設計の出発点でなければなりません。
</div>

## なぜ<InfoChip k="all-in-one" />でないと守れないのか

バラバラの<InfoChip k="saas" />環境でAIを使うと、セキュリティの責任も分散します。ツールAの権限管理、ツールBのデータ保護、ツールCのAI安全対策——すべてバラバラです。1つでも穴があれば、そこから崩れます。

<div class="diagram-vs">
  <div class="diagram-vs-left">
    <span class="diagram-vs-title"><i class="mi" style="font-size:0.8rem;opacity:0.5">apps</i> 分散SaaS</span>
    <span class="diagram-vs-value">守りもバラバラ</span>
    <span class="diagram-vs-desc">ツールごとにセキュリティポリシーが異なります<br>APIの継ぎ目にデータ漏洩リスクが生まれます<br>AI安全対策はツールの善意に依存します</span>
  </div>
  <div class="diagram-vs-mid">vs</div>
  <div class="diagram-vs-right">
    <span class="diagram-vs-title"><i class="mi" style="font-size:0.8rem;opacity:0.5">hub</i> SOUL.lock</span>
    <span class="diagram-vs-value">まとめて守る</span>
    <span class="diagram-vs-desc">ひとつの基盤で権限・監査・AI防御を一元管理します<br>データが外に出ないから、守れるのです<br>すべてのモジュールに同じ安全基準が適用されます</span>
  </div>
</div>

<InfoChip k="all-in-one" />は「便利だから」だけではありません。<strong>まとめて守るための必須条件</strong>です。データがひとつの場所にあるから、ひとつの基準で、ひとつの仕組みで、すべてを守ることができるのです。

## 6つの防御原則

SOUL.lock<InfoChip k="soul-lock" />のセキュリティは、「人が気をつける」ことに頼りません。<strong>構造として破れない仕組み</strong>を設計しています。

<div class="highlight-block">

- <i class="mi mi-muted">block</i> <strong>原則1: 未定義は拒否</strong> — 設定されていないもの、定義されていないものは、すべて「通さない」が初期値です。許可されたものだけが動きます
- <i class="mi mi-muted">lock</i> <strong>原則2: 構造的に破れない</strong> — ルールを「守る」のではなく「破れない構造」にします。テナント分離はシステム層で自動適用され、開発者が忘れても漏れません
- <i class="mi mi-muted">layers</i> <strong>原則3: 多層防御</strong> — ひとつの防御が突破されても、次の層が守ります。アプリケーション・データベース・AI・監査——異なるレイヤーで同じリスクを多重に検証します
- <i class="mi mi-muted">verified_user</i> <strong>原則4: 生成と検証の分離</strong> — AIが書いたコードはAIではなく静的解析が検証します。AIの出力はシステム層のガードレールが検証します。生成した主体とは別の仕組みが必ずチェックします
- <i class="mi mi-muted">apartment</i> <strong>原則5: テナント完全分離</strong> — 企業Aのデータは、どのような操作を行っても企業Bから見えません。データベースレベルで自動的に分離されます
- <i class="mi mi-muted">gavel</i> <strong>原則6: 監査可能性</strong> — 誰が、いつ、何をしたかがすべて記録されます。AIの操作も例外ではありません。改ざん検知の仕組みにより、記録の信頼性も保証されます

</div>

<div class="diagram-layers">
  <div class="diagram-layer diagram-layer-1">
    <i class="mi">smart_toy</i>
    <div>
      <span class="diagram-layer-label">AI防御層</span>
      <span class="diagram-layer-sub"><InfoChip k="pii" /> — <InfoChip k="prompt-injection" />防御 — 出力サニタイズ — レート制限</span>
    </div>
  </div>
  <div class="diagram-layer diagram-layer-2">
    <i class="mi">shield</i>
    <div>
      <span class="diagram-layer-label">アプリケーション防御層</span>
      <span class="diagram-layer-sub">認可ポリシー — バリデーション — テナント分離 — 監査ログ</span>
    </div>
  </div>
  <div class="diagram-layer diagram-layer-3">
    <i class="mi">storage</i>
    <div>
      <span class="diagram-layer-label">データ防御層</span>
      <span class="diagram-layer-sub">外部キー制約1,100超 — 遅延読み込み検知 — バックアップ — 暗号化</span>
    </div>
  </div>
</div>

## AI時代に必要な守り

AIが業務を実行するようになると、従来のセキュリティだけでは不十分です。SOUL.lock<InfoChip k="soul-lock" />は、AI固有のリスクに対しても構造的に対処しています。

<div class="contrast-section">

### AIが扱うデータを守る

AIに業務を任せるということは、AIが社員の給与情報、顧客の取引履歴、財務データに触れるということです。SOUL.lock<InfoChip k="soul-lock" />では、<InfoChip k="pii" />を自動で検出し、外部AIプロバイダに不必要に送信することを防ぎます。

### AIの動作を守る

<InfoChip k="prompt-injection" />——悪意のある入力でAIの動作を乗っ取る攻撃が増えています。SOUL.lock<InfoChip k="soul-lock" />では、AIへの入力と出力の両方を検証する多層のガードレールを設けています。入力の段階で不正な指示を検出・遮断し、出力の段階で意図しない情報漏洩がないかを検証します。

### AIのコストを守る

AIの利用には<InfoChip k="token" />のコストが発生します。レート制限のない状態では、意図しない大量リクエストや悪意のある攻撃によりコストが爆発するリスクがあります。SOUL.lock<InfoChip k="soul-lock" />では、AIへのリクエストにレート制限を設け、使用量アラート（50% → 80% → 95% → 100%）で事前にお知らせします。

</div>

## 法規制への備え

AIの業務利用に関する法規制は、世界的に急速に整備されています。SOUL.lock<InfoChip k="soul-lock" />は、主要な法規制に対応する設計で構築されています。

<div class="highlight-block">

- <i class="mi mi-muted">public</i> <strong>EU AI Act（2026年8月義務化）</strong> — 高リスクAIシステムに対する透明性・説明責任・リスク管理の義務です。違反した場合、最大3,500万ユーロまたは全世界売上の7%の制裁金が科されます
- <i class="mi mi-muted">language</i> <strong>日本 AI推進法（2026年施行）</strong> — AIの安全性確保と利活用推進を両立するための日本独自の法的枠組みです
- <i class="mi mi-muted">security</i> <strong>データ保護</strong> — テナント単位でのデータエクスポート・削除機能により、各国のデータ保護法（GDPR等）に対応できる設計です

</div>

<strong>法規制は追い風です。</strong> セキュリティとコンプライアンスを「あとから追加する」のではなく「最初から組み込んでいる」プラットフォームこそが、規制が厳しくなるほど選ばれるようになります。

## 安全性は競争力です

多くのプロダクトは機能を先に作り、セキュリティはあとから追加します。しかしAI時代において、あとから追加したセキュリティには構造的な限界があります。

<div class="pull-quote">
機能の価値は日々下がっていきます。誰でもAIで同じものを作れるからです。<br>
しかし「安心して任せられる基盤」の価値は、企業がデータを預けるほど上がっていきます。<br>
セキュリティは、SOUL.lockの最も強い参入障壁のひとつです。
</div>

<div class="stat-row">
  <div class="stat-item">
    <i class="mi mi-brand mi-lg">layers</i>
    <span class="stat-num">多層防御</span>
    <span class="stat-label">AI・アプリ・データの<br>3層で同一リスクを多重検証します</span>
  </div>
  <div class="stat-item">
    <i class="mi mi-brand mi-lg">lock</i>
    <span class="stat-num">構造的強制</span>
    <span class="stat-label">「気をつける」に頼らない<br>破れない仕組みを設計しています</span>
  </div>
  <div class="stat-item">
    <i class="mi mi-brand mi-lg">gavel</i>
    <span class="stat-num">法規制対応</span>
    <span class="stat-label">EU AI Act・日本AI推進法に<br>設計段階から対応しています</span>
  </div>
</div>

<div class="chapter-nav">
  <a href="./strategy"><i class="mi">arrow_back</i> 前章: 競争優位</a>
  <a href="./business"><i class="mi">arrow_forward</i> 次章: ビジネスモデル</a>
</div>
