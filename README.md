# Shared Daily Report Workspace

このリポジトリは、複数PC間で以下の作業データを共有するための共通ワークスペースです。

- Obsidianメモ
- 日報
- 日報インフォグラフィック用の原稿・素材・出力
- 作業ルールやテンプレート

## フォルダ構成

```text
obsidian/                  Obsidian vault
daily-reports/             日報Markdown
infographics/              インフォグラフィック関連
  source/                  原稿・構成メモ
  assets/                  画像・アイコン・素材
  output/                  書き出し成果物
templates/                 共通テンプレート
```

## PC間での作業手順

1. 作業前に最新化します。

```bash
git pull
```

2. Obsidianで `obsidian/` フォルダをVaultとして開きます。

3. 日報は `daily-reports/YYYY-MM-DD.md` に作成します。

4. インフォグラフィック関連ファイルは `infographics/` 配下に保存します。

5. 作業後に変更を共有します。

```bash
git status
git add .
git commit -m "Update daily report workspace"
git push
```

## 運用メモ

- PCごとの一時ファイル、キャッシュ、Obsidianのローカル状態はGit管理から外します。
- 大きな画像や動画が増える場合は、Git LFSやクラウドストレージ併用を検討してください。
- 同じファイルを複数PCで同時編集すると競合が起きることがあります。作業前の `git pull` を習慣にしてください。
