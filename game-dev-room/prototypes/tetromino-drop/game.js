const COLS = 10;
const ROWS = 20;
const BLOCK = 30;
const NEXT_BLOCK = 24;
const BEST_KEY = "tetromino-drop-best";
const AUDIO_KEY = "tetromino-drop-audio:v1";
const THEME_KEY = "tetromino-drop-theme:v1";
const LOCK_DELAY = 520;
const LOCK_RESET_LIMIT = 12;

const AUDIO_DEFAULTS = {
  bgm: true,
  sfx: true,
};

const COLORS = {
  I: "#64d8ff",
  J: "#6f8cff",
  L: "#ffb35c",
  O: "#ffe066",
  S: "#62e08f",
  T: "#c184ff",
  Z: "#ff6f91",
};

const JATA_ASSETS = {
  I: "./assets/jata-reptiles/snake.png",
  J: "./assets/jata-reptiles/cobra.png",
  L: "./assets/jata-reptiles/lizard.png",
  O: "./assets/jata-reptiles/monitor.png",
  S: "./assets/jata-reptiles/trex.png",
  T: "./assets/jata-reptiles/spino.png",
  Z: "./assets/jata-reptiles/dragon.png",
};

const POOP_FACE_ASSETS = {
  I: "./assets/poop-face/poop-rainbow-panda.png",
  J: "./assets/poop-face/poop-panda-rock.png",
  L: "./assets/poop-face/poop-tower.png",
  O: "./assets/poop-face/poop-tower.png",
  S: "./assets/poop-face/poop-panda-rock.png",
  T: "./assets/poop-face/poop-tower.png",
  Z: "./assets/poop-face/poop-panda-rock.png",
};

const POOP_LUCKY_TYPE = "I";

const BACKGROUND_ASSETS = [
  "./assets/backgrounds/176A9D6E-991C-41E1-B97B-8B2BD438CF0B.png",
  "./assets/backgrounds/29E325E7-F351-489C-AAE5-55DD29342D9B.png",
  "./assets/backgrounds/4A29E1AA-1B68-4A29-8A2B-FA93D6710C09.png",
  "./assets/backgrounds/99F40B8D-8B0D-4ED8-BE73-68C8AA42800F.png",
  "./assets/backgrounds/flush-01-orca-breach.jpg",
  "./assets/backgrounds/flush-02-deep-sea-panda.jpg",
  "./assets/backgrounds/flush-03-orca-sparkle.jpg",
  "./assets/backgrounds/flush-04-whale-aquarium.jpg",
  "./assets/backgrounds/flush-05-moon-forest.jpg",
  "./assets/backgrounds/flush-06-manatee-panda.jpg",
  "./assets/backgrounds/flush-07-sea-dragon.jpg",
  "./assets/backgrounds/flush-08-dolphins.jpg",
  "./assets/backgrounds/flush-09-orca-wave.jpg",
  "./assets/backgrounds/flush-10-warrior-panda.jpg",
  "./assets/backgrounds/flush-11-slide-panda.jpg",
];

const SHAPES = {
  I: [[1, 1, 1, 1]],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
};

