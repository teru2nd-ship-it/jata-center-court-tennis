# 国旗神経衰弱

## 現状メモ

- ほぼ良い
- 公開済み
- 以前、イラスト採用版へ更新済み
- カード裏面にTERUさんのイラストを使う版へ寄せた

## 主ファイル

- `FlagMemoryGame.jsx`
- 比較候補として `FlagMemoryGame_fixed.jsx` があった時期あり

確認済みローカル候補:

```text
/Users/teru44/Library/Mobile Documents/com~apple~CloudDocs/TERU_WORK/jata/FlagMemoryGame.jsx
/Users/teru44/Library/Mobile Documents/com~apple~CloudDocs/TERU_WORK/jata/FlagMemoryGame_fixed.jsx
```

## MacBook Pro側の本命候補

```text
/Users/hayashidaakiraki/Desktop/flag-memory-game
```

- Gitブランチ: `main`
- 最新コミット: `d254767 fix(mobile): prevent horizontal overflow on small screens`
- remote: `https://github.com/teru2nd-ship-it/flag-memory-game.git`
- Vercelリンク名: `flag-memory-game`
- カード裏面にTERUさん画像の埋め込みあり
- 公開実体候補として強い

## 改善要望

- BGM追加
- BGM ON/OFF
- 効果音 ON/OFF
- シェアボタン
- 縦横固定設定
- 他ゲームと設定UIを揃える

## 音まわり

2026-05-08 iCloud側単体JSXに追加済み:

```text
/Users/teru44/Library/Mobile Documents/com~apple~CloudDocs/TERU_WORK/jata/FlagMemoryGame.jsx
```

- 自己完結型のWeb Audio実装
- BGM ON/OFF
- SFX ON/OFF
- `localStorage` 保存
- スタート音
- カードめくり音
- マッチ音
- ミス音
- 勝利音
- メニュー/ゲーム/勝利画面の `BGM` / `SFX` トグル

確認:

- esbuildでJSXバンドルチェック成功

注意:

- 公開実体候補はMacBook Pro側 `/Users/hayashidaakiraki/Desktop/flag-memory-game`
- 公開版へ反映する場合は、この変更をMacBook Pro側repoへ移植する

## 共通UIとの関係

- 設定UIは他ゲームと揃える
- BGM、効果音、シェア、縦横固定を共通導線に入れる
- すでに良い部分は大きく崩さず、共通機能追加を中心に進める

## 次に確認したいこと

- MacBook Pro側本命候補と公開版の対応
- デプロイ先と反映方法
- スマホでのタップ感
- クリア時のシェア文
