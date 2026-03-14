# AI Evidence リサーチ

Soul.lock VC ピッチサイトの「市場の声」セクションのソース調査・要約レポート。

## ディレクトリ構造

```
research/
├── keyperson/          # キーパーソンの発言まとめ
├── institution/        # 機関レポート要約
├── industry/           # 業界動向まとめ
├── technology/         # 技術動向
└── labor-market/       # 雇用統計
```

## 更新方法

```
/ai-evidence          # フル実行（調査+レポート+カード追加）
/ai-evidence research # 調査+レポートのみ
/ai-evidence cards    # カード追加のみ
/ai-evidence update   # 既存レポート更新
```

## カードデータ

- `docs/public/.vitepress/theme/data/ai-evidence-human-to-ai.json`
- `docs/public/.vitepress/theme/data/ai-evidence-ai-systems.json`
- `docs/public/.vitepress/theme/data/ai-evidence-future-work.json`