const boardCanvas = document.querySelector("#board");
const nextCanvas = document.querySelector("#next");
const ctx = boardCanvas.getContext("2d");
const nextCtx = nextCanvas.getContext("2d");
const scoreEl = document.querySelector("#score");
const linesEl = document.querySelector("#lines");
const levelEl = document.querySelector("#level");
const bestEl = document.querySelector("#best");
const overlay = document.querySelector("#overlay");
const overlayTitle = document.querySelector("#overlayTitle");
const overlayText = document.querySelector("#overlayText");
const pauseBtn = document.querySelector("#pauseBtn");
const restartBtn = document.querySelector("#restartBtn");
const fullscreenBtn = document.querySelector("#fullscreenBtn");
const bgmToggle = document.querySelector("#bgmToggle");
const sfxToggle = document.querySelector("#sfxToggle");
const themeSelect = document.querySelector("#themeSelect");
const app = document.querySelector(".app");
const activeBackground = BACKGROUND_ASSETS[Math.floor(Math.random() * BACKGROUND_ASSETS.length)];
const boardBackdrop = new Image();
boardBackdrop.src = activeBackground;
document.body.style.setProperty("--page-wallpaper", `url("${activeBackground}")`);
boardBackdrop.addEventListener("load", () => {
  if (board && current && nextPiece) {
    draw();
  }
});
const poopFaceImages = Object.fromEntries(
  Object.entries(POOP_FACE_ASSETS).map(([type, src]) => {
    const image = new Image();
    image.src = src;
    image.addEventListener("load", () => {
      if (board && current && nextPiece && themeId === "poop") {
        draw();
      }
    });
    return [type, image];
  })
);
const jataImages = Object.fromEntries(
  Object.entries(JATA_ASSETS).map(([type, src]) => {
    const image = new Image();
    image.src = src;
    image.addEventListener("load", () => {
      if (board && current && nextPiece && themeId === "jata") {
        draw();
      }
    });
    return [type, image];
  })
);

function syncViewportHeight() {
  const height = window.visualViewport?.height ?? window.innerHeight;
  document.documentElement.style.setProperty("--app-height", `${height}px`);
}

syncViewportHeight();
window.addEventListener("resize", syncViewportHeight);
window.visualViewport?.addEventListener("resize", syncViewportHeight);

function readBestScore() {
  try {
    return Number(window.localStorage.getItem(BEST_KEY) || 0);
  } catch {
    return 0;
  }
}

function writeBestScore(value) {
  try {
    window.localStorage.setItem(BEST_KEY, String(value));
  } catch {
    // Some file:// browser contexts block localStorage. The game should still run.
  }
}

function readStoredValue(key, fallback) {
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Some file:// browser contexts block localStorage. The game should still run.
  }
}

function readAudioSettings() {
  try {
    const stored = JSON.parse(readStoredValue(AUDIO_KEY, "{}"));
    return {
      bgm: stored.bgm ?? AUDIO_DEFAULTS.bgm,
      sfx: stored.sfx ?? AUDIO_DEFAULTS.sfx,
    };
  } catch {
    return { ...AUDIO_DEFAULTS };
  }
}

let board;
let current;
let nextPiece;
let bag = [];
let score = 0;
let lines = 0;
let level = 1;
let best = readBestScore();
let audioSettings = readAudioSettings();
let themeId = readStoredValue(THEME_KEY, "poop");
let paused = false;
let gameOver = false;
let dropTimer = 0;
let lockTimer = 0;
let lockResetCount = 0;
let lastTime = 0;
let audioContext = null;
let bgmTimer = null;
let bgmStep = 0;

function ensureAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

function playTone({
  frequency,
  duration = 0.12,
  type = "sine",
  gain = 0.08,
  endFrequency = frequency,
  delay = 0,
}) {
  const context = ensureAudioContext();
  if (!context) return;

  const startAt = context.currentTime + delay;
  const oscillator = context.createOscillator();
  const volume = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(24, endFrequency), startAt + duration);
  volume.gain.setValueAtTime(0.0001, startAt);
  volume.gain.exponentialRampToValueAtTime(gain, startAt + 0.02);
  volume.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  oscillator.connect(volume);
  volume.connect(context.destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.03);
}

function playSfx(name) {
  if (!audioSettings.sfx) return;

  if (name === "move") {
    playTone({ frequency: 360, endFrequency: 430, duration: 0.07, gain: 0.035, type: "triangle" });
  }
  if (name === "rotate") {
    playTone({ frequency: 520, endFrequency: 760, duration: 0.08, gain: 0.045, type: "triangle" });
  }
  if (name === "soft-drop") {
    playTone({ frequency: 220, endFrequency: 180, duration: 0.06, gain: 0.03, type: "square" });
  }
  if (name === "hard-drop") {
    playTone({ frequency: 160, endFrequency: 70, duration: 0.16, gain: 0.08, type: "sawtooth" });
  }
  if (name === "lock") {
    playTone({ frequency: 120, endFrequency: 88, duration: 0.12, gain: 0.055, type: "triangle" });
  }
  if (name === "clear") {
    [0, 0.08, 0.16].forEach((delay, index) => {
      playTone({
        frequency: [420, 560, 760][index],
        endFrequency: [520, 690, 980][index],
        duration: 0.16,
        gain: 0.055,
        type: "triangle",
        delay,
      });
    });
  }
  if (name === "game-over") {
    [0, 0.12, 0.24].forEach((delay, index) => {
      playTone({
        frequency: [320, 240, 160][index],
        endFrequency: [250, 180, 90][index],
        duration: 0.22,
        gain: 0.07,
        type: "sawtooth",
        delay,
      });
    });
  }
}

