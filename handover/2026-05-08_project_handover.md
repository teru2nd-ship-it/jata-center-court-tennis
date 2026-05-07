---
created: 2026-05-08
type: project_handover
scope:
  - blog
  - obsidian
  - jata-drop
  - game-dev
status: 整理済み
---

# プロジェクト引き継ぎデータ

作成日: 2026-05-08

## 対象

- TERUさんのブログ運用
- Obsidian整理
- JATA DROP
- ゲーム開発まわり

## 目的

過去チャットで進めていた内容を、今後このプロジェクト内で継続しやすいように整理する。
過去チャット自体はプロジェクトへ移動できないため、このファイルを初期文脈として使う。

## 最重要ルール

外部変更が出る作業は、実行前にTERUさんへ確認する。

対象例:

- GitHub push
- GitHub Issue作成
- Vercel Preview確認後の本番反映
- 公開記事の確定
- Drive保存や共有設定変更

## このチャット群で扱ったこと

- ブログ記事運用の整理
- JATA DROPのGitHub/Vercel公開準備
- Obsidian Vaultの整理
- ゲーム改善メモの蓄積
- 開発予定ゲーム案のメモ化
- クロちゃん共有用ログの作成
- 今後はプロジェクトにまとめて進める方針確認

## ブログ運用

### 共有された記事

記事タイトル:

AI時代、人間はグレーになるのか。バスケ帰りに考えた身体と知性の話

主題:

- AI時代の身体性
- 昔の食の知恵
- 発酵とAI
- ホメオスタシス
- スポーツ
- BtoC構想
- AIの記憶や時系列の弱さ

### ブログ運用ルール

- 一人称は「私」
- 冒頭は「どうも、てるよしネットのてるよしです」
- 末尾は「ではまた。てるよしネットでした」
- AI3者表記は Charlie / クロちゃん / Gimmyさん
- 記事は記録寄り
- バズ狙いの煽りに寄せすぎない
- 日報には本文全文ではなく、記事名、素材元、主題、要確認事項を残す
- 本文全文はGmail下書き、または別ノートへ分ける

### 公開前チェック

- 一人称
- AI3者表記
- 冒頭と末尾
- スポーツ情報の最新性
- 固有名詞
- 読後感が煽りに寄りすぎていないか

### スポーツ関連の確認状況

- ルカ・ドンチッチのレイカーズ移籍前提は確認済み
- Caleb DownsのCowboys指名前提は確認済み
- 八村塁のレイカーズ所属前提は大きな矛盾なし
- スポーツ情報は公開直前に再確認する

## JATA DROP

### リポジトリ

- GitHub: `github.com/teru2nd-ship-it/jata-drop`
- 状態: Private repo
- GitHub連携からは直接見えなかったため、TERUさんがローカルにclone済み

ローカル作業場所:

```text
/Users/hayashidaakiraki/Documents/Codex/jata-drop
```

### Git状態

- `main` と `origin/main` は同一の初期コミット
- `main` 直接コミットはしていない
- 作業ブランチ `final-release-prep` を作成済み
- ローカルコミット作成済み

ローカルコミット:

```text
8701e2a Prepare JATA DROP release docs
```

### 実施済み

- README更新
- プレイ方法
- ビルド方法
- 難易度説明
- 全12段階の進化表
- ブランチ運用ルール
- リリース前チェックリスト
- `RELEASE_ISSUE.md` 作成
- GitHub Issue化用の下書き
- Vercel本番公開前の確認項目
- `npm ci` 実行
- `npm run build` 実行
- 12段階の進化定義と画像ファイル欠けなしを確認
- ローカルブラウザでメニュー、ゲーム開始、ドロップ、合体、コンソールエラーなしを確認

### 確認済み進化段階

- Egg
- Hatch
- Axolotl
- Small Snake
- Medium Snake
- Large Snake
- Alligator
- Velociraptor
- Albertaceratops
- Dunkleosteus
- Mosa
- Dragon

### 未完了

- `final-release-prep` のGitHub push
- `RELEASE_ISSUE.md` 内容でGitHub Issue作成
- Vercel Preview確認
- Vercel本番反映
- モバイル実機確認

### 注意

- push、Issue作成、本番反映は外部変更なのでTERUさん確認後に実行する
- 長時間のゲームオーバー強制テストはブラウザ自動操作が途中でタイムアウトしたため、実機または手動で再確認する
- `npm audit --audit-level=high` は高危険度以上なし
- Vite/esbuildの開発サーバー系moderate advisoryは残る

