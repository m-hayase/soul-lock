---
layout: doc
breadcrumb: "時代認識"
---

<script setup>
import InfoChip from '../.vitepress/theme/InfoChip.vue'
import Breadcrumb from '../.vitepress/theme/Breadcrumb.vue'
</script>

<Breadcrumb />

<div class="section-icon"><i class="mi">public</i></div>

# 1. 時代認識——なぜ今なのか

<div class="pull-quote">
AIが仕事を変えるのは「いつかの未来」ではなく、すでに始まっています。働き方の変化、<InfoChip k="saas" />の限界、技術の成熟——3つの大きな波が同時に押し寄せています。
</div>

## 雇用構造の転換

オフィスワークを中心とした仕事が、AIの影響を大きく受けています。Anthropicの研究では、AI影響を受ける職種において若い世代の雇用が6〜16%減少していることがわかりました。学歴や収入が高い層ほど影響が大きいという結果も出ています。

<div class="stat-row">
  <div class="stat-item">
    <span class="stat-num">3億人</span>
    <span class="stat-label">AI影響を受ける雇用<br>Goldman Sachs</span>
  </div>
  <div class="stat-item">
    <span class="stat-num">40%</span>
    <span class="stat-label">AIに晒される世界の雇用<br>IMF</span>
  </div>
  <div class="stat-item">
    <span class="stat-num">11億人</span>
    <span class="stat-label">10年以内に影響<br>WEF</span>
  </div>
</div>

> <i class="mi mi-muted">format_quote</i> すべての仕事の80%が完全になくなるか、80%の業務内容が変わる — <strong>Vinod Khosla</strong>

> <i class="mi mi-muted">format_quote</i> これは津波だ。目を覚ませ — <strong>クリスタリナ・ゲオルギエヴァ（IMF専務理事）</strong>

## 未来の働き方——差がつかない場所で差をつける

AIがコードを書き、資料を作り、分析を行い、顧客対応をする世界では、<strong>ITスキルや業務の速さでは差がつかなくなります</strong>。誰もが同じAIを使えるようになるからです。

これは産業革命と同じことが起きているのです。

<div class="highlight-block">

- <i class="mi mi-muted">precision_manufacturing</i> <strong>かつて</strong>: 工場を持つことが強みだった → 誰もが工場を持てるようになり、差は「何を作るか」に移りました
- <i class="mi mi-muted">language</i> <strong>その次</strong>: 英語ができることが強みだった → 翻訳ツールが広まり、差は「何を伝えるか」に移りました
- <i class="mi mi-muted">computer</i> <strong>少し前</strong>: Excel・プログラミングができることが強みだった → 誰もが使えるようになり、差は「何を解くか」に移りました
- <i class="mi mi-muted">smart_toy</i> <strong>これから</strong>: AIを使えることすら強みにならない → <strong>差は「何をやりたいか」「誰と信頼を築くか」に移ります</strong>

</div>

効率化できるものはすべてAIが同じレベルにそろえていきます。最後に残るのは、ビジョン・信頼・人との関係・美意識——AIには置き換えられない「人間の意志」の領域です。<InfoChip k="soul-lock" />はAIに任せられるすべてを引き受けることで、<strong>人間がこの「差がつく領域」に集中できる環境を作ります。</strong>

## 人とAIのコスト逆転

コストの構造は、すでに逆転し始めています。

<div class="diagram-vs">
  <div class="diagram-vs-left">
    <span class="diagram-vs-title"><i class="mi" style="font-size:0.8rem;opacity:0.5">person</i> 人間</span>
    <span class="diagram-vs-value">500〜700万円/年</span>
    <span class="diagram-vs-desc">1日8時間・週5日<br>採用に数ヶ月・1件ずつ処理<br>疲労でミス率が変動します</span>
  </div>
  <div class="diagram-vs-mid">vs</div>
  <div class="diagram-vs-right">
    <span class="diagram-vs-title"><i class="mi" style="font-size:0.8rem;opacity:0.5">smart_toy</i> AI</span>
    <span class="diagram-vs-value">数十〜数百円/タスク</span>
    <span class="diagram-vs-desc">24時間365日稼働<br>スキル追加は即時・並列処理<br>コストは年40〜60%下がり続けています</span>
  </div>
</div>

<strong>本当の問題はコストではありません。AIに業務を任せるための「仕組み」がまだないことです。</strong>

<div class="contrast-section">

## SaaSの地殻変動

大手IT企業は「AIを追加した」のではありません。製品の前提そのものを書き換えました。Microsoftは「<InfoChip k="agent" />が従来のOfficeを脅かす」と認め、Googleはエージェントによる購買機能をOSに組み込み、SalesforceはCRMをAIエージェントのプラットフォームへと変えました。

> <i class="mi mi-muted">format_quote</i> SaaSポカリプスが来る。データを握るだけでは支配力を保てなくなる — <strong>Marc Andreessen / a16z</strong>

従来の<InfoChip k="saas" />にAIを後から追加するやり方には、根本的な限界があります。人が画面を操作する前提で作られた仕組みの上にAIを載せても、AIの力を十分に引き出すことはできません。

</div>

## 技術基盤の成熟

AIが業務を「実行」するための土台は、すでに標準化されています。

- <i class="mi mi-muted">cable</i> <strong><InfoChip k="mcp" /></strong>: Anthropicが策定し、Google・Microsoft・OpenAIも採用したAIの接続標準です
- <i class="mi mi-muted">psychology</i> <strong><InfoChip k="agent" />の実用化</strong>: Sequoiaが「AGI元年」と宣言しました。AIの能力は7ヶ月で倍になっています（METR調査）
- <i class="mi mi-muted">payments</i> <strong>$650B</strong>: 大手IT4社のAI設備投資額です。API利用料は年40-60%のペースで下がり続けています
- <i class="mi mi-muted">speed</i> <strong>開発コストの激変</strong>: かつて数千万円かかったシステムが、AIエージェントを使えば数日で完成する世界になりました

> <i class="mi mi-muted">format_quote</i> 2026年はあらゆるものがエージェントへ移行する年になる — <strong>Reid Hoffman</strong>

条件はすべてそろいました。問題は「何を作るか」です。

<div class="chapter-nav">
  <span></span>
  <a href="./problem"><i class="mi">arrow_forward</i> 次章: 課題とインサイト</a>
</div>
