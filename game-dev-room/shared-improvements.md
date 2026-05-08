# 共通改善メモ

## 全ゲーム共通で揃えたいこと

- 公開先ベース導線: `https://www.teru44.net/games`
- BGM ON/OFF
- 効果音 ON/OFF
- 音量調整
- 縦横固定設定
- シェアボタン
- スコアやクリア結果の共有文
- モバイルで押しやすい設定ボタン
- ゲーム中に邪魔にならないUI配置

## 共通設定UIの方向性

- 設定ボタンはモバイルでも押しやすくする
- ゲーム中の邪魔にならない位置に置く
- BGM、効果音、音量、シェアを同じ導線にまとめる
- ゲームごとに見た目は合わせつつ、必要な項目だけ表示する

## シェア導線

共有文に含めたいもの:

- ゲーム名
- スコアまたはクリア結果
- ひとことコメント
- 公開URL

## 音まわり

- BGM ON/OFF
- 効果音 ON/OFF
- 音量調整
- 初回操作後に音が出るようにする
- スマホでも不自然に大きくならない音量にする

## 音まわり実装状況

確認日: 2026-05-08

- JATA DROP: SFX/BGMの独立トグル実装済み
- SPORTS QUIZ RUSH: iMac側ローカル実体に `src/audio.js`、BGM/SFXトグル、正解/不正解/開始/結果音を追加。Neo側情報では既存Web Audio API仮音源は実装済みで、新しい効果音データは別作業で作成中
- Spider Solitaire: iCloud側Viteコピーに `src/audio.js`、BGM/SFXトグル、開始/移動/山札/完成/勝利音を追加
- 国旗神経衰弱: iCloud側 `FlagMemoryGame.jsx` に自己完結型BGM/SFXトグルとカード/マッチ/ミス/勝利音を追加

注意:

- Spider Solitaireと国旗神経衰弱の公開実体はMacBook Pro側repoが本命候補
- SPORTS QUIZ RUSHはiMac側実体、MacBook Pro側実体、Neo側情報で差分があるため、効果音素材を受け取る前に `src/audio.js` と保存キーを再確認する
- 公開反映する場合は、MacBook Pro側repoへ移植してローカル確認後、TERUさん確認を挟む

## モバイル対応

- 指で押しやすいボタンサイズ
- 誤タップしにくい余白
- 縦横固定設定
- ゲーム画面を隠さない設定パネル
- 片手操作でも主要操作が届く配置

## 作業場所メモ

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
- 実装や画像処理、バッチ修正はCodex向き
