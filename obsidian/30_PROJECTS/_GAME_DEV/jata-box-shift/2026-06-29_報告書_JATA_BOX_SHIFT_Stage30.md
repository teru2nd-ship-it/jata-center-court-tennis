---
created: 2026-06-29
type: work_report
project: JATA BOX SHIFT
scope:
  - game-dev-room
  - jata-box-shift
  - sokoban
  - stage-design
  - vercel-production
status: production_updated
audience:
  - TERU
  - Codex
---

# 2026-06-29 報告書 JATA BOX SHIFT Stage 30

## 今日の結論

`https://jata-box-shift.vercel.app/` の公開版から、実装済みの20面データを確認した。

その20面をローカルの `game-dev-room/prototypes/sokoban/` に反映し、続きとして21〜30面を10面だけ丁寧に追加した。

前回の反省として、50面級の大量生成や後半の単純繰り返しは避けた。追加10面は壁形状がすべてユニークで、移動手数・押し数もソルバーで確認済み。

## 作業場所

```text
/Users/teru44/Documents/New project/game-dev-room/prototypes/sokoban/
```

主なファイル:

- `game.js`
- `index.html`
- `styles.css`
- `README.md`

## 元データ

公開版:

```text
https://jata-box-shift.vercel.app/
https://jata-box-shift.vercel.app/game.js
```

公開版 `game.js` では、実プレイ対象は `BASE_LEVELS` の20面。

`GENERATED_LEVELS` も残っていたが、21面以降の生成候補であり、M1時点では使われていなかった。今回は単純な生成面の流用はせず、21〜30面を別途選別して追加した。

## 実装したこと

- `LEVELS` を公開版20面ベースへ差し替え。
- ステージ選択ボタンを `LEVELS.length` から自動生成する形に変更。
- `Nest 21`〜`Nest 30` を追加。
- `index.html` のキャッシュ版数を `box-shift-30` へ更新。
- `README.md` を30ステージ表記へ更新。
- ステージボタンは30面でも折り返し表示できるよう維持。

## 2026-06-30 追記: エンドカードと背景画像

TERU作成の画像3枚を `game-dev-room/prototypes/sokoban/assets/clear/` に追加した。

使い分け:

- `end-card-hatchling.jpg`: 30面クリア時のエンドカード本体。3枚目の孵化画像。
- `sparkle-sumomo-bg-1.jpg`: ステージ背景用。1枚目を薄くランダム表示。
- `nest-sumomo-bg-2.jpg`: ステージ背景用。2枚目を薄くランダム表示。

実装内容:

- 通常プレイ中の背景に `BACKDROP_IMAGES` から画像を薄く表示。
- ステージごとに背景が自然に切り替わるよう、セッション内ランダムシードを使用。
- 30面クリア時だけ `HAPPY HATCH!` のアニメーション文字を表示。
- 30面クリア時だけ `end-card-hatchling.jpg` を全面エンドカードとして表示。
- `index.html` のキャッシュ版数を `game.js?v=box-shift-endcard` へ更新。

次に背景を増やす場合:

1. 画像を `assets/clear/` に追加する。
2. `game.js` の `BACKDROP_IMAGES` に画像パスを追加する。
3. `README.md` の「追加背景」に画像名を追記する。

## 2026-06-30 追記: 背景画像3枚目

TERU追加画像をステージ背景用として追加した。

```text
assets/clear/jungle-sumomo-bg-3.jpg
```

実装内容:

- `BACKDROP_IMAGES` に `jungle-sumomo-bg-3.jpg` を追加。
- 既存のランダム薄表示ローテーションに3枚目として参加。
- `index.html` のキャッシュ版数を `game.js?v=box-shift-bg3` へ更新。

Git / Vercel:

```text
commit: 0ad8811 Add JATA BOX SHIFT jungle backdrop
production URL: https://jata-box-shift.vercel.app/
deployment: https://jata-box-shift-5nbfspdtx-teru2nd-ship-its-projects.vercel.app
deployment id: dpl_4qTGzSzaDdRtzMou5ts9BphMKakz
inspect: https://vercel.com/teru2nd-ship-its-projects/jata-box-shift/4qTGzSzaDdRtzMou5ts9BphMKakz
```

公開後確認:

- `https://jata-box-shift.vercel.app/` は `HTTP/2 200`。
- `assets/clear/jungle-sumomo-bg-3.jpg` は `HTTP/2 200`。
- 公開HTMLで `game.js?v=box-shift-bg3` 読み込みを確認。
- 公開 `game.js?v=box-shift-bg3` に背景3枚が含まれることを確認。

