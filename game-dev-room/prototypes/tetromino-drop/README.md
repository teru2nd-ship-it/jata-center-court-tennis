# Tetromino Drop Sample

テトリス風パズルのプレイ可能サンプル。

## 遊び方

- 左右: `ArrowLeft` / `ArrowRight`
- 下移動: `ArrowDown`
- 回転: `Z` / `X` / `ArrowUp`
- 一気に落とす: `Space`
- 一時停止: `P` または `Pause` ボタン
- スマホ: 画面下のボタン

## 実装済み

- 10 x 20 の落ち物パズル盤面
- 7種類のテトロミノ風ブロック
- 次ブロック表示
- ゴースト位置表示
- ライン消去、スコア、レベル
- ハイスコア保存
- リスタート、一時停止
- モバイル用タッチ操作
- 接地後も短時間だけ左右移動・回転できるロックディレイ
- JATA DROP流用壁紙を背景フォルダからランダム選択
- ページ外側と盤面内で同じ背景イラストを共有
- `Classic` / `🌠 Shooting Star` / `JATA Reptile` / `Poop Face` のデザイン切替
- `JATA Reptile` はJATA DROPの爬虫類系素材をブロック内に反映
- `Poop Face` はユーザー指定イラストから切り出した顔をブロック内に反映
- ヘッダーとテーマ色をTERU GAMES系の共通見た目へ寄せる土台を追加
- Web Audio APIのBGM、効果音
- BGM / SFX のON/OFF保存

## 確認方法

`index.html` をブラウザで開く。

音はブラウザの自動再生制限に合わせて、最初のキー操作またはボタン操作後に鳴り始める。