function playBgmPulse() {
  if (!audioSettings.bgm || paused || gameOver) return;
  const melody = [196, 247, 294, 247, 220, 262, 330, 262];
  const bass = [98, 98, 110, 110];
  playTone({
    frequency: melody[bgmStep % melody.length],
    endFrequency: melody[bgmStep % melody.length] * 1.015,
    duration: 0.34,
    gain: 0.024,
    type: "triangle",
  });
  if (bgmStep % 2 === 0) {
    playTone({
      frequency: bass[Math.floor(bgmStep / 2) % bass.length],
      duration: 0.38,
      gain: 0.018,
      type: "sine",
    });
  }
  bgmStep += 1;
}

function syncBgm() {
  if (audioSettings.bgm && !bgmTimer) {
    playBgmPulse();
    bgmTimer = window.setInterval(playBgmPulse, 560);
  }
  if (!audioSettings.bgm && bgmTimer) {
    window.clearInterval(bgmTimer);
    bgmTimer = null;
  }
}

function refreshAudioButtons() {
  bgmToggle.textContent = audioSettings.bgm ? "BGM ON" : "BGM OFF";
  bgmToggle.setAttribute("aria-pressed", String(audioSettings.bgm));
  sfxToggle.textContent = audioSettings.sfx ? "SFX ON" : "SFX OFF";
  sfxToggle.setAttribute("aria-pressed", String(audioSettings.sfx));
}

function saveAudioSettings() {
  writeStoredValue(AUDIO_KEY, JSON.stringify(audioSettings));
}

function useTheme(nextThemeId) {
  themeId = ["classic", "meteor", "jata", "poop"].includes(nextThemeId) ? nextThemeId : "classic";
  themeSelect.value = themeId;
  document.body.dataset.theme = themeId;
  writeStoredValue(THEME_KEY, themeId);
  if (board && current && nextPiece) {
    draw();
  }
}

function wakeAudio() {
  ensureAudioContext();
  syncBgm();
}

function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function drawFromBag() {
  if (bag.length === 0) {
    bag = shuffle(Object.keys(SHAPES));
  }
  return createPiece(bag.pop());
}

function createPiece(type) {
  const shape = SHAPES[type].map((row) => [...row]);
  return {
    type,
    shape,
    x: Math.floor((COLS - shape[0].length) / 2),
    y: -1,
  };
}

function rotate(shape) {
  return shape[0].map((_, col) => shape.map((row) => row[col]).reverse());
}

function collides(piece, offsetX = 0, offsetY = 0, shape = piece.shape) {
  return shape.some((row, y) =>
    row.some((cell, x) => {
      if (!cell) return false;
      const nextX = piece.x + x + offsetX;
      const nextY = piece.y + y + offsetY;
      if (nextX < 0 || nextX >= COLS || nextY >= ROWS) return true;
      return nextY >= 0 && board[nextY][nextX];
    })
  );
}

function mergePiece() {
  current.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (!cell) return;
      const boardY = current.y + y;
      const boardX = current.x + x;
      if (boardY >= 0) {
        board[boardY][boardX] = current.type;
      }
    });
  });
}

function clearLines() {
  let cleared = 0;
  board = board.filter((row) => {
    if (row.every(Boolean)) {
      cleared += 1;
      return false;
    }
    return true;
  });

  while (board.length < ROWS) {
    board.unshift(Array(COLS).fill(null));
  }

  if (cleared > 0) {
    const points = [0, 100, 300, 500, 800][cleared] * level;
    score += points;
    lines += cleared;
    level = Math.floor(lines / 10) + 1;
  }

  return cleared;
}

