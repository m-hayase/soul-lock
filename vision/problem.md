---
layout: doc
breadcrumb: "課題とインサイト"
---

<script setup>
import Breadcrumb from '../.vitepress/theme/Breadcrumb.vue'
import InfoChip from '../.vitepress/theme/InfoChip.vue'
</script>

<Breadcrumb />

<div class="section-icon"><i class="mi">warning</i></div>

# 2. 課題とインサイト

<div class="pull-quote">
AIの能力はすでに十分です。足りないのは、AIに業務を任せるための「構造」です。
</div>

## データが分散している限り、AIは力を発揮できません

多くの企業では、業務データが何十もの<InfoChip k="saas" />に分散しています。会計はfreee、人事はSmartHR、営業はSalesforce、チャットはSlack——それぞれがバラバラの「データの島」になっている状態です。

<div class="diagram-scatter">
  <div class="diagram-scatter-items">
    <span class="diagram-scatter-item">freee 会計</span>
    <span class="diagram-scatter-item">SmartHR 人事</span>
    <span class="diagram-scatter-item">Salesforce CRM</span>
    <span class="diagram-scatter-item">Slack チャット</span>
    <span class="diagram-scatter-item">Google Drive</span>
    <span class="diagram-scatter-item">kintone 業務</span>
    <span class="diagram-scatter-item">KING OF TIME</span>
    <span class="diagram-scatter-item">Money Forward</span>
  </div>
  <div class="diagram-scatter-mid">
    <i class="mi">arrow_forward</i>
  </div>
  <div class="diagram-scatter-unified">
    <i class="mi">database</i>
    <span class="diagram-scatter-unified-label">SOUL.lock<br>単一DB・600+モデル</span>
  </div>
</div>

この状態でAIを導入しても、AIは「自分が見えるツールの範囲」でしか判断できません。たとえば経費の承認をAIに任せたとしても、その経費が予算にどう影響するのか、その社員の勤怠状況はどうか、過去に似た支出がなかったか——ほかのツールにあるデータは参照できないのです。

「APIで連携すればいい」という考えもありますが、現実は簡単ではありません。1ツールあたり数百万円のコストがかかり、リアルタイムでのデータ同期は困難で、データの形式は合わず、セキュリティは崩れ、権限管理も行き届きません。<strong>「つなぐ」ことと「統合する」ことは、まったく別の話です。</strong>

## なぜ<InfoChip k="all-in-one" />は存在しないのでしょうか

答えはシンプルです。<strong>みんなが「今の延長線上」で考えているからです。</strong>

既存の<InfoChip k="saas" />ベンダーは、自分たちの得意分野を深掘りすることに投資します。会計ソフトは会計を磨き、人事ソフトは人事を磨きます。AIを導入しても「自分のツール内の効率化」にとどまります。

その根底にあるのは、<strong>AIの進化スピードを過小評価していること</strong>です。

<div class="highlight-block">

<p><i class="mi mi-brand">trending_up</i> 「AIはまだ補助ツールだ」「業務を丸ごと任せるのはまだ先だ」——こうした認識は、毎年のAIモデルの性能向上とコスト低下のペースを見れば、明らかに間違っています。システム開発・保守・カスタマーサポート——これらのコストがすべて<InfoChip k="token" />に置き換わる未来は、「いつか」ではなく「もうすぐ」です。</p>

</div>

## しかし、その未来は必ず来ます

システムの開発と保守が<InfoChip k="token" />になります。カスタマーサポートも<InfoChip k="token" />になります。

<strong>その瞬間、「機能の数」だけで差別化してきた<InfoChip k="saas" />の価値は、相対的にゼロになります。</strong>誰でもAIで同じレベルの機能を作れるようになるからです。

では、残る価値は何でしょうか？——<strong>データが統合されていること</strong>。それだけです。

<div class="diagram-vs">
  <div class="diagram-vs-left">
    <span class="diagram-vs-title"><i class="mi" style="font-size:0.8rem;opacity:0.5">apps</i> 現在</span>
    <span class="diagram-vs-value">機能 = 価値</span>
    <span class="diagram-vs-desc">開発コストが高い<br>機能の多さが競争力<br>各社が領域を深掘り</span>
  </div>
  <div class="diagram-vs-mid">→</div>
  <div class="diagram-vs-right">
    <span class="diagram-vs-title"><i class="mi" style="font-size:0.8rem;opacity:0.5">smart_toy</i> AI時代</span>
    <span class="diagram-vs-value">データ統合 = 価値</span>
    <span class="diagram-vs-desc">機能はトークンで生成可能<br>機能単体の価値はゼロへ<br>統合データだけが残る</span>
  </div>
</div>

この事実に気づけば、答えは自然と<InfoChip k="all-in-one" />に行き着きます。誰かが必ずやります。

<strong>ならば、私たちがやります。</strong>

<div class="contrast-section">

## だから<InfoChip k="all-in-one" />です

<InfoChip k="all-in-one" />を目指すのは「便利だから」ではありません。

<strong>AIが業務全体を横断的に理解し、正確に判断・実行するための必須条件</strong>だからです。<InfoChip k="rag" />が効果を発揮するには、業務データがひとつの場所に統合されている必要があります。

そして、データがひとつのプラットフォームにあるからこそ、権限管理・監査ログ・<InfoChip k="pii" />検出・<InfoChip k="prompt-injection" />防御を一元的に適用できるのです。

<strong><InfoChip k="all-in-one" />は、AIの性能とセキュリティの両方を同時に解決する唯一の設計方針です。</strong>

</div>

## <InfoChip k="soul-lock" />の設計思想

多くのプロダクトは「今あるもの」を改善します。現在地から一歩ずつ、既存の延長線上で考えます。

<InfoChip k="soul-lock" />は違います。<strong>AIが業務を自律的に実行する世界——そのあるべき姿から逆算して設計しています。</strong>

「今何ができるか」ではなく「どうあるべきか」を先に定め、そこに到達するための構造を先に作ります。だからこそ20分野・230超の機能が単一のデータベースに統合されているのです。今の延長では決してたどり着かない設計です。

<div class="pull-quote">
SOUL.lockの「Soul」は魂です。<br>
あるべき姿を見据え、今この瞬間に動き出し、広めようとする創業者の魂——<br>
それがこのプロダクトの根源的な価値であり、出発点です。
</div>

<div class="chapter-nav">
  <a href="./context"><i class="mi">arrow_back</i> 前章: 時代認識</a>
  <a href="./product"><i class="mi">arrow_forward</i> 次章: プロダクト</a>
</div>
