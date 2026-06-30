---
created: 2026-06-30
type: work_report
project: JATA ARCADE / JATA BOX SHIFT
scope:
  - jata-arcade-control-tower
  - jata-box-shift
  - wix
  - thumbnail
  - vercel-production
status: production_updated
audience:
  - TERU
  - Codex
---

# 2026-06-30 報告書 JATA ARCADE Box Shift Thumbnail / Wix

## 今日の結論

JATA ARCADE側の `JATA BOX SHIFT` サムネを、表紙で使ったジャングル背景画像へ更新した。

Wix貼り付け用HTMLも、`JATA BOX SHIFT` の新サムネと `CENTER COURT` 追加済みの状態で出力した。

## Git / Vercel

```text
arcade repo: https://github.com/teru2nd-ship-it/jata-arcade-control-tower.git
branch: main
arcade commit: 4eadac5 Update arcade Box Shift thumbnail
production URL: https://jata-arcade-control-tower.vercel.app/
box thumbnail: https://jata-arcade-control-tower.vercel.app/assets/thumbs/box-shift.jpg
```

## 反映内容

- `data/games.json` と `app.js` のJATA BOX SHIFTに `./assets/thumbs/box-shift.jpg` を追加。
- JATA BOX SHIFTの説明を30面、表紙、クリア演出、DIYステージ公開済みへ更新。
- `index.html` の公開カードを新サムネ表示へ更新。
- `wix-games-frame.html` のJATA BOX SHIFTカードに本番サムネURLを追加。
- `CENTER COURT` はWixフレーム内に追加済みで、テニスURLとエンブレム画像を確認済み。

## Wix用HTML出力

```text
/Users/teru44/Downloads/10_PROJECTS/_GAME_DEV/JATA_ARCADE/wix-games-frame.html
/Users/teru44/Documents/New project/JATA_ARCADE_WIX_COPY_PASTE_2026-06-30.html
```

## 公開後確認

- `https://jata-arcade-control-tower.vercel.app/` は `HTTP/2 200`。
- `https://jata-arcade-control-tower.vercel.app/assets/thumbs/box-shift.jpg` は `HTTP/2 200`。
- 通常トップでJATA BOX SHIFTの背景画像が `assets/thumbs/box-shift.jpg` になっていることをブラウザ確認。
- 通常トップでCENTER COURTカードが表示されることをブラウザ確認。
- 本番WixフレームでJATA BOX SHIFTの `img` が `https://jata-arcade-control-tower.vercel.app/assets/thumbs/box-shift.jpg` になることを確認。
- 本番WixフレームでCENTER COURTカードと `jata-center-court-tennis.vercel.app` のエンブレム画像を確認。
- 通常トップ / Wixフレームともコンソールエラーなし、横はみ出しなし。

## 次回見る場所

- アーケード本体: `/Users/teru44/Downloads/10_PROJECTS/_GAME_DEV/JATA_ARCADE/jata-arcade-control-tower/`
- Wix貼り付けHTML: `/Users/teru44/Documents/New project/JATA_ARCADE_WIX_COPY_PASTE_2026-06-30.html`
- Box Shift元画像: `/Users/teru44/Documents/New project/game-dev-room/prototypes/sokoban/assets/clear/jungle-sumomo-bg-3.jpg`
