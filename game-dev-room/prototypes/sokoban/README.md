# JATA BOX SHIFT

倉庫番ベースの静的ブラウザゲーム。公開版 `https://jata-box-shift.vercel.app/` のローカル管理用コピー。

## 遊び方

- スマホ: 画面下の矢印ボタンで移動
- PC: 矢印キー / WASD
- 卵を押して、巣にすべて載せる
- `↶` で1手戻す、`⟳` でステージやり直し
- `DIY` で自作ステージの検証とテストプレイ

## 実装済み

- 依存なしの静的HTML/CSS/JS
- 30ステージ（公開版20面 + 手調整した追加10面）
- BGM / SFX
- Undo / Reset / Prev / Next
- DIYステージエディタ
- JATA ARCADE共通メニュー（外部Games画面への導線）
- プレイ中HOMEはタイトル画面へ戻る
- クリア済みステージだけを移動できる進行管理
- 背景画像を使った表紙画面
- プレイ中はタイトルを畳み、盤面優先のコンパクトHUD
- クリア背景画像のランダム薄表示
- 30面クリア時のエンドカード演出（`game.js?v=box-shift-title-home`）

## 追加背景

ステージ背景は `game.js` の `BACKDROP_IMAGES` に画像パスを追加すると増やせる。

```text
assets/clear/sparkle-sumomo-bg-1.jpg
assets/clear/nest-sumomo-bg-2.jpg
assets/clear/jungle-sumomo-bg-3.jpg
```

最終クリアのエンドカードは `styles.css` の `.overlay.is-final-clear` で指定している。

```text
assets/clear/end-card-hatchling.jpg
```

## ローカル確認

```bash
python3 -m http.server 8000 --directory game-dev-room/prototypes/sokoban
```
