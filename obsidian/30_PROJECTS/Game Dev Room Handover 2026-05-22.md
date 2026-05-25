---
created: 2026-05-22
type: project_handover
project: ゲーム開発室
scope:
  - game-dev
  - botton
  - car-drive
  - jata-drop
  - spider-solitaire
  - flag-memory
  - sports-quiz-rush
status: 2026-05-22 引き継ぎ
---

# Game Dev Room Handover 2026-05-22

TERUさんのゲーム開発室を、別チャット、別PC、別Codexへ渡すための現在地まとめ。

## 最初に読む場所

- `game-dev-room/working-style.md`
- `game-dev-room/README.md`
- 作業対象ゲームの `game-dev-room/projects/*.md`
- 試作ゲームの場合は `game-dev-room/prototypes/*/README.md`
- `NOW.md` がある場合は必ず読む

別チャット開始時の定型文:

```text
このチャットはゲーム開発室の続きです。
まず /Users/teru44/Documents/New project/game-dev-room/working-style.md を読んでください。
次に、作業対象ゲームの project ページ、README、NOW.md があれば読んでください。
チャットは軽く、実装ログやTODOは作業場ファイルに残してください。
外部変更、push、Vercel反映、本番公開は確認してから進めてください。
```

## 最重要ルール

外部変更が出る操作は、実行前にTERUさんへ確認する。

- GitHub push
- GitHub Issue作成
- Pull Request作成
- Vercel Preview確認後の本番反映
- 公開URLの変更
- 共有設定変更
- 本番デプロイ
- 既存公開ゲームの挙動変更

ローカル確認、コード調査、ビルド、テスト、下書き作成、ローカルコミット、Vault保存は進めてよい。

## Vault更新ルール

- ゲーム開発室で進捗、実装、確認結果、公開状態、次TODOに更新が出たら、毎回Vault側にも書き込む。
- コード変更だけで終わらせず、対象ゲームの作業メモまたは引き継ぎノート更新までを完了条件にする。
- 次回チャットで必要になる情報は、チャット本文だけに閉じ込めない。

## 現在のローカル状態

確認日: 2026-05-22

作業ルート:

```text
/Users/teru44/Documents/New project
```

直近コミット:

```text
4d6294d Record BOTTON Vercel publish
2bd703c Add BOTTON mobile lightweight mode
49d7977 Clarify game dev handoff startup steps
150ebac Add game dev room working style
4fec6a7 Add car drive vehicle selection
55e4238 Fix car drive mobile controls
4c69e41 Add kids car drive prototype
ae9d6c5 Add BOTTON title logo
```

注意:

- `obsidian/README.md` に未コミット変更あり。
- `3d-printer-dev/`, `codex-test/`, `daily-reports/`, `docs/`, `infographics/output/`, `scripts/` などゲーム外の未追跡がある。
- 未関連変更は勝手に戻さない。

## BOTTON

場所:

```text
game-dev-room/prototypes/tetromino-drop/
```

主なページ:

- `README.md`
- `NOW.md`
- `BOTTON_HANDOFF.md`
- `PLAYTEST.md`

確認URL:

```text
http://127.0.0.1:8788/
http://100.82.86.8:8788/
https://botton.vercel.app
```

最新状態:

- `BOTTON / BOTTOM x BUTTON` の落ち物パズル。
- 10 x 20 のテトロミノ風ゲームとしてプレイ可能。
- PC操作、スマホ操作、ゴースト、次ブロック、スコア、ライン、レベル、ベスト、一時停止、リスタートあり。
- BGM/SFXトグル、テーマ切替あり。
- テーマは `Poop Face`, `Classic`, `Shooting Star`, `JATA Reptile`。
- Poop FaceはTERUさん指定イラスト、手描き原画、レインボーウンチパンダをブロック内に反映。
- 背景は水、海、爽快感のFlush背景セット。
- ゲームオーバー時はダークアートをランダム表示。
- 高得点/ハイスコア時は動画とキラキラ演出。
- iPhone向け軽量モードあり。
- `assets/mobile/backgrounds/`, `assets/mobile/game-over/` に軽量コピーあり。
- 2026-05-18にVercel project `botton` として公開済み。

次に見ること:

- iPhone実機で初回ロード、操作ボタン、表示崩れ、ゲームオーバーを確認。
- 結果動画は軽量/低モーション環境ではスキップされる設計。
- Git pushは未完了扱い。外部反映なので確認後に進める。

