---
created: 2026-05-08
type: project_startup_handover
project: ゲーム開発室
source:
  - Neoゲーム開発室まとめ
  - iMacローカル確認
  - MacBook Proローカル確認
  - New project/game-dev-room
target:
  - MacBook Pro
  - 別PCのCodex
status: 立ち上げ用
---

# ゲーム開発室 立ち上げ用データ

作成日: 2026-05-08  
目的: iMac上で確認できた情報と、別チャット/別PCからの引き継ぎ情報をまとめ、MacBook Pro側の「ゲーム開発室」立ち上げに使う。

## 最重要ルール

外部変更が出る作業は、実行前にTERUさんへ確認する。

対象例:

- GitHub push
- GitHub Issue作成
- Pull Request作成
- Vercel Preview確認後の本番反映
- 公開URLの変更
- 共有設定変更
- 本番デプロイ
- 既存公開ゲームの挙動変更

ローカル確認、コード調査、ビルド、テスト、下書き作成は進めてよい。  
ただし、外部に反映される操作は必ず確認する。

## 情報の扱い

別チャットや別PCからの引き継ぎは、最新情報の時系列が前後することがある。

- `現在確認済み`: このiMacで実際に確認した情報
- `引き継ぎ情報`: 貼り付けや別チャット由来の情報
- `古い可能性あり`: 現在確認済み情報と比べて古い可能性がある情報

作業前には必ずローカル実態を確認する。

```bash
pwd
ls -la
git status --short
git branch --show-current
```

Git repoではないフォルダもあるので、`git status` が失敗しても慌てない。

## iMac上のゲーム開発室

現在確認済み:

```text
/Users/teru44/Documents/New project/game-dev-room
```

関連:

```text
/Users/teru44/Documents/New project/handover
/Users/teru44/Documents/New project/obsidian/30_PROJECTS/Game Dev Room.md
```

`New project` Git状態:

- 最新コミット: `e0df907 Add game development room notes`
- pushはしていない
- その後の引き継ぎ反映分が未コミットで残っている

未コミット差分の内容:

- SPORTS QUIZ RUSH / 4ブランドクイズ基盤メモ追加
- JATA DROPを公開済み、`codex-test`、`6fb1c5c` 前提へ更新
- Spider Solitaireの公開実体確認タスク追記
- 国旗神経衰弱の公開済み/主ファイル候補追記
- 共通改善、ロードマップ、作業場所メモ更新

## MacBook Pro側の確認結果

確認日: 2026-05-08

MacBook Pro側のゲーム開発室立ち上げは完了。ローカル状態確認のみ実施済み。
外部変更、push、Issue作成、Vercel操作、本番反映はしていない。

現在地:

```text
/Users/hayashidaakiraki/Documents/New project 2
```

- Git repoではない
- 中身は `handover/`, `notes/`, `attachments/` の引き継ぎ置き場

### MacBook Pro側 JATA DROP

本命:

```text
/Users/hayashidaakiraki/Documents/jata-drop
```

- Gitブランチ: `codex-test`
- 最新コミット: `6fb1c5c Finalize Dragon celebration sound`
- remote: `https://github.com/teru2nd-ship-it/jata-drop.git`
- 未コミット差分: `.gitignore` のみ
- `.gitignore` 差分: `.vercel`, `.env*.local`
- Vercelリンク名: `jata-drop`
- iMac側引き継ぎの `codex-test` / `6fb1c5c` と一致

### MacBook Pro側 Spider Solitaire

本命候補:

```text
/Users/hayashidaakiraki/Desktop/spider-solitaire
```

- Gitブランチ: `main`
- 最新コミット: `979ddd5 fix(mobile): prevent horizontal overflow on small screens`
- remote: `https://github.com/teru2nd-ship-it/spider-solitaire.git`
- Vercelリンク名: `spider-solitaire`
- iCloud側の `SpiderSolitaire_fixed.jsx` には `lineHeight: 1.14` と `padding: "0.08em 0"` が入っている
- ただし、DesktopのVercelリンク済みrepo側にはまだタイトル見切れ修正が入っていない
- タイトル見切れ修正の反映先はこのrepoの可能性が高い

### MacBook Pro側 国旗神経衰弱

本命候補:

```text
/Users/hayashidaakiraki/Desktop/flag-memory-game
```