## 追加10面の検証結果

ソルバー確認値:

| Stage | Size | Boxes | Min Moves | Min Pushes |
|---:|---:|---:|---:|---:|
| 21 | 12x9 | 2 | 21 | 7 |
| 22 | 12x8 | 2 | 22 | 7 |
| 23 | 11x7 | 2 | 22 | 11 |
| 24 | 12x9 | 3 | 24 | 11 |
| 25 | 9x7 | 3 | 24 | 9 |
| 26 | 10x8 | 3 | 26 | 9 |
| 27 | 11x9 | 3 | 27 | 9 |
| 28 | 13x9 | 2 | 29 | 10 |
| 29 | 13x8 | 3 | 29 | 10 |
| 30 | 11x8 | 3 | 37 | 12 |

確認済み:

- 全30面で構文OK。
- 全30面で箱数と巣数が一致。
- 全30面でプレイヤーは1体だけ。
- 全30面で完全重複なし。
- 追加10面は壁形状も10面すべてユニーク。
- 追加10面は全て解答可能。
- DOMスモークでステージボタン30個生成、30面目選択OK。

## 使った検証

```text
node --check game.js
```

独自ソルバーで以下を検査:

- `LEVELS.length === 30`
- exact map duplicateなし
- 追加10面の wall layout duplicateなし
- min moves
- min pushes
- 30面目選択時のセル数

## 次回ステージ追加時の方針

次に増やす場合は、31面から始める。

今回の追加と同じく、以下の条件を守る:

- 10面単位で追加する。
- 大量生成しない。
- 既存面と完全一致させない。
- 追加セット内で壁形状を繰り返さない。
- ソルバーで解答可能性、最小移動手数、最小押し数を確認する。
- 30面の続きとして、31〜40は最小移動手数30〜45手程度を目安にする。
- 箱数は2〜4個を中心にし、箱数だけで難しくしない。

## Git / Vercel

GitHub:

```text
repo: https://github.com/teru2nd-ship-it/jata-center-court-tennis.git
branch: main
commit: 57d6bda Add JATA BOX SHIFT stages 21-30
```

Vercel:

```text
project: jata-box-shift
production URL: https://jata-box-shift.vercel.app/
deployment: https://jata-box-shift-gv4ztuzh9-teru2nd-ship-its-projects.vercel.app
deployment id: dpl_FsHAxMAkwdxNceUDMf2njZWjmFNN
inspect: https://vercel.com/teru2nd-ship-its-projects/jata-box-shift/FsHAxMAkwdxNceUDMf2njZWjmFNN
```

公開後確認:

- `https://jata-box-shift.vercel.app/` は `HTTP/2 200`。
- 公開HTMLで `1/30` 表示を確認。
- 公開HTMLで `game.js?v=box-shift-30` 読み込みを確認。
- 公開 `game.js?v=box-shift-30` に21〜30面の追加データが含まれることを確認。

## 2026-06-30 Git / Vercel 追記

エンドカードと背景画像の反映:

```text
commit: c52285f Add JATA BOX SHIFT end card art
production URL: https://jata-box-shift.vercel.app/
deployment: https://jata-box-shift-c6027a1mq-teru2nd-ship-its-projects.vercel.app
deployment id: dpl_4BprhBWPWS66jy27sBDUypdobV5o
inspect: https://vercel.com/teru2nd-ship-its-projects/jata-box-shift/4BprhBWPWS66jy27sBDUypdobV5o
```

公開後確認:

- `https://jata-box-shift.vercel.app/` は `HTTP/2 200`。
- `assets/clear/end-card-hatchling.jpg` は `HTTP/2 200`。
- `assets/clear/nest-sumomo-bg-2.jpg` は `HTTP/2 200`。
- `assets/clear/sparkle-sumomo-bg-1.jpg` は `HTTP/2 200`。
- 公開HTMLで `game.js?v=box-shift-endcard` 読み込みを確認。
- 公開 `game.js?v=box-shift-endcard` に `BACKDROP_IMAGES`、`HAPPY HATCH!`、`is-final-clear` が含まれることを確認。

ローカル注意:

- `game-dev-room/prototypes/sokoban/.vercel/` はVercel CLIのローカルリンク情報。コミットしない。
- `game-dev-room/prototypes/sokoban/.gitignore` で `.vercel` を除外する。
