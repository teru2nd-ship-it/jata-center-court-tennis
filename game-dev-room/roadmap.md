# ゲーム開発ロードマップ

## 現在の優先順位

1. Spider Solitaire の公開実体プロジェクトを見つけてタイトル見切れ修正を反映する
2. JATA DROP の家族テスト後フィードバックを反映する
3. `teru44.net/games` の導線や見せ方を統一する
4. SPORTS QUIZ RUSH / 4ブランドクイズ基盤のローカル実態を確認する
5. 既存ゲームの共通UI、音、シェア導線を整える
6. Obsidian にゲーム開発ログを整理する

## 優先度高

- Spider Solitaire のMacBook Pro側Vercelリンク済みrepoで、タイトル見切れ修正が必要かローカル表示確認する
- JATA DROP は公開済み前提で、家族テスト後の音量、難易度、操作感を調整する
- 国旗神経衰弱は現在の良さを崩さず、共通UIとシェア導線を足す
- SPORTS QUIZ RUSH はiMac側とMacBook Pro側の実体差分を確認する
- 外部変更が出るデプロイや本番反映はTERUさん確認後に実行する

## 次の開発ブランチ候補

JATA DROPをブランチ分けして進める場合の候補。

- `audio-settings`
- `difficulty-tuning`
- `share-settings-ui`

## 共通化候補

既存3ゲームで共通設定UIを作る。

- BGM ON/OFF
- 効果音 ON/OFF
- シェア
- 縦横固定
- モバイル向け設定ボタン

## 保留・後で見る

- 長時間のゲームオーバー強制テスト
- 各ゲームのスマホ実機での操作感
- 子ども向けゲーム案の優先順位づけ

## クイズ基盤

- [SPORTS QUIZ RUSH / 4ブランドクイズ基盤](projects/sports-quiz-rush.md) を追加済み
- 別チャット/別PC由来の情報が混ざるため、作業前にローカル実態確認を優先する
- 問題追加はラウンド内重複なし出題と20問以上の遊び心地を前提に進める
