---
created: 2026-06-29
type: work_report
project: CENTER COURT Tennis
scope:
  - game-dev-room
  - center-court-tennis
  - tennis
  - prototype
  - mobile-game
status: production_updated
audience:
  - TERU
  - Codex
---

# 2026-06-29 報告書 CENTER COURT Tennis

## 今日の結論

クロちゃん原案の疑似3Dテニスを、`game-dev-room/prototypes/center-court-tennis/` に新規ゲームとして保存した。

Space Hockey とは別ゲームとして扱い、スマホ/PCでテストできるローカルプロトタイプまで整えた。

その後、GitHubへ push し、Vercel production へ公開した。

## 作業場所

```text
/Users/teru44/Documents/New project/game-dev-room/prototypes/center-court-tennis/
```

主なファイル:

- `index.html`
- `README.md`
- `assets/center-court-visual-direction-v1.png`
- `assets/jata-open-emblem.png`

## 公開URL

```text
https://jata-center-court-tennis.vercel.app/
```

Vercel:

- project: `jata-center-court-tennis`
- production deployment: `https://jata-center-court-tennis-pqbgesb1g-teru2nd-ship-its-projects.vercel.app`
- deployment id: `dpl_Gb1StyXuPF5i7WpN5mxYbdSv2DTv`
- inspect: `https://vercel.com/teru2nd-ship-its-projects/jata-center-court-tennis/Gb1StyXuPF5i7WpN5mxYbdSv2DTv`

## 実装したこと

- ハード / グラス / クレーのコート選択を実装。
- スマホ縦画面向けに、スコアボードと操作ボタンを上下スペースへ整理。
- HOME / PAUSE / VOLLEY / LOB / DROP ボタンをゲーム外UIとして追加。
- PC操作用に `V` drive/volley、`B`/`L` lob、`N`/`X` drop を追加。
- タップでプレイヤーがワープしないよう、移動はドラッグ中心に調整。
- サーブ位置をベースライン外側へ修正。
- 観客席、床、コート外エリアの食い込みを修正。
- コート外の地面をコート本体と分け、不要な横ラインや看板を削除。
- ボールボーイ、ラインジャッジ、ネット横の簡易チェアアンパイアを追加。
- ハードコートの上下床の継ぎ目と操作ボタン間隔を調整。
- BGM、効果音、観客リアクション、勝利BGMを追加。
- アウト時のボールが自然に流れるように修正。
- タイトル画面と勝敗画面に JATA OPEN エンブレムを追加。
- 画面内の見える文言をほぼ英語へ変更。
- サービスエース判定を追加し、`ACE!` / `CPU ACE!` で盛り上がる演出を追加。
- いつもの `teru44.net/games` 戻るボタンと、iPhoneは別ウィンドウ / PC・iPadは全画面ボタンを追加。

## 確認済み

確認日: 2026-06-29

- `index.html` 内の script 構文チェック通過。
- `http://127.0.0.1:8802/` のローカル配信確認。
- 追加エンブレム画像の配信確認。
- in-app browser で表示確認。
- 画面内の見える日本語なしを確認。
- ブラウザコンソールエラーなし。
- GitHub push 完了。
- Vercel production deploy 完了。
- `https://jata-center-court-tennis.vercel.app/` は `curl -I` で `HTTP/2 200`。
- `https://jata-center-court-tennis.vercel.app/assets/jata-open-emblem.png` は `curl -I` で `HTTP/2 200`。

## 現在の状態

- ローカルプロトタイプとしてプレイ可能。
- Vercel production 公開済み。
- 確認用URL:

```text
http://127.0.0.1:8802/
http://100.82.86.8:8802/
```

- 未使用の看板画像はゲーム内から外した。
- Vercel deploy では `.vercelignore` で未使用の看板画像と visual direction board を除外。

## 次に足す候補

- 実機スマホで操作ボタンの誤タップ率を再確認。
- CPU難易度、サーブ速度、ロブ/ドロップの強さを微調整。
- JATA ARCADE 本体ページへの正式追加。
- 必要なら、将来のリアル3D版を別バージョンとして検討。