function spawnPiece() {
  current = nextPiece || drawFromBag();
  nextPiece = drawFromBag();
  lockTimer = 0;
  lockResetCount = 0;
  if (collides(current)) {
    gameOver = true;
    paused = false;
    saveBest();
    playSfx("game-over");
    showOverlay("Game Over", "Press Restart to play again.");
  }
}

function grounded() {
  return collides(current, 0, 1);
}

function refreshLockDelayAfterAdjustment() {
  if (!grounded()) {
    lockTimer = 0;
    lockResetCount = 0;
    return;
  }

  if (lockResetCount < LOCK_RESET_LIMIT) {
    lockTimer = 0;
    lockResetCount += 1;
  }
}

function saveBest() {
  if (score > best) {
    best = score;
    writeBestScore(best);
  }
}

function move(dx) {
  if (paused || gameOver) return;
  if (!collides(current, dx, 0)) {
    current.x += dx;
    refreshLockDelayAfterAdjustment();
    playSfx("move");
    draw();
  }
}

function softDrop(manual = false) {
  if (paused || gameOver) return;
  if (!collides(current, 0, 1)) {
    current.y += 1;
    lockTimer = 0;
    score += 1;
    if (manual) {
      playSfx("soft-drop");
    }
  } else if (manual && lockResetCount < LOCK_RESET_LIMIT) {
    lockTimer = 0;
    lockResetCount += 1;
  }
  draw();
}

function hardDrop() {
  if (paused || gameOver) return;
  let distance = 0;
  while (!collides(current, 0, 1)) {
    current.y += 1;
    distance += 1;
  }
  score += distance * 2;
  playSfx("hard-drop");
  lockPiece();
  draw();
}

function rotateCurrent(direction = 1) {
  if (paused || gameOver) return;
  const rotated = direction === 1 ? rotate(current.shape) : rotate(rotate(rotate(current.shape)));
  const kicks = [0, -1, 1, -2, 2];
  const kick = kicks.find((x) => !collides(current, x, 0, rotated));
  if (kick !== undefined) {
    current.x += kick;
    current.shape = rotated;
    refreshLockDelayAfterAdjustment();
    playSfx("rotate");
    draw();
  }
}

function lockPiece() {
  mergePiece();
  const cleared = clearLines();
  if (cleared > 0) {
    playSfx("clear");
  } else {
    playSfx("lock");
  }
  spawnPiece();
}

function dropInterval() {
  return Math.max(110, 760 - (level - 1) * 62);
}

function update(time = 0) {
  const delta = time - lastTime;
  lastTime = time;

  if (!paused && !gameOver) {
    dropTimer += delta;
    if (dropTimer >= dropInterval()) {
      softDrop(false);
      dropTimer = 0;
    }

    if (grounded()) {
      lockTimer += delta;
      if (lockTimer >= LOCK_DELAY) {
        lockPiece();
        draw();
      }
    } else {
      lockTimer = 0;
      lockResetCount = 0;
    }
  }

  requestAnimationFrame(update);
}

function ghostPiece() {
  const ghost = {
    ...current,
    shape: current.shape.map((row) => [...row]),
  };
  while (!collides(ghost, 0, 1)) {
    ghost.y += 1;
  }
  return ghost;
}

