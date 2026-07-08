# JATA OPEN - Center Court Tennis

Kuro-chan generated pseudo-3D tennis prototype, saved locally on 2026-06-28.

This is separate from `../tennis/`, which is currently Space Hockey.

## Files

- `index.html` - single-file HTML/CSS/JavaScript canvas game
- `assets/center-court-visual-direction-v1.png` - GPT Image visual direction board for the stadium, surfaces, racket, and ball
- `assets/jata-open-emblem.png` - JATA OPEN emblem used on the title and result overlays

## Controls

- Move: drag / mouse / arrow keys / WASD
- Rally: automatic return when the ball reaches the body
- Shot buttons: VOLLEY for a drive/volley, LOB for a high deep ball, DROP for a short ball
- Keyboard shots: V for drive, B/L for lob, N/X for drop
- Serve: drag to adjust position, press VOLLEY to toss, press VOLLEY again to hit

## Features

- Pseudo-3D hard court
- Surface selector: Hard / Grass / Clay
- Surface-specific color, texture, ball pace, and bounce feel
- Upgraded stadium backdrop, spectator stands, floodlights, court texture, racket strings, and ball rendering
- Spectator stands are pushed farther back/up to leave more air behind the court
- Back-court floor space with simple animated ball crew, line judge, and a chair umpire beside the net
- Grass court texture avoids vertical mowing bands near the side/out lines
- Clay texture scratches stay parallel to the court lines near the far baseline
- Portrait layout gently stretches the game scene vertically without changing the play logic
- Serves start behind the baseline instead of from inside the court
- Shared JATA ARCADE menu: `GAMES` plus fullscreen on supported devices / new window on iPhone
- Portrait HUD moves into the upper empty space and is larger on phones
- Separate two-row on-screen controls for tennis menu, pause/resume, VOLLEY, LOB, and DROP
- Drag-only movement on canvas so simple taps do not pull the player across the court
- Easy / Normal / Hard difficulty
- Games, sets, tiebreak, match point labels
- Player serve timing and CPU serve
- Volley, lob, drop, and power-shot timing
- Procedural BGM, crowd reactions, and shot/serve/point SFX
- English-first UI text for the title, menu, HUD, result, shared menu, and point calls
- Service ace detection with stronger `ACE!` callout, crowd reaction, and scoring message
- Out balls continue drifting naturally after the point instead of snapping away
- JATA OPEN emblem appears on the title and match-finished screens without entering the court view

## Local Preview

Open `index.html` directly in a browser, or serve this folder as static HTML.

```bash
python3 -m http.server 8000 --directory game-dev-room/prototypes/center-court-tennis
```

## Production

- Production URL: https://jata-center-court-tennis.vercel.app/
- Vercel project: `jata-center-court-tennis`
- Latest production deployment: `https://jata-center-court-tennis-5csg6hed9-teru2nd-ship-its-projects.vercel.app`
- Deployment id: `dpl_GHT2nvkmCX3sJvTwGTkK8Np4HjNy`
- Deployed from this folder with Vercel CLI on 2026-06-29.

## Next Candidates

- Test play on iPhone and desktop
- Tune CPU difficulty and rally tempo
- Consider a full Three.js version as a separate upgrade once the 2D/pseudo-3D game feel is settled
- Add the production URL to JATA ARCADE / `teru44.net/games` when ready

## Fix Log

- 2026-06-28: Reworked outside-court apron stripes into projected perspective panels.
- 2026-06-28: Added HOME / PAUSE / VOLLEY buttons outside the canvas.
- 2026-06-28: Added shared JATA ARCADE `GAMES` menu with fullscreen/new-window behavior.
- 2026-06-28: Changed touch movement so taps no longer move the player; drag is required for movement.
- 2026-06-28: VOLLEY now also handles serve toss/hit on mobile.
- 2026-06-28: Reverted the broken back-wall/apron redesign and switched portrait tuning to a safer vertical stretch.
- 2026-06-28: Moved player and CPU serve positions behind the baselines.
- 2026-06-28: Moved spectator stands farther back/up and made clay scratches parallel to the far baseline.
- 2026-06-29: Fixed the root apron/stands overlap by clipping projected apron drawing to the court horizon and removing `y > 1` apron projection into the spectator area.
- 2026-06-29: Removed the grass-court sign and changed grass texture from vertical bands to horizontal court-parallel bands so the right out area stays clean.
- 2026-06-29: Moved the portrait scoreboard into the upper empty space, rebuilt the controls as a two-row panel, and added LOB/DROP shot buttons.
- 2026-06-29: Added B/N keyboard shortcuts and upgraded the court crew with back-court ball kids, line judge, and a larger chair umpire beside the net.
- 2026-06-29: Added procedural BGM, crowd reactions, SFX, natural out-ball drift, and the JATA OPEN emblem on title/result overlays.
- 2026-06-29: Switched visible UI language to mostly English and added service ace detection with `ACE!` / `CPU ACE!` callouts.
- 2026-06-29: Published production deployment to Vercel at `https://jata-center-court-tennis.vercel.app/`.
- 2026-06-29: Reworked the JATA OPEN emblem into an original `CENTER COURT / JATA OPEN` badge and removed the risky `THE CHAMPIONSHIPS` wording.
- 2026-06-29: Redeployed the safer emblem to Vercel production.
- 2026-06-29: Replaced the emblem with TERU's preferred `CENTER COURT / JATA OPEN` custom artwork.
- 2026-06-29: Redeployed TERU's preferred emblem to Vercel production.
- 2026-07-08: Switched the visible main title and ongoing operation name to `JATA OPEN`; `Center Court Tennis` remains a subtitle/context label.