- Gitブランチ: `main`
- 最新コミット: `d254767 fix(mobile): prevent horizontal overflow on small screens`
- remote: `https://github.com/teru2nd-ship-it/flag-memory-game.git`
- Vercelリンク名: `flag-memory-game`
- カード裏面にTERUさん画像の埋め込みあり
- 公開実体候補として強い

### MacBook Pro側 SPORTS QUIZ RUSH

作業場所:

```text
/Users/hayashidaakiraki/Documents/Codex/2026-04-30/macbook-pro-sports-quiz-rush-nba
```

- Git repoではない
- `package.json`, `index.html`, `src/` あり
- このMac上の `src/data` は `teams.js`, `cowboys.js`, `champions.js`, `players.js`, `packs.js` まで
- iMac側引き継ぎにある `study.js`, `entertain.js`, `kids.js`, `nba-favorites.js`, `storage.js` は見つからなかった
- SPORTS QUIZ RUSHはiMac側引き継ぎより、MacBook Pro側の実体が古い/狭い可能性がある

MacBook Pro側の次候補:

- Spider Solitaire のVercelリンク済みrepoで、タイトル見切れ修正が必要かローカル表示で確認する
- 外部反映はその後、TERUさん確認を挟む

## 公開先ベース導線

引き継ぎ情報:

```text
https://www.teru44.net/games
```

ゲーム個別の公開状態やVercel状態は、作業前に確認する。

## 主な対象ゲーム

現在の主対象:

1. Spider Solitaire
2. 国旗神経衰弱
3. JATA DROP
4. SPORTS QUIZ RUSH / 4ブランドクイズ基盤

加えて、新規ゲーム案や共通UI改善もこのプロジェクトで扱う。

## 共通の作業場所

iCloud 作業本体:

```text
/Users/teru44/Library/Mobile Documents/com~apple~CloudDocs/TERU_WORK/jata/
```

ローカル作業コピーでよく使った場所:

```text
/Users/teru44/Desktop/jata_work/
```

Codex作業ワークスペースで使っていた場所:

```text
/Users/teru44/Documents/Codex/2026-04-21-icloud-jata-drop-imac-icloud-drive/
```

運用メモ:

- iCloud直編集は競合しやすい
- 加工中はローカルコピーで作業し、完成版のみ戻す運用が安全
- 実装、画像処理、バッチ修正はCodex向き
- 記録整理、進行管理、Obsidian設計はClaude/Neo側と相性がよい

## JATA DROP

### 現在確認済み

このiMacで見つかった本命clone:

```text
/Users/teru44/Library/Mobile Documents/com~apple~CloudDocs/Documents/jata-drop
```

- GitHub remote: `https://github.com/teru2nd-ship-it/jata-drop.git`
- ブランチ: `codex-test`
- 最新コミット: `6fb1c5c Finalize Dragon celebration sound`
- 未コミット差分: `.gitignore`
- `.gitignore` 差分: `.vercel` と `.env*.local` を追加

### 公開状況

引き継ぎ情報:

- JATA DROP は公開済み
- 本番URL: `https://jata-drop.vercel.app`
- 最終デプロイ実体URL: `https://jata-drop-dl2dgtx7r-teru2nd-ship-its-projects.vercel.app`

### 直近で入った内容

シェア周り:

- シェア画像の縦横比修正
- スマホ向けの縦長ポスター寄りデザインへ調整
- シェア後に `もう一度` を押すと上に留まるバグを修正

進化ルート再編:

- 12段階から11段階へ変更
- `Small Snake` を `Snake` に変更
- `Medium Snake` 削除
- `Large Snake` を `King Cobra` に変更
- `Dragon` は11段階目へ
- `NEXT` 表示も修正済み

難易度とUI:

- Easy の危険ラインを上げて緩和
- BGM ON/OFF トグル追加
- 右上のトップ復帰ボタンを大きめに調整
- スマホ縦向き優先のガード追加

効果音:

- Web Audio API ベース
- `src/sounds.js` 新規
- `src/sounds.test.html` 新規
- SFX ON/OFF 追加
- BGM と独立して `localStorage` 保存

音配線:

- 落下開始: `シュッ`
- 合体: `ぽん`
- ゲームオーバー: `チーン`
- Dragon 到達後ゲームオーバーのみ特別演出音あり

主要ファイル:

- `src/JataDrop.jsx`
- `src/sounds.js`
- `src/sounds.test.html`
- `vite.config.js`

次回候補:

- 効果音の音量バランス調整
- Stage別の音色差の調整
- 家族プレイ後の難易度再調整
- 操作感の微調整