function drawCell(context, x, y, size, color, alpha = 1, tileType = null) {
  context.globalAlpha = alpha;
  context.fillStyle =
    themeId === "meteor"
      ? "rgba(9, 18, 30, 0.92)"
      : themeId === "jata"
        ? "rgba(10, 30, 20, 0.95)"
        : color;
  context.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);

  if (themeId === "meteor") {
    const cellX = x * size;
    const cellY = y * size;
    const centerX = cellX + size * 0.5;
    const centerY = cellY + size * 0.5;
    const glow = context.createRadialGradient(
      centerX,
      centerY,
      2,
      centerX,
      centerY,
      size * 0.48
    );
    glow.addColorStop(0, color);
    glow.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = glow;
    context.fillRect(cellX + 3, cellY + 3, size - 6, size - 6);

    context.fillStyle = color;
    if ((x + y) % 2 === 0) {
      const outer = size * 0.25;
      const inner = size * 0.11;
      context.beginPath();
      for (let point = 0; point < 10; point += 1) {
        const angle = -Math.PI / 2 + point * (Math.PI / 5);
        const radius = point % 2 === 0 ? outer : inner;
        const pointX = centerX + Math.cos(angle) * radius;
        const pointY = centerY + Math.sin(angle) * radius;
        if (point === 0) {
          context.moveTo(pointX, pointY);
        } else {
          context.lineTo(pointX, pointY);
        }
      }
      context.closePath();
      context.fill();
    } else {
      context.lineWidth = Math.max(1.6, size * 0.07);
      context.lineCap = "round";
      context.strokeStyle = color;
      context.beginPath();
      context.moveTo(centerX, cellY + size * 0.22);
      context.lineTo(centerX, cellY + size * 0.78);
      context.moveTo(cellX + size * 0.22, centerY);
      context.lineTo(cellX + size * 0.78, centerY);
      context.moveTo(cellX + size * 0.3, cellY + size * 0.3);
      context.lineTo(cellX + size * 0.7, cellY + size * 0.7);
      context.moveTo(cellX + size * 0.7, cellY + size * 0.3);
      context.lineTo(cellX + size * 0.3, cellY + size * 0.7);
      context.stroke();
    }
  } else if (themeId === "poop") {
    const cellX = x * size;
    const cellY = y * size;
    const centerX = cellX + size * 0.5;
    const centerY = cellY + size * 0.5;
    const gradient = context.createRadialGradient(centerX, centerY, 1, centerX, centerY, size * 0.55);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.48)");
    gradient.addColorStop(0.62, color);
    gradient.addColorStop(1, color);
    context.fillStyle = gradient;
    context.fillRect(cellX + 3, cellY + 3, size - 6, size - 6);
    context.strokeStyle = "rgba(255, 255, 255, 0.48)";
    context.lineWidth = Math.max(1, size * 0.04);
    context.strokeRect(cellX + 3.5, cellY + 3.5, size - 7, size - 7);

    const image = poopFaceImages[tileType] ?? poopFaceImages.I;
    if (image?.complete && image.naturalWidth > 0) {
      const lucky = tileType === POOP_LUCKY_TYPE;
      const inset = lucky ? size * 0.11 : size * 0.14;
      const imageSize = size - inset * 2;
      context.save();
      context.beginPath();
      context.roundRect(cellX + inset, cellY + inset, imageSize, imageSize, size * 0.18);
      context.clip();
      context.globalAlpha = alpha * (lucky ? 0.9 : 0.82);
      if (lucky) {
        context.filter = "saturate(1.32) brightness(1.08) contrast(1.08)";
      }
      context.drawImage(image, cellX + inset, cellY + inset, imageSize, imageSize);
      context.filter = "none";
      context.restore();

      if (lucky) {
        context.strokeStyle = "rgba(255, 255, 255, 0.72)";
        context.lineWidth = Math.max(1, size * 0.05);
        context.beginPath();
        context.moveTo(cellX + size * 0.18, cellY + size * 0.22);
        context.lineTo(cellX + size * 0.26, cellY + size * 0.34);
        context.lineTo(cellX + size * 0.38, cellY + size * 0.18);
        context.moveTo(cellX + size * 0.68, cellY + size * 0.24);
        context.lineTo(cellX + size * 0.74, cellY + size * 0.34);
        context.lineTo(cellX + size * 0.84, cellY + size * 0.2);
        context.stroke();
      }
    } else {
      context.fillStyle = "#ffe0a0";
      context.beginPath();
      context.arc(centerX, centerY, size * 0.16, 0, Math.PI * 2);
      context.fill();
    }
  } else if (themeId === "jata") {
    const cellX = x * size;
    const cellY = y * size;
    const image = jataImages[tileType] ?? jataImages.T;
    context.strokeStyle = color;
    context.lineWidth = Math.max(1.2, size * 0.05);
    context.strokeRect(cellX + 2, cellY + 2, size - 4, size - 4);

    context.fillStyle = "rgba(154, 230, 110, 0.08)";
    context.fillRect(cellX + 5, cellY + 5, size - 10, size - 10);

    if (image?.complete && image.naturalWidth > 0) {
      const inset = size * 0.15;
      context.drawImage(image, cellX + inset, cellY + inset, size - inset * 2, size - inset * 2);
    } else {
      context.fillStyle = color;
      context.beginPath();
      context.arc(cellX + size * 0.5, cellY + size * 0.5, size * 0.18, 0, Math.PI * 2);
      context.fill();
    }
  } else {
    context.fillStyle = "rgba(255,255,255,.16)";
    context.fillRect(x * size + 3, y * size + 3, size - 6, 3);
  }

  context.globalAlpha = 1;
}

