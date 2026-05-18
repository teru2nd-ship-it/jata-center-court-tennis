# BOTTON Playtest

## iPhone Checklist

- [ ] Page opens from `http://100.82.86.8:8788/`
- [ ] First load feels acceptable
- [ ] Board is visible without scrolling
- [ ] Score/Lines/Level/Best are readable
- [ ] Next piece is visible
- [ ] Left button works
- [ ] Right button works
- [ ] Rotate button works
- [ ] Down button works
- [ ] DROP button works
- [ ] Pause works
- [ ] Restart works
- [ ] Theme select works
- [ ] BGM toggle works after first interaction
- [ ] SFX toggle works after first interaction
- [ ] Game over overlay appears
- [ ] No accidental zoom during normal play
- [ ] Safari does not freeze or blank the page

## Notes From TERU

- 2026-05-18: TERU approved moving ahead with publish from this chat.

## Local Check Log

- 2026-05-18: Started local static server from this folder on port `8788`.
- 2026-05-18: Confirmed `http://127.0.0.1:8788/` and `http://100.82.86.8:8788/` return `200 OK`.
- 2026-05-18: Confirmed `game.js?v=mobile-lite-1`, `styles.css?v=mobile-lite-1`, and a sample mobile background return `200 OK`.
- 2026-05-18: Desktop browser smoke check loaded the board, score panel, next piece, theme selector, and audio toggles.
- 2026-05-18: `node --check game.js` passed.
- 2026-05-18: Verified all `./assets/...` references in `game.js` exist.
- 2026-05-18: Mobile asset folder is about `2.8M`; original backgrounds/results/game-over groups are about `23.8M` total.

## Bugs To Fix

- 

## Release Readiness

- [ ] iPhone playtest accepted
- [ ] BOTTON-only Git diff reviewed
- [x] TERU approved Git push
- [x] TERU approved Web publish
