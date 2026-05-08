# スパイダーソリティア

## 状況

- すでに公開されている
- 公開URLの見た目で、トップ画面タイトル `SPIDER / SOLITAIRE` が少し上下見切れる問題があった

## 直近でやったこと

ローカルソースには見切れ対策を反映済み。

修正済みファイル:

```text
/Users/teru44/Library/Mobile Documents/com~apple~CloudDocs/TERU_WORK/jata/SpiderSolitaire_themed.jsx
/Users/teru44/Library/Mobile Documents/com~apple~CloudDocs/TERU_WORK/jata/SpiderSolitaire_fixed.jsx
```

修正内容:

- `SPIDER` の `<h1>` に `lineHeight: 1.14` を追加
- `SPIDER` の `<h1>` に `padding: "0.08em 0"` を追加

## まだ残っていること

- MacBook Pro側のVercelリンク済みrepoでタイトル見切れ修正が必要かローカル表示確認
- 実際に `spider-solitaire-sigma.vercel.app` に反映されている公開用プロジェクトとの対応確認
- 必要なら再デプロイ

## MacBook Pro側の本命候補

```text
/Users/hayashidaakiraki/Desktop/spider-solitaire
```

- Gitブランチ: `main`
- 最新コミット: `979ddd5 fix(mobile): prevent horizontal overflow on small screens`
- remote: `https://github.com/teru2nd-ship-it/spider-solitaire.git`
- Vercelリンク名: `spider-solitaire`
- iCloud側の `SpiderSolitaire_fixed.jsx` には見切れ修正あり
- DesktopのVercelリンク済みrepo側にはまだ見切れ修正が入っていない

## 関連ファイル

- `SpiderSolitaire_themed.jsx`
- `SpiderSolitaire_fixed.jsx`
- `spider-App.jsx`
- `spider-setup.sh`

メモ:

- `spider-setup.sh` 的には、Vite プロジェクトに `SpiderSolitaire_fixed.jsx` を流し込む構成なので、公開版は `fixed` ベースの可能性が高い

## 改善要望

- トランプをもっと見やすくする
- 効果音追加
- BGM追加
- BGM ON/OFF
- 効果音 ON/OFF
- 縦横固定設定
- シェアボタン

## 音まわり

2026-05-08 iCloud側Viteコピーに追加済み:

```text
/Users/teru44/Library/Mobile Documents/com~apple~CloudDocs/TERU_WORK/jata/spider-solitaire
```

- `src/audio.js`
- BGM ON/OFF
- SFX ON/OFF
- `localStorage` 保存
- ゲーム開始音
- カード移動音
- 山札配り音
- 完成セット音
- 勝利音
- メニュー/ゲーム/勝利画面の `BGM` / `SFX` トグル

確認:

- `npm run build` 成功

注意:

- 公開実体候補はMacBook Pro側 `/Users/hayashidaakiraki/Desktop/spider-solitaire`
- 公開版へ反映する場合は、この変更をMacBook Pro側repoへ移植する

## 共通UIとの関係

- 設定UIは他ゲームと揃える
- BGM、効果音、シェア、縦横固定を共通導線に入れる
- カードの視認性改善を優先候補にする

## 次に確認したいこと

- `/Users/hayashidaakiraki/Desktop/spider-solitaire` のローカル表示
- 見切れ修正の必要性
- デプロイ先と反映方法
- スマホでのカード操作感
- カードサイズと余白
