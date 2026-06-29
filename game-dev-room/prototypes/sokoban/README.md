# JATA BOX SHIFT

倉庫番ベースの静的ブラウザゲーム。公開版 `https://jata-box-shift.vercel.app/` のローカル管理用コピー。

## 遊び方

- スマホ: 画面下の矢印ボタンで移動
- PC: 矢印キー / WASD
- 卵を押して、巣にすべて載せる
- `UNDO` で1手戻す、`RESET` でステージやり直し
- `DIY` で自作ステージの検証とテストプレイ

## 実装済み

- 依存なしの静的HTML/CSS/JS
- 30ステージ（公開版20面 + 手調整した追加10面）
- BGM / SFX
- Undo / Reset / Prev / Next
- DIYステージエディタ
- JATA ARCADE共通メニュー

## ローカル確認

```bash
python3 -m http.server 8000 --directory game-dev-room/prototypes/sokoban
```
