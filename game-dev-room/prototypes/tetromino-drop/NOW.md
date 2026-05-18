# BOTTON NOW

Last updated: 2026-05-18

## Current Position

BOTTON is published as a playable tetromino-style mobile game prototype.

The next workflow is:

1. Finish any remaining iPhone playtest notes.
2. Fix any mobile layout, weight, or control issues found after publish.
3. Add a Git remote before Git push, because this local repository currently has no remote.

## Test URL

Tailscale local playtest:

`http://100.82.86.8:8788/`

Use this while the local static server is running from:

`game-dev-room/prototypes/tetromino-drop/`

Production URL:

`https://botton.vercel.app`

Latest deployment URL:

`https://botton-bim1lkq7z-teru2nd-ship-its-projects.vercel.app`

## Current State

- Core gameplay is playable.
- iPhone lightweight mode is implemented.
- Mobile background assets are available.
- Mobile game-over assets are available.
- Result videos are skipped in lightweight/reduced-motion environments.
- BGM/SFX toggles and theme selection are implemented.
- Handoff notes are in `BOTTON_HANDOFF.md`.
- Vercel project `botton` is linked locally.
- Production deploy completed on 2026-05-18 and returned `200 OK`.

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

Stop before changing production URL settings, adding a custom domain, or removing original source assets.
