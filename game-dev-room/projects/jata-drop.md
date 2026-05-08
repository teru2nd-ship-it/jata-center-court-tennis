# JATA DROP

## 情報の扱い

このメモは別チャット/別PC由来の引き継ぎを含む。
最新情報が前後する可能性があるため、作業前に必ずローカル実態を確認する。

## 現在確認済み

確認日: 2026-05-08

このMacで見つかった本命clone:

```text
/Users/teru44/Library/Mobile Documents/com~apple~CloudDocs/Documents/jata-drop
```

- GitHub remote: `https://github.com/teru2nd-ship-it/jata-drop.git`
- ブランチ: `codex-test`
- 最新コミット: `6fb1c5c Finalize Dragon celebration sound`
- 未コミット差分: `.gitignore`
- `.gitignore` 差分: `.vercel` と `.env*.local` を追加

MacBook Pro側でも同じ本命状態を確認済み:

```text
/Users/hayashidaakiraki/Documents/jata-drop
```

- Gitブランチ: `codex-test`
- 最新コミット: `6fb1c5c Finalize Dragon celebration sound`
- remote: `https://github.com/teru2nd-ship-it/jata-drop.git`
- 未コミット差分: `.gitignore` のみ
- Vercelリンク名: `jata-drop`

## 公開状況

引き継ぎ情報:

- JATA DROP は公開済み
- 本番URL: `https://jata-drop.vercel.app`
- 最終デプロイ実体URL: `https://jata-drop-dl2dgtx7r-teru2nd-ship-its-projects.vercel.app`

注意:

- 公開URL、本番状態、Vercel状態は外部情報なので、必要な作業前に確認する
- 本番反映、公開URL変更、Vercel設定変更はTERUさん確認後に実行する

## GitHub

- リポジトリ: `teru2nd-ship-it/jata-drop`
- 作業ブランチ: `codex-test`
- 共有時点の最新コミット: `6fb1c5c`
- コミット内容メモ: `Finalize Dragon celebration sound`

## 直近で入った内容

### シェア周り

- シェア画像の縦横比修正
- スマホ向けの縦長ポスター寄りデザインへ調整
- シェア後に `もう一度` を押すと上に留まるバグを修正

### 進化ルート再編

- 12段階から11段階へ変更
- `Small Snake` を `Snake` に変更
- `Medium Snake` 削除
- `Large Snake` を `King Cobra` に変更
- `Dragon` は11段階目へ
- `NEXT` 表示も修正済み

現在の進化ルートは作業前に `src/JataDrop.jsx` で再確認する。

### 難易度とUI

- Easy の危険ラインを上げて緩和
- BGM ON/OFF トグル追加
- 右上のトップ復帰ボタンを大きめに調整
- スマホ縦向き優先のガード追加

### 効果音

- Web Audio API ベース
- `src/sounds.js` 新規
- `src/sounds.test.html` 新規
- SFX ON/OFF 追加
- BGM と独立して `localStorage` 保存

ゲーム本体への音配線:

- 落下開始: `シュッ`
- 合体: `ぽん`
- ゲームオーバー: `チーン`
- Dragon 到達後ゲームオーバーのみ特別演出音あり

## 主要ファイル

- `src/JataDrop.jsx`
- `src/sounds.js`
- `src/sounds.test.html`
- `vite.config.js`

## 補足

- `npm run build` は成功確認済み
- 本番公開済み
- 家族テスト後の微調整フェーズへ進める状態

## 次回候補

- 効果音の音量バランス調整
- Stage別の音色差の調整
- 家族プレイ後の難易度再調整
- 操作感の微調整

## 古い可能性がある過去情報

以下は別PC/過去チャット由来の情報で、現在の `codex-test` / `6fb1c5c` より古い可能性が高い。
必要なら履歴確認用として扱う。

- 旧ローカル作業場所: `/Users/hayashidaakiraki/Documents/Codex/jata-drop`
- 旧作業ブランチ: `final-release-prep`
- 旧コミット: `8701e2a Prepare JATA DROP release docs`
- 旧未完了メモ: `final-release-prep` のpush、`RELEASE_ISSUE.md` のIssue化、Vercel Preview確認、本番反映

## 注意

- push、Issue作成、本番反映、公開済みゲームの挙動変更は外部変更なのでTERUさん確認後に実行する
- iCloud直編集は競合しやすいため、加工中はローカルコピーで作業し、完成版のみ戻す運用が安全
- 長時間のゲームオーバー強制テストは、実機または手動で再確認する
