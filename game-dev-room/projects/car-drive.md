# Car Drive

息子さん向けの車ゲーム試作。

## 現在の場所

- Prototype: `game-dev-room/prototypes/car-drive/`
- PC確認: `http://127.0.0.1:8791/`
- スマホ/Tailscale確認: `http://100.82.86.8:8791/`

## 現在の状態

- 3車線のドライブゲームとしてプレイ可能。
- PC操作確認OK。
- PCの左右キーは1押し1車線移動に調整済み。
- スマホ操作は画面下の `← / GO / →`。
- コイン取得、障害物衝突、スコア、ベスト、レベルあり。
- 効果音ON/OFFあり。
- 車種選択の入口あり。

## 実装済み車種

- Arcade Red
- Toyota Hilux
- Porsche 959

## 車素材方針

- Wikimedia CommonsのSVG profile drawingsを候補にする。
- 実車名付き素材は魅力があるが、公開版では個別ライセンス確認が必須。
- CC0 / Public Domain のSVGを優先。
- メーカー名、車名、ロゴ、エンブレムは商標面に注意する。
- 公開版ではロゴやエンブレムを強調しない。
- 必要なら「本物ベース」と「公開向けの似せすぎない車」の2系統に分ける。

## 次に足す候補

- BGM ON/OFF
- ゲームオーバー画像
- 高得点 / ハイスコア演出
- 背景ステージ
- 車種選択の拡張
- 素材クレジットページ
- スマホUIの微調整

## 誕生日版（2026-05-22 作成）

息子さんの誕生日（2026-05-23）向けに「壊さず・明日確実に遊べる」優先で2D版を仕上げた。
元の試作（`prototypes/car-drive/` 直下4ファイル）は温存し、別フォルダに作成。

- 場所: `prototypes/car-drive/birthday/`
- 構成: `index.html`（ランチャー）/ `shared/game.js` / `shared/styles.css` / `easy/` `normal/` `fast/`
- **全部Canvas描画＝外部画像依存なし。サーバー不要・オフラインでも `index.html` ダブルクリックで遊べる。**
- 追加した3点:
  1. 誕生日タイトル「おたんじょうび おめでとう！」
  2. 車4種（スポーツカー / レトロカー / トラック / きゅうきゅうしゃ、すべてCanvas描画）
  3. ゴール到達→紙吹雪＋「おめでとう！」＋「もういちど！」
- 難易度3版: easy=のんびり / normal=わくわく（おすすめ）/ fast=スピードチャレンジ。各 index.html の `window.CD_CONFIG` で調整。
- ブラウザ実機で動作確認済み（3版読み込み・4車種描画・ゴール演出・衝突・スマホ375px収まり）。
- ローカルプレビュー: `http://localhost:8791/`（`birthday/` を静的配信）。
- TERU確認待ち: 本番採用する難易度 / 名前入りタイトルにするか。

## 次チャット用メモ

チャットを軽く保つため、車ゲームの詳しい進捗はこのページと `prototypes/car-drive/README.md` に残す。
別チャットで再開する時は、まず `game-dev-room/working-style.md` とこのページを読む。
Vault側の詳細ノートは `30_PROJECTS/_GAME_DEV/car-drive/Car Drive.md`。

## Dino Drive Derby 3D（2026-05-25 作業中）

場所:

```text
/Users/teru44/Downloads/jata-arcade-control-tower/games/car-drive-3d
```

目的:

- 誕生日版/Car Drive 3Dから、JATA ARCADE正式ゲーム `Dino Drive Derby 3D` へ整理する。
- `YUZUKI` / Birthday / Gift / Present の表示を外し、個人情報を避ける。
- 恐竜ワールド、FRUIT収集、Poop障害物HP制へ寄せる。

今日の候補実装:

- `JATA ARCADE` / `DINO DRIVE DERBY 3D` 表記へ変更。
- タイトルアート、恐竜背景3枚、恐竜/Poop/FRUIT素材を `assets/` 配下へ整理。
- `FRUIT`スコア、`HP`表示を追加。
- 恐竜、岩、倒木は即ゲームオーバー。
- Poop / Rainbow Poop はHPを1削る。HP 0でゲームオーバー。
- iPad長押し操作、車選択、3Dガレージは維持する方針。

未確定メモ:

- FRUIT枚数は「8枠案」と「7枚+bonus panda案」があるため、確定扱いにしない。
- ぶどうパンダは「独立10点枠」案と「grape内包」案がある。現在のコードは独立10点の候補実装。
- persimmonは週末引き継ぎでは削除済み扱い。現コードには未採用。
- 水性恐竜、海生物、別ゲーム向き素材はDino Drive Derby 3D本編には採用しない方針。

確認URL候補:

```text
http://127.0.0.1:8783/games/car-drive-3d/
```

追加更新:

- FRUIT素材は全8種PNGへ統一。
- Poop / Rainbow Poop / Tomato / Allosaurus はTERUさん差し替え済み素材を同名ファイルで反映。
- ゴール動画は `Goal1.mp4`、FRUITベスト更新動画は `Goal2.mp4` を使用。
- ローカルサーバーでFRUIT、Poop、Allosaurus、Goal動画の読み込み確認OK。
- ゴール演出の車種別サンプルページを追加。
  - URL: `http://127.0.0.1:8783/games/car-drive-3d/goal-samples.html`
  - Sport Coupe: 疾走ズーム、GOAL文字、紙吹雪。
  - City Sedan: フルーツ高得点、FRUIT BEST、フルーツ浮上。
  - Patrol Car: 夜背景、NEW BEST、スポットライト、キラキラ。
  - 一枚絵のズーム/パン/エフェクトで動画風に見せる方針。車画像や背景は後から差し替え可能。
