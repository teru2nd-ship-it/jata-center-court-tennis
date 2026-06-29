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
status: local_verified
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

この報告作成時点ではローカル検証済み。

Git commit / push と Vercel production deploy の結果は、この後の公開作業完了後に追記する。
