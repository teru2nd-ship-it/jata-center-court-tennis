# JATA DROP

## リポジトリ

- GitHub: `github.com/teru2nd-ship-it/jata-drop`
- 状態: Private repo
- ローカル作業場所:

```text
/Users/hayashidaakiraki/Documents/Codex/jata-drop
```

## Git状態

- `main` と `origin/main` は同一の初期コミット
- `main` 直接コミットはしていない
- 作業ブランチ `final-release-prep` を作成済み
- ローカルコミット作成済み

ローカルコミット:

```text
8701e2a Prepare JATA DROP release docs
```

## 実施済み

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

## 確認済み進化段階

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

## 未完了

- `final-release-prep` のGitHub push
- `RELEASE_ISSUE.md` 内容でGitHub Issue作成
- Vercel Preview確認
- Vercel本番反映
- モバイル実機確認

## 改善要望

- BGM変更
- 難易度調整をもう少し詰める
- 効果音追加
- BGM ON/OFF
- 効果音 ON/OFF
- シェア導線整理
- 縦横固定設定

## 注意

- push、Issue作成、本番反映は外部変更なのでTERUさん確認後に実行する
- 長時間のゲームオーバー強制テストはブラウザ自動操作が途中でタイムアウトしたため、実機または手動で再確認する
- `npm audit --audit-level=high` は高危険度以上なし
- Vite/esbuildの開発サーバー系moderate advisoryは残る