## Car Drive

場所:

```text
game-dev-room/prototypes/car-drive/
game-dev-room/projects/car-drive.md
```

確認URL:

```text
http://127.0.0.1:8791/
http://100.82.86.8:8791/
```

現在の状態:

- 息子さん向けの車ゲーム試作。
- 3車線ドライブゲームとしてプレイ可能。
- PC操作確認OK。
- PC左右キーは1押し1車線移動に調整済み。
- スマホ操作は `← / GO / →`。
- コイン取得、障害物衝突、スコア、ベスト、レベルあり。
- 効果音ON/OFFあり。
- 車種選択入口あり。

実装済み車種:

- Arcade Red
- Toyota Hilux
- Porsche 959

素材方針:

- Wikimedia CommonsのSVG profile drawingsを候補にする。
- 実車名付き素材は魅力があるが、公開版では個別ライセンス確認が必須。
- CC0 / Public Domain のSVGを優先。
- メーカー名、車名、ロゴ、エンブレムは商標面に注意。
- 公開版ではロゴやエンブレムを強調しない。
- 必要なら「本物ベース」と「公開向けの似せすぎない車」の2系統に分ける。

次に足す候補:

- BGM ON/OFF
- ゲームオーバー画像
- 高得点/ハイスコア演出
- 背景ステージ
- 車種選択の拡張
- 素材クレジットページ
- スマホUI微調整

### Dino Drive Derby 3D 追加メモ（2026-05-25）

作業場所:

```text
/Users/teru44/Downloads/jata-arcade-control-tower/games/car-drive-3d
```

目的:

- 誕生日版から分離し、JATA ARCADE正式3Dゲーム `Dino Drive Derby 3D` として整える。
- `YUZUKI` / Birthday / Gift / Present を表示から外す。
- 恐竜ワールド、FRUIT収集、Poop障害物HP制に寄せる。

今回の重要仕様:

- 恐竜、岩、倒木は即ゲームオーバー。
- Poop / Rainbow Poop はHPを1削る。HP 0でゲームオーバー。
- iPad長押し操作、車選択、3Dガレージ、2D導線は壊さない。

素材仕様のズレは確定せず保持:

- FRUIT枚数: 8枠案 / 7枚+bonus panda案
- ぶどうパンダ: 独立10点枠案 / grape内包案
- 点数: 通常1-3点、Panda 5点、Grape Panda 10点は候補
- persimmon: 週末引き継ぎでは削除済み扱い

確認URL候補:

```text
http://127.0.0.1:8783/games/car-drive-3d/
```

2026-05-25 追加更新:

- 報告書: `_GAME_DEV/car-drive/2026-05-25_報告書_Dino Drive Derby 3D.md`
- FRUIT素材は全8種PNGへ統一。
- Poop / Rainbow Poop / Tomato / Allosaurus はTERUさん差し替え済み素材を同名ファイルで反映。
- ゴール動画は `Goal1.mp4`、FRUITベスト更新動画は `Goal2.mp4` を使用。
- ゴール演出サンプルを追加。
  - `http://127.0.0.1:8783/games/car-drive-3d/goal-samples.html`
  - Sport Coupe / City Sedan / Patrol Car の3案。
  - 一枚絵のズーム、パン、紙吹雪、GOAL文字、FRUIT高得点、NEW BEST演出で動画風に見せる。
- 追加方針: TERUさん指定の立ち絵ポスター3種を `assets/results/posters/` に整理し、タイトル部分を `GOAL!` に差し替える方向が有力。
- 明日候補: Sport Coupeは高速だがハンドル難しめ、City Sedanは低速だがハンドルが効く、Patrol CarはPoop耐性高め。
- ローカルサーバーでFRUIT、Poop、Allosaurus、Goal動画の読み込み確認OK。

## JATA DROP

主なメモ:

```text
game-dev-room/projects/jata-drop.md
```

本命clone候補:

```text
/Users/teru44/Library/Mobile Documents/com~apple~CloudDocs/Documents/jata-drop
/Users/hayashidaakiraki/Documents/jata-drop
```

GitHub:

```text
https://github.com/teru2nd-ship-it/jata-drop.git
```

共有時点:

- ブランチ: `codex-test`
- 最新コミット: `6fb1c5c Finalize Dragon celebration sound`
- 本番URL: `https://jata-drop.vercel.app`
- 最終デプロイ実体URL: `https://jata-drop-dl2dgtx7r-teru2nd-ship-its-projects.vercel.app`

現在の方向:

- 公開済み。
- 家族テスト後の音量、難易度、操作感の微調整フェーズ。
- 既にBGM/SFX独立トグル、効果音、進化ルート再編、シェア修正などが入っている。

## Spider Solitaire

主なメモ:

```text
game-dev-room/projects/spider-solitaire.md
```

状況:

- 公開済み。
- `SPIDER / SOLITAIRE` のタイトル見切れ修正がローカルソースには反映済み。
- iCloud側ViteコピーにはBGM/SFXトグルと各種効果音を追加済み。
- 公開実体候補はMacBook Pro側 `/Users/hayashidaakiraki/Desktop/spider-solitaire`。

次に見ること:

- MacBook Pro側Vercelリンク済みrepoでローカル表示確認。
- 見切れ修正と音まわりを公開実体へ移植するか判断。
- 公開反映は確認後に進める。

## 国旗神経衰弱

主なメモ:

```text
game-dev-room/projects/flag-memory.md
```

状況:

- 公開済み。
- カード裏面にTERUさんイラストを使う方向。
- iCloud側 `FlagMemoryGame.jsx` に自己完結型BGM/SFXトグルと効果音を追加済み。
- 公開実体候補はMacBook Pro側 `/Users/hayashidaakiraki/Desktop/flag-memory-game`。

次に見ること:

- MacBook Pro側本命候補と公開版の対応。
- スマホのタップ感。
- クリア時のシェア文。
- 共通UIとシェア導線追加。

## SPORTS QUIZ RUSH / 4ブランドクイズ基盤

主なメモ:

```text
game-dev-room/projects/sports-quiz-rush.md
```

作業候補:

```text
/Users/teru44/Documents/Codex/2026-04-30/macbook-pro-sports-quiz-rush-nba
/Users/hayashidaakiraki/Documents/Codex/2026-04-30/macbook-pro-sports-quiz-rush-nba
```

状況:

- もとはNBAクイズプロトタイプ。
- 現在は4ブランド基盤へ拡張済み情報あり。
- SPORTS QUIZ RUSH, STUDY QUIZ DOJO, ENTERTAIN QUIZ ARENA, KIDS QUIZ PARK。
- iMac側、MacBook Pro側、Neo側情報に差分あり。
- 作業開始時は必ず実体ファイルを確認する。

音まわり:

- iMac側には `src/audio.js` とBGM/SFXトグル追加済み情報あり。
- Neo側ではWeb Audio API仮音源、音量設定、30秒制限、離脱失格、称号メダルなど実装済み扱い。
- 保存キーの差分があるため、次回実体確認が必要。

次に見ること:

- どのMacの実体が最新か確認。
- `src/audio.js`, `storage.js`, `study.js`, `entertain.js`, `kids.js`, `nba-favorites.js` の有無確認。
- 問題追加は20問以上とラウンド内重複なし出題を前提にする。

## 共通改善

主なメモ:

```text
game-dev-room/shared-improvements.md
game-dev-room/roadmap.md
game-dev-room/release-checklist.md
```

全ゲームで揃えたいこと:

- BGM ON/OFF
- 効果音 ON/OFF
- 音量調整
- 縦横固定設定
- シェアボタン
- スコアやクリア結果の共有文
- モバイルで押しやすい設定ボタン
- ゲーム中に邪魔にならないUI配置

公開先ベース導線:

```text
https://www.teru44.net/games
```

## 次の自然な作業

1. BOTTONのiPhone実機プレイ確認を完了する。
2. Car DriveにBGM、ゲームオーバー画像、高得点演出を入れる。
3. Car Driveの車種素材をライセンス確認しながら増やす。
4. Spider Solitaire / 国旗神経衰弱の公開実体repoを確認し、音まわりを移植する。
5. SPORTS QUIZ RUSHのiMac/MacBook Pro/Neo差分を整理する。
6. `teru44.net/games` のゲーム導線を統一する。

## 保存メモ

このノートは、チャットの軽量化のための入口。
細かい実装ログは各ゲームページに追記する。
最新情報が前後する場合は、ローカル実体確認を優先する。
