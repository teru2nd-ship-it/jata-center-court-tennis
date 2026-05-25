---
created: 2026-05-25
type: work_report
project: Dino Drive Derby 3D
scope:
  - car-drive-3d
  - jata-arcade
  - goal-result
  - asset-organization
status: local_saved
---

# 2026-05-25 報告書 Dino Drive Derby 3D

## 今日の目的

`Car Drive 3D` / 誕生日版の流れを、JATA ARCADE正式ゲーム `Dino Drive Derby 3D` として整理する。

特に今日は、素材差し替え、FRUIT/障害物の方向性、ゴール演出、引き継ぎメモ更新を進めた。

## 作業場所

```text
/Users/teru44/Downloads/jata-arcade-control-tower/games/car-drive-3d
```

確認URL:

```text
http://127.0.0.1:8783/games/car-drive-3d/
http://127.0.0.1:8783/games/car-drive-3d/goal-samples.html
```

## 実装・整理したこと

- `Dino Drive Derby 3D` をJATA ARCADE正式3D恐竜ドライブゲームとして整理。
- FRUIT素材を8種PNGへ統一。
- TERUさん差し替え済み素材を同名ファイルで反映。
  - Tomato
  - Poop
  - Rainbow Poop
  - Allosaurus
- ゴール動画を差し替え。
  - 通常ゴール: `Goal1.mp4`
  - FRUITベスト更新: `Goal2.mp4`
- ゴール演出サンプルページを追加。
  - Sport Coupe: 疾走ズーム、GOAL文字、紙吹雪。
  - City Sedan: フルーツ高得点、FRUIT BEST、フルーツ浮上。
  - Patrol Car: 夜背景、NEW BEST、スポットライト、キラキラ。
- TERUさん指定の立ち絵ポスター3種を整理。
  - `assets/results/posters/goal-sport.png`
  - `assets/results/posters/goal-patrol.png`
  - `assets/results/posters/goal-dino-pack.png`
- ゴール演出は、立ち絵ポスターのタイトル部分を `GOAL!` に差し替える方向が有力。

## 現在のゲーム仕様メモ

- 恐竜、岩、倒木は衝突で即ゲームオーバー。
- Poop / Rainbow Poop はHPを1削る。HP 0でゲームオーバー。
- iPad長押し操作、車選択、3Dガレージ、2D導線は維持。
- FRUIT点数は現時点で候補値。
  - 通常フルーツ: 1〜3点
  - Panda: 5点
  - Grape Panda: 10点

## 明日の有力調整案

車種ごとの差を入れる。

- Sport Coupe
  - スピードが速い。
  - ハンドル操作は少し難しい。
  - 上級者向け。
- City Sedan
  - スピードは控えめ。
  - ハンドルがよく効く。
  - 子ども向け、安定型。
- Patrol Car
  - Poop耐性が高い。
  - それ以外は標準性能。
  - 安全寄りのバランス型。

候補パラメータ:

```text
Sport Coupe: speed +15〜25%, steering -10〜20%, poop hp標準
City Sedan: speed -10〜15%, steering +15〜25%, poop hp標準
Patrol Car: speed標準, steering標準, poop耐性 +1〜2
```

## 未確定・次回判断

- タイトル/ロゴはまだ修正候補。
- `Dino Drive Derby 3D` の表紙画像は、ゲーム内よりJATA ARCADEトップカードで使う案もあり。
- ゴール演出は、立ち絵ポスター3種をベースにする方向。
- 車種別パラメータを入れた後、iPadで操作感確認。
- 地面、道路、遠景の馴染ませを次に詰める。
- FRUIT枚数とGrape Pandaの扱いは最終確定前。

## 今日のローカルコミット

JATA Arcade control tower:

```text
183339d Use goal poster samples for Dino Drive
f2848f9 Add Dino Drive goal scene samples
7e42f0d Update Dino Drive Derby fruit and goal assets
f175083 Refit Car Drive 3D as Dino Drive Derby
```

Game Dev Room / Vault:

```text
23e0f2a Add Dino Drive Derby 3D work report
a857c3e Record Dino Drive goal poster direction
3e63728 Record Dino Drive goal samples
3c1e466 Record Dino Drive asset refresh
46f006f Record Dino Drive Derby 3D handoff
```

## 外部反映

- `jata-arcade-control-tower` は `origin/main` より2コミット先行。
  - `f2848f9 Add Dino Drive goal scene samples`
  - `183339d Use goal poster samples for Dino Drive`
- つまり `7e42f0d Update Dino Drive Derby fruit and goal assets` まではpush済み、ゴール演出サンプル2件は未push。
- Vercel本番反映はしていない。
- 公開URL変更はしていない。

## 次回開始メモ

次回はまず以下を読む。

```text
/Users/teru44/Documents/New project/game-dev-room/working-style.md
/Users/teru44/Documents/New project/game-dev-room/projects/car-drive.md
/Users/teru44/Downloads/jata-arcade-control-tower/games/car-drive-3d/README.md
```

次回の最初の実装候補:

1. 車種別パラメータ実装。
2. Patrol CarのPoop耐性実装。
3. 地面/道路/遠景の調整。
4. ゴール演出ポスターの `GOAL!` 表記をさらに詰める。
5. iPad実機で操作感確認。
