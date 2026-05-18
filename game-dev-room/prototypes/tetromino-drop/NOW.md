# BOTTON NOW

Last updated: 2026-05-18

## Current Position

BOTTON is close to complete as a playable tetromino-style mobile game prototype.

The next workflow is:

1. Finish iPhone playtest checks.
2. Fix any mobile layout, weight, or control issues.
3. Review the Git diff for BOTTON only.
4. Push to Git after TERU approval.
5. Publish to Web after TERU approval.

## Test URL

Tailscale local playtest:

`http://100.82.86.8:8788/`

Use this while the local static server is running from:

`game-dev-room/prototypes/tetromino-drop/`

## Current State

- Core gameplay is playable.
- iPhone lightweight mode is implemented.
- Mobile background assets are available.
- Mobile game-over assets are available.
- Result videos are skipped in lightweight/reduced-motion environments.
- BGM/SFX toggles and theme selection are implemented.
- Handoff notes are in `BOTTON_HANDOFF.md`.

## What TERU Should Check On Phone

- Does the first load complete without Safari freezing?
- Does the board fit without important UI being cut off?
- Are left/right/rotate/down/drop buttons comfortable?
- Does pause/restart work?
- Does theme switching feel okay?
- Does game over display correctly?
- Does the page avoid unwanted zooming while playing?

## Permission Boundaries

No extra approval needed:

- Local file edits
- Local static server checks
- Tailscale playtest checks
- Documentation updates

Ask TERU before:

- Git commit
- Git push
- Vercel/Web deploy
- Production URL changes
- Removing original source assets

## Next Stop Point

Stop and ask TERU before Git push or Web publish.