### 古い可能性あり

以下は別PC/過去チャット由来で、現在の `codex-test` / `6fb1c5c` より古い可能性が高い。

- 旧ローカル作業場所: `/Users/hayashidaakiraki/Documents/Codex/jata-drop`
- 旧作業ブランチ: `final-release-prep`
- 旧コミット: `8701e2a Prepare JATA DROP release docs`
- 旧未完了メモ: `final-release-prep` のpush、`RELEASE_ISSUE.md` のIssue化、Vercel Preview確認、本番反映

## Spider Solitaire

### 状況

引き継ぎ情報:

- すでに公開されている
- 公開URLの見た目で、トップ画面タイトル `SPIDER / SOLITAIRE` が少し上下見切れる問題があった

### 現在確認済みローカル候補

```text
/Users/teru44/Library/Mobile Documents/com~apple~CloudDocs/TERU_WORK/jata/SpiderSolitaire_themed.jsx
/Users/teru44/Library/Mobile Documents/com~apple~CloudDocs/TERU_WORK/jata/SpiderSolitaire_fixed.jsx
/Users/teru44/Library/Mobile Documents/com~apple~CloudDocs/TERU_WORK/jata/spider-App.jsx
/Users/teru44/Library/Mobile Documents/com~apple~CloudDocs/TERU_WORK/jata/spider-setup.sh
```

直近でやったこと:

- `SPIDER` の `<h1>` に `lineHeight: 1.14` を追加
- `SPIDER` の `<h1>` に `padding: "0.08em 0"` を追加

メモ:

- `spider-setup.sh` 的には、Vite プロジェクトに `SpiderSolitaire_fixed.jsx` を流し込む構成なので、公開版は `fixed` ベースの可能性が高い

まだ残っていること:

- MacBook Pro側のVercelリンク済みrepo `/Users/hayashidaakiraki/Desktop/spider-solitaire` でタイトル見切れ修正が必要かローカル表示確認
- `spider-solitaire-sigma.vercel.app` に反映されている公開用プロジェクトとの対応確認
- 必要なら再デプロイ

## 国旗神経衰弱

### 状況

引き継ぎ情報:

- 公開済み
- 以前、イラスト採用版へ更新済み
- カード裏面にTERUさんのイラストを使う版へ寄せた
- 現状かなり良い

### 現在確認済みローカル候補

```text
/Users/teru44/Library/Mobile Documents/com~apple~CloudDocs/TERU_WORK/jata/FlagMemoryGame.jsx
/Users/teru44/Library/Mobile Documents/com~apple~CloudDocs/TERU_WORK/jata/FlagMemoryGame_fixed.jsx
```

次に確認したいこと:

- 公開実体プロジェクトの所在
- デプロイ先と反映方法
- スマホでのタップ感
- クリア時のシェア文

## SPORTS QUIZ RUSH / 4ブランドクイズ基盤

### 現在確認済み

作業場所:

```text
/Users/teru44/Documents/Codex/2026-04-30/macbook-pro-sports-quiz-rush-nba
```

- 上記フォルダはこのiMacに存在する
- `index.html` と `src/` がある
- このフォルダ自体はGit repoではない
- ローカル確認URLの引き継ぎ: `http://localhost:4173/`

確認済みファイル:

```text
index.html
src/main.js
src/styles.css
src/quiz-engine.js
src/storage.js
src/data/champions.js
src/data/cowboys.js
src/data/entertain.js
src/data/kids.js
src/data/nba-favorites.js
src/data/packs.js
src/data/players.js
src/data/study.js
src/data/teams.js
```

注意:

- 引き継ぎ記載の主要ファイルに加えて、ローカルには `src/data/champions.js` と `src/data/players.js` も存在する
- 作業開始時はファイル内容を読んで、引き継ぎ情報との差分を確認する
- MacBook Pro側では `study.js`, `entertain.js`, `kids.js`, `nba-favorites.js`, `storage.js` が見つかっていないため、iMac側の方が新しい/広い可能性がある

### 現在の状態

もともとは `SPORTS QUIZ RUSH` のNBAクイズプロトタイプだったが、現在は4ブランド体制のクイズ基盤に拡張済み。

ブランド:

1. `SPORTS QUIZ RUSH`
2. `STUDY QUIZ DOJO`
3. `ENTERTAIN QUIZ ARENA`
4. `KIDS QUIZ PARK`

実装済み共通機能:

- パック選択画面
- モード選択画面
- 10問 / 20問ラウンド選択
- スコア表示
- 正解 / 不正解フィードバック
- 結果画面
- 称号表示
- `localStorage` によるハイスコア保存
- モード別ハイスコア
- ハイスコアリセット機能
- 回答後の正解/不正解ハイライト
- 学習系向けの解説カード表示
- ラウンド内重複なし出題

重要方針:

- 問題数は最低10問、できれば20問以上
- 公式ロゴ画像は使わず、チームカラーと略称のロゴ風カードを使う
- 公開版と個人プレイ用の権利グレー素材は分ける
- 学習系は `explanation` を必ず入れる
- 子ども向けは短文、ひらがな多め、難易度低め
- エンタメ系は引用を避け、トリビア形式にする

次にやると良いこと:

- 各パックの問題数を20問以上に増やす
- 第二種電気工事士 Pack をカテゴリ別に拡張
- KIDSの漢字/都道府県/国旗パック追加
- ENTERTAINの伊坂幸太郎/森博嗣パック追加
- SPORTSのCowboys Packをさらに増強
- ブランドごとに背景色や空気感を変える

## 共通改善

全ゲーム共通で揃えたいこと:

- BGM ON/OFF
- 効果音 ON/OFF
- 音量調整
- 縦横固定設定
- シェアボタン
- スコアやクリア結果の共有文
- モバイルで押しやすい設定ボタン
- ゲーム中に邪魔にならないUI配置

シェア導線に含めたいもの:

- ゲーム名
- スコアまたはクリア結果
- ひとことコメント
- 公開URL

モバイル対応:

- 指で押しやすいボタンサイズ
- 誤タップしにくい余白
- 縦横固定設定
- ゲーム画面を隠さない設定パネル
- 片手操作でも主要操作が届く配置

## 現在の優先順位

1. Spider Solitaire の公開実体プロジェクトを見つけてタイトル見切れ修正を反映する
2. JATA DROP の家族テスト後フィードバックを反映する
3. `teru44.net/games` の導線や見せ方を統一する
4. SPORTS QUIZ RUSH / 4ブランドクイズ基盤のローカル実態を確認する
5. 既存ゲームの共通UI、音、シェア導線を整える
6. Obsidian にゲーム開発ログを整理する

## MacBook Pro側で最初にやること

1. このファイルを新しい「ゲーム開発室」チャットまたは `project_handover.md` に貼る
2. MacBook Pro上のrepo/Vault/作業フォルダの実在パスを確認する
3. `git status --short` を確認し、未コミット差分を把握する
4. JATA DROPは `codex-test` / `6fb1c5c` があるか確認する
5. Spider Solitaireは `/Users/hayashidaakiraki/Desktop/spider-solitaire` を本命候補として確認する
6. 国旗神経衰弱は `/Users/hayashidaakiraki/Desktop/flag-memory-game` を本命候補として確認する
7. SPORTS QUIZ RUSHはiMac側とMacBook Pro側の `src/data` 差分を確認する
8. 外部変更が出る操作はTERUさんへ確認する

## 最初にCodexへ頼むとよい文

```text
このプロジェクトは「ゲーム開発室」です。
引き継ぎデータを読み、まずこのMac上で JATA DROP、Spider Solitaire、国旗神経衰弱、SPORTS QUIZ RUSH の作業場所を確認してください。
別チャットや別PC由来の情報は時系列が前後することがあるため、ローカル実態と引き継ぎ情報を分けて整理してください。
外部変更が出る作業、push、Issue作成、Vercel反映、本番デプロイは私に確認してから実行してください。
まずはローカル状態確認だけお願いします。
```

## 参照ファイル

iMac側:

- `/Users/teru44/Documents/New project/game-dev-room/README.md`
- `/Users/teru44/Documents/New project/game-dev-room/roadmap.md`
- `/Users/teru44/Documents/New project/game-dev-room/shared-improvements.md`
- `/Users/teru44/Documents/New project/game-dev-room/release-checklist.md`
- `/Users/teru44/Documents/New project/game-dev-room/projects/jata-drop.md`
- `/Users/teru44/Documents/New project/game-dev-room/projects/spider-solitaire.md`
- `/Users/teru44/Documents/New project/game-dev-room/projects/flag-memory.md`
- `/Users/teru44/Documents/New project/game-dev-room/projects/sports-quiz-rush.md`
- `/Users/teru44/Documents/New project/obsidian/30_PROJECTS/Game Dev Room.md`