function drawGrid() {
  ctx.fillStyle = "#08111d";
  ctx.fillRect(0, 0, boardCanvas.width, boardCanvas.height);

  if (boardBackdrop.complete && boardBackdrop.naturalWidth > 0) {
    const scale = Math.max(
      boardCanvas.width / boardBackdrop.naturalWidth,
      boardCanvas.height / boardBackdrop.naturalHeight
    );
    const drawWidth = boardBackdrop.naturalWidth * scale;
    const drawHeight = boardBackdrop.naturalHeight * scale;
    const drawX = (boardCanvas.width - drawWidth) / 2;
    const drawY = (boardCanvas.height - drawHeight) / 2;
    ctx.save();
    ctx.globalAlpha = themeId === "meteor" ? 0.22 : themeId === "jata" ? 0.28 : 0.18;
    ctx.drawImage(boardBackdrop, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();
  }

  ctx.fillStyle =
    themeId === "meteor"
      ? "rgba(3, 11, 20, 0.68)"
      : themeId === "jata"
        ? "rgba(5, 19, 12, 0.64)"
        : themeId === "poop"
          ? "rgba(31, 17, 8, 0.62)"
        : "rgba(3, 11, 20, 0.74)";
  ctx.fillRect(0, 0, boardCanvas.width, boardCanvas.height);
  ctx.strokeStyle =
    themeId === "meteor"
      ? "rgba(157, 219, 255, 0.08)"
      : themeId === "jata"
        ? "rgba(154, 230, 110, 0.1)"
        : themeId === "poop"
          ? "rgba(255, 195, 100, 0.11)"
        : "rgba(255,255,255,.055)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= COLS; x += 1) {
    ctx.beginPath();
    ctx.moveTo(x * BLOCK, 0);
    ctx.lineTo(x * BLOCK, ROWS * BLOCK);
    ctx.stroke();
  }
  for (let y = 0; y <= ROWS; y += 1) {
    ctx.beginPath();
    ctx.moveTo(0, y * BLOCK);
    ctx.lineTo(COLS * BLOCK, y * BLOCK);
    ctx.stroke();
  }
}

function drawPiece(piece, alpha = 1) {
  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (!cell) return;
      const drawY = piece.y + y;
      if (drawY < 0) return;
      drawCell(ctx, piece.x + x, drawY, BLOCK, COLORS[piece.type], alpha, piece.type);
    });
  });
}

function drawNext() {
  nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
  nextCtx.fillStyle = themeId === "jata" ? "#0d2117" : themeId === "poop" ? "#25150b" : "#111722";
  nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
  const shape = nextPiece.shape;
  const offsetX = Math.floor((5 - shape[0].length) / 2);
  const offsetY = Math.floor((5 - shape.length) / 2);
  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        drawCell(nextCtx, offsetX + x, offsetY + y, NEXT_BLOCK, COLORS[nextPiece.type], 1, nextPiece.type);
      }
    });
  });
}