## Obsidian整理

Vault:

```text
/Users/hayashidaakiraki/Documents/Obsidian_Vault_TERU
```

### 整理方針

- `00_DAILY`: その日の入口、作業ログ、次アクション
- `10_INBOX`: 置き場所未定メモ
- `20_AREAS`: 継続運用
- `30_PROJECTS`: 成果物がある案件
- `90_ARCHIVE`: 完了・休止

### 作成・更新した主なノート

- `Obsidian Vault TERU.md`
- `00_DAILY/2026-04-26.md`
- `30_PROJECTS/JATA DROP/JATA DROP.md`
- `30_PROJECTS/JATA DROP/リリース準備ログ 2026-04-26.md`
- `30_PROJECTS/JATA DROP/改善要望.md`
- `20_AREAS/ブログ運用/ブログ更新運用.md`
- `20_AREAS/ブログ運用/2026-04-26 AI時代、人間はグレーになるのか.md`
- `20_AREAS/ゲーム開発運用.md`
- `20_AREAS/開発予定ゲーム.md`
- `30_PROJECTS/スパイダーソリティア.md`
- `30_PROJECTS/国旗神経衰弱.md`

### 運用方針

- デイリーは入口
- 詳しい内容はProjectまたはAreaに分ける
- 空の無題ファイルや空Canvasは削除してOK
- 何か1行でも意味がある場合は `10_INBOX` へ移す

## ゲーム改善メモ

### 全ゲーム共通で揃えたいこと

- BGM ON/OFF
- 効果音 ON/OFF
- 音量調整
- 縦横固定設定
- シェアボタン
- スコアやクリア結果の共有文
- モバイルで押しやすい設定ボタン
- ゲーム中に邪魔にならないUI配置

### JATA DROP改善要望

- BGM変更
- 難易度調整をもう少し詰める
- 効果音追加
- BGM ON/OFF
- 効果音 ON/OFF
- シェア導線整理
- 縦横固定設定

### スパイダーソリティア改善要望

- トランプをもっと見やすくする
- 効果音追加
- BGM追加
- BGM ON/OFF
- 効果音 ON/OFF
- 縦横固定設定
- シェアボタン

### 国旗神経衰弱改善要望

- ほぼ良い
- BGM追加
- BGM ON/OFF
- 効果音 ON/OFF
- シェアボタン
- 縦横固定設定
- 他ゲームと設定UIを揃える

## 開発予定ゲーム案

- クロスワードパズル
- なぞなぞ
- ロードランナー的な単純アクションゲーム
- 車好きな息子向けの車運転系ゲーム
- マイクラの建築のみに特化したシンプルゲーム
- 豆知識クイズ

方針:

まず既存3ゲームの共通UI、音、シェア導線を整える。その後、新規ゲーム候補の優先順位を決める。

## クロちゃん共有用ログ

作成済み:

```text
/Users/hayashidaakiraki/Documents/Codex/2026-04-26/cowork-obsidian-ai3-ai3-openai-google/2026-04-26_work_log_for_kurochan.txt
```

内容:

- JATA DROP作業状況
- Obsidian整理
- ブログ運用
- ゲーム改善メモ
- 開発予定ゲーム案
- 次にクロちゃんへ依頼すると良さそうなこと

## 今後このプロジェクトでやると良いこと

### 優先度高

- JATA DROPの `final-release-prep` をGitHubへpushしてよいか確認
- `RELEASE_ISSUE.md` をGitHub Issue化してよいか確認
- Vercel Preview確認
- モバイル実機確認
- 問題なければ本番反映

### 次の開発候補

JATA DROPをブランチ分けして進める。

- `audio-settings`
- `difficulty-tuning`
- `share-settings-ui`

### 共通化候補

既存3ゲームで共通設定UIを作る。

- BGM ON/OFF
- 効果音 ON/OFF
- シェア
- 縦横固定
- モバイル向け設定ボタン

## このプロジェクトでの進め方

- 今後はこのプロジェクト内で続ける
- 過去チャットそのものは移動できないが、この引き継ぎデータを初期文脈として使う
- 新しい作業を始める時は、まずこのファイルとObsidianの該当ノートを見る
- 外部変更が出る作業は、実行前にTERUさん確認を取る
