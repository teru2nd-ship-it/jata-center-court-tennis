# 公開前チェックリスト

## 実行前確認

- GitHub pushはTERUさん確認後に実行する
- GitHub Issue作成はTERUさん確認後に実行する
- Vercel本番反映はTERUさん確認後に実行する
- 公開URLや共有設定の変更はTERUさん確認後に実行する

## ローカル確認

- `npm ci`
- `npm run build`
- メニュー表示
- ゲーム開始
- 基本操作
- リトライ
- 設定UI
- BGM ON/OFF
- 効果音 ON/OFF
- シェア導線
- コンソールエラーなし

## モバイル確認

- スマホ実機で起動
- タップ操作
- 画面サイズ
- 縦横固定設定
- 設定ボタンの押しやすさ
- シェア文の表示
- 音量

## Vercel確認

- Preview URLで表示
- Production反映前の最終確認
- 本番反映はTERUさん確認後

## セキュリティ・依存関係

- `npm audit --audit-level=high`
- 高危険度以上がないことを確認
- moderate advisoryは内容を確認して必要なら対応する