function draw() {
  drawGrid();
  board.forEach((row, y) => {
    row.forEach((type, x) => {
      if (type) drawCell(ctx, x, y, BLOCK, COLORS[type], 1, type);
    });
  });

  if (!gameOver) {
    drawPiece(ghostPiece(), 0.22);
    drawPiece(current);
  }

  drawNext();
  scoreEl.textContent = score;
  linesEl.textContent = lines;
  levelEl.textContent = level;
  bestEl.textContent = Math.max(best, score);
}

function showOverlay(title, text) {
  overlayTitle.textContent = title;
  overlayText.textContent = text;
  overlay.classList.remove("hidden");
}

function hideOverlay() {
  overlay.classList.add("hidden");
}

function togglePause() {
  if (gameOver) return;
  paused = !paused;
  pauseBtn.textContent = paused ? "Resume" : "Pause";
  if (paused) {
    showOverlay("Paused", "Press Resume to continue.");
  } else {
    hideOverlay();
    playBgmPulse();
  }
}

function restart() {
  board = createBoard();
  bag = [];
  current = null;
  nextPiece = drawFromBag();
  score = 0;
  lines = 0;
  level = 1;
  paused = false;
  gameOver = false;
  dropTimer = 0;
  lockTimer = 0;
  lockResetCount = 0;
  lastTime = 0;
  pauseBtn.textContent = "Pause";
  hideOverlay();
  spawnPiece();
  draw();
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (["ArrowLeft", "ArrowRight", "ArrowDown", " ", "z", "Z", "x", "X", "p", "P"].includes(key)) {
    event.preventDefault();
  }

  wakeAudio();
  if (key === "ArrowLeft") move(-1);
  if (key === "ArrowRight") move(1);
  if (key === "ArrowDown") softDrop(true);
  if (key === " ") hardDrop();
  if (key === "z" || key === "Z") rotateCurrent(-1);
  if (key === "x" || key === "X" || key === "ArrowUp") rotateCurrent(1);
  if (key === "p" || key === "P") togglePause();
});

function runTouchAction(action) {
  wakeAudio();
  if (action === "left") move(-1);
  if (action === "right") move(1);
  if (action === "rotate") rotateCurrent(1);
  if (action === "drop") softDrop(true);
  if (action === "hardDrop") hardDrop();
}

document.querySelectorAll("[data-action]").forEach((button) => {
  let handledByPointer = false;

  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    handledByPointer = true;
    runTouchAction(button.dataset.action);
  });

  button.addEventListener("click", (event) => {
    event.preventDefault();
    if (handledByPointer) {
      handledByPointer = false;
      return;
    }
    runTouchAction(button.dataset.action);
  });
});

app.addEventListener(
  "touchmove",
  (event) => {
    event.preventDefault();
  },
  { passive: false }
);

pauseBtn.addEventListener("click", () => {
  wakeAudio();
  togglePause();
});
restartBtn.addEventListener("click", () => {
  wakeAudio();
  restart();
});
fullscreenBtn.addEventListener("click", async () => {
  wakeAudio();
  const root = document.documentElement;
  let enteredFullscreen = false;
  try {
    if (!document.fullscreenElement && root.requestFullscreen) {
      await root.requestFullscreen();
      enteredFullscreen = true;
    }
  } catch {
    // iPhone Safari may ignore the Fullscreen API; the mobile layout still stays locked.
  }
  document.body.classList.toggle("focus-mode", !enteredFullscreen);
  fullscreenBtn.textContent = document.body.classList.contains("focus-mode") ? "UI" : "Full";
});
bgmToggle.addEventListener("click", () => {
  wakeAudio();
  audioSettings.bgm = !audioSettings.bgm;
  saveAudioSettings();
  refreshAudioButtons();
  syncBgm();
  if (audioSettings.bgm) {
    playBgmPulse();
  }
});
sfxToggle.addEventListener("click", () => {
  wakeAudio();
  audioSettings.sfx = !audioSettings.sfx;
  saveAudioSettings();
  refreshAudioButtons();
  if (audioSettings.sfx) {
    playSfx("rotate");
  }
});
themeSelect.addEventListener("change", (event) => {
  useTheme(event.target.value);
});

refreshAudioButtons();
useTheme(themeId);
restart();
requestAnimationFrame(update);
