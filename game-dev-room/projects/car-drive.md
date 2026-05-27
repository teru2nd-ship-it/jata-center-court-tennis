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

## 旧2D限定版（2026-05-26 撤去）

2Dの限定イベント仕様は、JATA ARCADE本体から撤去する方針に変更。
現在の正式導線は `Dino Drive Derby 3D` と、同梱の個人名なし `Classic Car Drive`。

- JATA ARCADEトップから旧2D限定カードを外す。
- 旧単独2Dフォルダ は削除対象。
- `games/car-drive-3d/2d/` は `Classic Car Drive` として中立化。
- 3D側の `2D Classic Drive` は同梱ローカル版へ接続。

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

- 旧2D限定版/Car Drive 3Dから、JATA ARCADE正式ゲーム `Dino Drive Derby 3D` へ整理する。
- 個人名と限定イベント用の表示を外し、個人情報を避ける。
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
- 追加方針: TERUさん指定の立ち絵ポスター3種を `assets/results/posters/` に整理し、タイトル部分を `GOAL!` に差し替える方向が有力。
- 報告書: `obsidian/30_PROJECTS/_GAME_DEV/car-drive/2026-05-25_報告書_Dino Drive Derby 3D.md`
- 明日候補: Sport Coupeは高速だがハンドル難しめ、City Sedanは低速だがハンドルが効く、Patrol CarはPoop耐性高め。
- 車体色変更はBlenderでGLBを増やす方式ではなく、Three.js側で車体マテリアルだけを動的に塗る方針。
  - Sport Coupe: `White` を赤系へ。
  - City Sedan: `LightBlue` をパステル系ランダムへ。
  - Patrol Car: `White` は白黒維持。Poop耐性発動時の発光/色変化候補あり。
  - 調査URL: `http://127.0.0.1:8783/games/car-drive-3d/?debugMaterials=1`

## 5/26 2D限定版表示の撤去

- 最優先対応として、JATA ARCADE側から旧2D限定版の公開カードと単独フォルダを撤去。
- 旧単独2Dフォルダ はローカルrepo上で削除対象にした。
- `games/car-drive-3d/2d/` は個人名なしの `Classic Car Drive` に変換。
  - 表示: `JATA ARCADE` / `CLASSIC DRIVE`
  - 収集表示: `FRUIT`
  - 3D側の `2D Classic Drive` は外部URLではなく `./2d/index.html` へ接続。
  - 旧イベント用のファイル名は `classic-*` に変更。
- 公開・push・Vercel反映は未実行。ローカル修正のみ。
- 検索確認: JATA ARCADE公開/ゲーム配下で個人名、限定イベント名、旧外部URL、旧単独フォルダ名のヒットなし。

### 残る注意

- Vault内の過去報告書には当時の限定版履歴が残っている。必要なら次に履歴ノートも匿名化する。

## 5/26 DDD 3D 車色選択・車種性能・Poop演出

- 車体色を車種ごとのボタン選択に変更。ランダムではなくTERUさんが選べる仕様。
  - Sport Coupe: Red / Blue / Navy / Yellow
  - City Sedan: Sky / Blue / Navy / Mint / Pink
  - Patrol Car: White / Blue / Navy
- 車種別性能を実装。
  - Sport Coupe: 高速、Boost強め、ハンドルはやや難しい。
  - City Sedan: 低速、ハンドルが効きやすい。
  - Patrol Car: 標準寄り、HP 5でPoop耐性高め。
- Poopダメージを音なしでも分かるように赤フラッシュとHP枠アニメーションを追加。
- Rainbow Poopはランダム効果。
  - Lucky: HPを1回復し、短時間シールド。
  - Bad: 2ダメージ。
- シールド中は恐竜・岩・倒木も1回防ぐ。
- ローカル実装のみ。push / Vercel反映は未実行。

## 5/26 DDD 3D ゴール動画差し替え

- TERUさん追加のゴールシーン動画2本を採用。
  - 通常ゴール: `gemini_generated_video_BD87F5CE.MP4`
  - 新記録ゴール: `gemini_generated_video_CE1D381A.MP4`
- Geminiマークが出ないよう、ゲーム側の動画表示を上寄せクロップに調整。
- 元動画は再エンコードせず、CSS表示で下部を隠す運用。
- ローカル確認後、push / Vercel本番反映へ進める。
- 追記: 上寄せクロップだと車が見切れるため、ゴール動画は `contain` 表示に戻し、全体が見えることを優先する。

## 5/27 DDD 3D スマホトップUIとゴール動画整理

- スマホ選択画面で車が隠れにくいよう、モバイル時は中央の大きい車説明カードを非表示に変更。
- モバイル時の小さい車カードは車名中心に圧縮し、説明文の折り返し崩れを回避。
- ゴール動画はTERUさん整理後のファイル名へ切替。
  - 車種別通常ゴール: `Goal3.mp4` / `Goal4.mp4` / `Goal2.mp4`
- New Best: `Goal5.mp4`
- 古いGemini名動画は参照から外す。

## 5/27 DDD 3D FRUIT表示バグとPCトップ修正

- FRUIT表示不具合対策として、`Peach.png` を `peach.png` へ小文字統一。
- FRUITテクスチャ読み込み失敗時も、色付き丸アイコンで表示されるフォールバックを追加。
- PCトップページ用にデスクトップ専用の左右レイアウトを追加。
  - 左: タイトル、車選択、色選択、開始ボタン
  - 右: 表紙画像
- スマホ側の見え方は前回の改善を維持。
