# SPORTS QUIZ RUSH / 4ブランドクイズ基盤

## 情報の扱い

このメモは別チャット/別PC由来の引き継ぎを含む。
最新情報が前後する可能性があるため、作業前に必ずローカル実態を確認する。

## 現在確認済み

作業場所:

```text
/Users/teru44/Documents/Codex/2026-04-30/macbook-pro-sports-quiz-rush-nba
```

確認日: 2026-05-08

- 上記フォルダはこのMacに存在する
- `index.html` と `src/` がある
- このフォルダ自体はGit repoではない
- ローカル確認URLの引き継ぎ: `http://localhost:4173/`

確認済みファイル:

```text
index.html
src/main.js
src/styles.css
src/quiz-engine.js
src/storage.js
src/data/champions.js
src/data/cowboys.js
src/data/entertain.js
src/data/kids.js
src/data/nba-favorites.js
src/data/packs.js
src/data/players.js
src/data/study.js
src/data/teams.js
```

注意:

- 引き継ぎ記載の主要ファイルに加えて、ローカルには `src/data/champions.js` と `src/data/players.js` も存在する
- 作業開始時はファイル内容を読んで、引き継ぎ情報との差分を確認する

## MacBook Pro側の確認結果

作業場所:

```text
/Users/hayashidaakiraki/Documents/Codex/2026-04-30/macbook-pro-sports-quiz-rush-nba
```

- Git repoではない
- `package.json`, `index.html`, `src/` あり
- MacBook Pro側の `src/data` は `teams.js`, `cowboys.js`, `champions.js`, `players.js`, `packs.js` まで
- iMac側引き継ぎにある `study.js`, `entertain.js`, `kids.js`, `nba-favorites.js`, `storage.js` は見つからなかった
- MacBook Pro側の実体は、iMac側引き継ぎより古い/狭い可能性がある

## 現在の状態

もともとは `SPORTS QUIZ RUSH` のNBAクイズプロトタイプだったが、現在は4ブランド体制のクイズ基盤に拡張済み。

最初の画面:

```text
QUIZ PLAYGROUND
```

ブランド選択:

1. `SPORTS QUIZ RUSH`
2. `STUDY QUIZ DOJO`
3. `ENTERTAIN QUIZ ARENA`
4. `KIDS QUIZ PARK`

## 実装済みの共通機能

- パック選択画面
- モード選択画面
- 10問 / 20問ラウンド選択
- スコア表示
- 正解 / 不正解フィードバック
- 結果画面
- 称号表示
- `localStorage` によるハイスコア保存
- モード別ハイスコア
- ハイスコアリセット機能
- 回答後の正解/不正解ハイライト
- 学習系向けの解説カード表示
- ラウンド内重複なし出題

称号:

- PERFECT RUSH
- ALL-STAR
- STARTER
- BENCH SPARK

ラウンド内重複なし出題:

- ラウンド開始時に問題リストをシャッフルして山札化
- 問題数が足りる間は同じ問題を出さない
- 問題数よりラウンド数が多い場合のみ再シャッフルして再利用

## SPORTS QUIZ RUSH

実装済み/準備中パック:

- NBA Pack
- Cowboys Pack
- NFL Pack 準備中
- College Hoops Pack 準備中
- ATP / WTA Pack 準備中
- WWE Pack 準備中

NBA Pack:

- ロゴ風カードクイズ
- 推しモード実装済み

NBA推しモード:

- GSW
- DAL
- CHI
- LAL

各チーム8問程度のサンプルあり。

Cowboys Pack:

- 背番号クイズ
- 歴代QBクイズ
- スーパーボウル年クイズ

## STUDY QUIZ DOJO

実装済み:

- 第二種電気工事士 Pack

モード:

- 基礎サンプル プレイ可能
- 配線図記号 準備中
- 法令 準備中

特徴:

- 回答後に解説カードを表示
- 今後、過去問ベースで20から50問へ拡張予定

## ENTERTAIN QUIZ ARENA

実装済み:

- 江戸川乱歩 Pack
- Harry Potter Pack

江戸川乱歩 Pack:

- 乱歩入門 プレイ可能

Harry Potter Pack:

- ホグワーツ入門 プレイ可能

注意:

- 現役IPや現役作家系は長文引用NG
- トリビア形式で短い問題文にする
- 乱歩は著作権切れで比較的攻めやすい

## KIDS QUIZ PARK

実装済み:

- 動物 Pack
- 計算 Pack

動物 Pack:

- どうぶつクイズ プレイ可能

計算 Pack:

- 計算ミックス プレイ可能

方向性:

- 小2・小3の兄妹で遊べるやさしい難易度
- 今後は漢字、都道府県、国旗、理科へ拡張

## 現在の設計

`src/data/packs.js` に4ブランドと各パックを集約。

エクスポート:

- `sportsPacks`
- `studyPacks`
- `entertainPacks`
- `kidsPacks`
- `brands`
- `packs`

`packs` は旧互換用で `sportsPacks` を指す。

出題エンジン:

```text
src/quiz-engine.js
```

主な関数:

- `shuffle`
- `createQuestionDeck`
- `createLogoQuestion`
- `createTriviaQuestion`
- `isCorrect`

保存:

```text
src/storage.js
```

主な関数:

- `highScoreKey`
- `getHighScore`
- `saveHighScore`
- `resetHighScore`

## 重要な実装方針

1. 新しい問題追加前に、ラウンド内重複なし出題を前提にする
2. 問題数は最低10問、できれば20問以上あると遊び心地が良い
3. 公式ロゴ画像は使わず、チームカラーと略称のロゴ風カードを使う
4. 公開版と個人プレイ用の権利グレー素材は分ける
5. 学習系は `explanation` を必ず入れる
6. 子ども向けは短文、ひらがな多め、難易度低め
7. エンタメ系は引用を避け、トリビア形式にする

## 次にやると良いこと

優先度高:

- 各パックの問題数を20問以上に増やす
- 第二種電気工事士 Pack をカテゴリ別に拡張
- KIDSの漢字/都道府県/国旗パック追加
- ENTERTAINの伊坂幸太郎/森博嗣パック追加
- SPORTSのCowboys Packをさらに増強

UI改善:

- ブランドごとに背景色や空気感を少し変える
- STUDYは落ち着いた道場感
- ENTERTAINは映画館/アリーナ感
- KIDSは明るく安全な公園感
- SPORTSは今の暗めアーケード感を維持

将来:

- 4ブランドを別Vercelプロジェクトに分ける
- 共通エンジンを `core/` 化
- `pack.json` スキーマに移行
- `quiz.teru44.net` 的な統合ハブを作る

## 作業開始チェック

```bash
pwd
ls -la
find src -maxdepth 3 -type f | sort
```

Git repoではない可能性があるため、`git status --short` が失敗しても慌てない。
公開・共有・Vercel反映など外部変更が出る作業はTERUさん確認後に実行する。
