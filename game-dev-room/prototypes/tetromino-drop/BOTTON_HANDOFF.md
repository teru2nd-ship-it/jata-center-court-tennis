# BOTTON Handoff

Last checked: 2026-05-16

## Current Build

- Location: `game-dev-room/prototypes/tetromino-drop/`
- Entry point: `index.html`
- Main code: `game.js`
- Styles: `styles.css`
- Runs as a static browser game; no build step is required.
- Tailscale test URL while the local server is running: `http://100.82.86.8:8788/`

## Gameplay State

- 10 x 20 tetromino-style board.
- Keyboard and mobile touch controls are implemented.
- Score, lines, level, best score, next piece, ghost piece, pause, restart, and fullscreen/focus mode are implemented.
- Themes: `Poop Face`, `Classic`, `Shooting Star`, `JATA Reptile`.
- Audio is Web Audio API based, with saved BGM/SFX toggles.
- Result overlays exist for normal game over, good score, and new best.

## Mobile Weight Notes

- The original asset folder is about 26MB.
- The largest groups are backgrounds, result videos, and game-over art.
- Lightweight mobile copies now live under:
  - `assets/mobile/backgrounds/`
  - `assets/mobile/game-over/`
- `game.js` uses lightweight assets when the viewport is compact, the pointer is coarse, or Save-Data is enabled.
- Result videos are skipped in lightweight mode and when reduced motion is requested.

## Important Constants

- `GOOD_SCORE_THRESHOLD`: high-score celebration threshold.
- `BACKGROUND_ASSETS` / `MOBILE_BACKGROUND_ASSETS`: normal and mobile page/board backgrounds.
- `GAME_OVER_ASSETS` / `MOBILE_GAME_OVER_ASSETS`: normal and mobile game-over art.
- `RESULT_VIDEOS`: desktop result videos.
- `LOCK_DELAY` and `LOCK_RESET_LIMIT`: lock-delay feel.

## Next Useful Work

- Tune mobile board size on real iPhone Safari.
- Add a simple in-game start screen if autoplay/audio behavior needs clearer UX.
- Consider replacing result MP4s with smaller poster art or short compressed clips.
- Add a deploy copy that excludes original heavy assets if an iPhone-only preview is needed.
