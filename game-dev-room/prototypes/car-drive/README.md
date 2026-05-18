# Car Drive Sample

息子さん向けの車ゲーム試作。

## 遊び方

- PC: 左右キーで車線移動、上キーまたはスペースで加速
- スマホ: 画面下の左右ボタン、GOボタン
- コインを取るとスコア加算
- コーンや水たまりに当たるとゲームオーバー

## 実装済み

- 3車線のドライブゲーム
- コイン、コーン、水たまり
- スコア、ベスト、レベル
- localStorageによるベスト保存
- 効果音ON/OFF
- スマホ向けタッチ操作
- 車種選択
  - Arcade Red
  - Toyota Hilux
  - Porsche 959
- 依存なしの静的HTML/CSS/JS

## 車素材メモ

- `Toyota Hilux`: Wikimedia Commons / Openclipart由来 / CC0
- `Porsche 959`: Wikimedia Commons / Openclipart由来 / CC0
- 公開版ではメーカー名・車名・ロゴの扱いに注意。まずはCC0のSVGを使い、ロゴやエンブレムをゲーム内で強調しない運用にする。

## 次に足す候補

- 背景ステージ選択
- はたらく車モード
- ごほうび演出
- BGM
