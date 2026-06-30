const boardEl = document.querySelector("#board");
const appEl = document.querySelector(".app");
const stageText = document.querySelector("#stageText");
const movesText = document.querySelector("#movesText");
const boxesText = document.querySelector("#boxesText");
const worldIcon = document.querySelector("#worldIcon");
const worldText = document.querySelector("#worldText");
const worldSub = document.querySelector("#worldSub");
const overlay = document.querySelector("#clearOverlay");
const clearText = document.querySelector("#clearText");
const coverScreen = document.querySelector("#coverScreen");
const startBtn = document.querySelector("#startBtn");
const homeBtn = document.querySelector("#homeBtn");
const bgmBtn = document.querySelector("#bgmBtn");
const sfxBtn = document.querySelector("#sfxBtn");
const editBtn = document.querySelector("#editBtn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const overlayNextBtn = document.querySelector("#overlayNextBtn");
const editorPanel = document.querySelector("#editorPanel");
const levelEditor = document.querySelector("#levelEditor");
const editorStatus = document.querySelector("#editorStatus");
const clearTitle = overlay.querySelector("strong");

const CUSTOM_LEVEL_KEY = "jata-box-shift-custom:v1";
const PROGRESS_KEY = "jata-box-shift-progress:v1";
const BACKDROP_IMAGES = [
  "./assets/clear/sparkle-sumomo-bg-1.jpg",
  "./assets/clear/nest-sumomo-bg-2.jpg",
  "./assets/clear/jungle-sumomo-bg-3.jpg",
];
const BACKDROP_SEED = Math.floor(Math.random() * BACKDROP_IMAGES.length);

const BASE_LEVELS = [
  ["######", "#@ $.#", "######"],
  ["######", "# @  #", "# $ .#", "######"],
  ["######", "#    #", "# .$@#", "######"],
  ["#######", "#@    #", "# $$  #", "# ..  #", "#######"],
  ["#######", "#  .  #", "#  $  #", "#  @  #", "#######"],
  ["########", "#@     #", "# $$   #", "#  ..  #", "########"],
  ["########", "#  .   #", "#  $   #", "# .$ @ #", "########"],
  ["########", "#@     #", "# $$   #", "# #..  #", "########"],
  ["########", "#  ..  #", "#  $$  #", "#   @  #", "########"],
  ["########", "#@     #", "# $$#  #", "#  ..  #", "########"],
  ["#########", "# @     #", "# $$$   #", "# ...   #", "#########"],
  ["#########", "#   .   #", "# #$#   #", "#  $ @  #", "#  .    #", "#########"],
  ["#########", "#@      #", "# $$ #  #", "#  . #  #", "#  .    #", "#########"],
  ["#########", "#   ..  #", "#  $$   #", "#   # @ #", "#########"],
  ["#########", "# @     #", "# $$$#  #", "#  ...  #", "#########"],
  ["##########", "#@       #", "# $$  #  #", "#  .  #  #", "#  .     #", "##########"],
  ["##########", "#   .    #", "#   $    #", "# # $ #  #", "#  @ .   #", "##########"],
  ["##########", "#@       #", "# $$$    #", "# #..#   #", "#   .    #", "##########"],
  ["##########", "#   ..   #", "#  $$$   #", "#   . @  #", "##########"],
  ["###########", "#@        #", "# $$$$    #", "#  ....   #", "###########"],
  [
    "############",
    "#          #",
    "#  ##      #",
    "# @    ## .#",
    "# $ #    $ #",
    "#      #   #",
    "#  ##      #",
    "#   .      #",
    "############",
  ],
  [
    "############",
    "#          #",
    "#  ##  ##  #",
    "#          #",
    "#   .##    #",
    "#  #  $.#$ #",
    "#        @ #",
    "############",
  ],
  [
    "###########",
    "#     .   #",
    "#  ## # $@#",
    "#.        #",
    "#   # ##$ #",
    "#         #",
    "###########",
  ],
  [
    "############",
    "#       .  #",
    "#  # $$#   #",
    "#      .   #",
    "#   ###    #",
    "#         .#",
    "#   # $ #  #",
    "#     @    #",
    "############",
  ],
  ["#########", "#     . #", "#  ##$  #", "#   $@$ #", "# . ##  #", "#   .   #", "#########"],
  [
    "##########",
    "# .      #",
    "#  ##  $ #",
    "# $   #  #",
    "# @#   . #",
    "#    ##$ #",
    "#  .     #",
    "##########",
  ],
  [
    "###########",
    "#      .  #",
    "#  ###    #",
    "#    .$#$ #",
    "# #   .   #",
    "#   # ### #",
    "# @$      #",
    "#    #    #",
    "###########",
  ],
  [
    "#############",
    "#      .    #",
    "#  ###      #",
    "#      #    #",
    "#.  #   $   #",
    "#       #   #",
    "# @$  ###   #",
    "#           #",
    "#############",
  ],
  [
    "#############",
    "#    .    . #",
    "# ###   ### #",
    "#   #  $#   #",
    "#     $@$.  #",
    "#  ### ###  #",
    "#           #",
    "#############",
  ],
  [
    "###########",
    "#      .  #",
    "# $# ###  #",
    "#  #      #",
    "# $+$ #   #",
    "# ### #   #",
    "#  .      #",
    "###########",
  ],
];

function makeShiftLevel(width, height, boxCount, variant) {
  const grid = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, () => "#"),
  );
  const middle = Math.floor(height / 2);
  const rowStart = Math.max(1, middle - Math.floor((boxCount - 1) / 2));
  const rows = Array.from({ length: boxCount }, (_, i) => Math.min(height - 2, rowStart + i));
  const columns = Array.from({ length: boxCount }, (_, i) => Math.min(width - 2, 2 + i));

  if (variant % 3 === 0) {
    for (let y = 1; y < height - 1; y += 1) grid[y][1] = " ";
    rows.forEach((row) => {
      for (let x = 1; x < width - 1; x += 1) grid[row][x] = " ";
    });
    grid[middle][1] = "@";
    rows.forEach((row) => {
      grid[row][3] = "$";
      grid[row][width - 3] = ".";
    });
  } else if (variant % 3 === 1) {
    for (let y = 1; y < height - 1; y += 1) grid[y][width - 2] = " ";
    rows.forEach((row) => {
      for (let x = 1; x < width - 1; x += 1) grid[row][x] = " ";
    });
    grid[middle][width - 2] = "@";
    rows.forEach((row) => {
      grid[row][width - 4] = "$";
      grid[row][2] = ".";
    });
  } else {
    for (let x = 1; x < width - 1; x += 1) grid[1][x] = " ";
    columns.forEach((column) => {
      for (let y = 1; y < height - 1; y += 1) grid[y][column] = " ";
    });
    grid[1][1] = "@";
    columns.forEach((column) => {
      grid[2][column] = "$";
      grid[height - 3][column] = ".";
    });
  }

  return grid.map((row) => row.join(""));
}

const GENERATED_LEVELS = [
  makeShiftLevel(9, 6, 2, 2),
  makeShiftLevel(10, 6, 2, 2),
  makeShiftLevel(9, 5, 2, 0),
  makeShiftLevel(9, 5, 2, 1),
  makeShiftLevel(9, 7, 2, 2),
  makeShiftLevel(10, 7, 2, 2),
  makeShiftLevel(10, 5, 2, 0),
  makeShiftLevel(10, 5, 2, 1),
  makeShiftLevel(11, 5, 2, 0),
  makeShiftLevel(11, 5, 2, 1),
  makeShiftLevel(9, 6, 3, 2),
  makeShiftLevel(10, 6, 3, 2),
  makeShiftLevel(9, 7, 3, 2),
  makeShiftLevel(10, 7, 3, 2),
  makeShiftLevel(9, 8, 3, 2),
  makeShiftLevel(10, 8, 3, 2),
  makeShiftLevel(9, 5, 3, 0),
  makeShiftLevel(9, 5, 3, 1),
  makeShiftLevel(10, 5, 3, 0),
  makeShiftLevel(10, 5, 3, 1),
  makeShiftLevel(9, 7, 4, 2),
  makeShiftLevel(10, 7, 4, 2),
  makeShiftLevel(11, 7, 4, 2),
  makeShiftLevel(12, 7, 4, 2),
  makeShiftLevel(11, 5, 3, 0),
  makeShiftLevel(11, 5, 3, 1),
  makeShiftLevel(12, 5, 3, 0),
  makeShiftLevel(12, 5, 3, 1),
  makeShiftLevel(13, 5, 3, 0),
  makeShiftLevel(13, 5, 3, 1),
];

// GENERATED_LEVELS は同系統の構造が続くため本番採用しない。
// 21〜30面は、壁形状の重複を避けて手調整した面を BASE_LEVELS に直接追加している。
const LEVELS = [...BASE_LEVELS];

const WORLDS = [
  {
    theme: "grass",
    icon: "🌱",
    name: "草原",
    sub: "すもものはじめての巣作り。白い卵をやさしく運ぼう",
    clear: "卵が草原の巣に収まりました",
  },
  {
    theme: "beach",
    icon: "🌊",
    name: "海辺",
    sub: "岩と流木のすき間を抜けて巣へ",
    clear: "潮風の巣が少し大きくなりました",
  },
  {
    theme: "cave",
    icon: "🪨",
    name: "洞窟",
    sub: "狭い通路で卵をぶつけないように",
    clear: "洞窟の奥に静かな巣ができました",
  },
  {
    theme: "ruins",
    icon: "🏯",
    name: "遺跡",
    sub: "古い柱の間を抜ける巣作り",
    clear: "遺跡の巣に卵が並びました",
  },
  {
    theme: "dragon",
    icon: "🐉",
    name: "龍神の聖域",
    sub: "金色の卵を神秘の巣へ",
    clear: "龍神の巣が光りはじめました",
  },
];

const DIRS = {
  up: { dx: 0, dy: -1 },
  down: { dx: 0, dy: 1 },
  left: { dx: -1, dy: 0 },
  right: { dx: 1, dy: 0 },
};

const SAMPLE_LEVEL = ["########", "#@     #", "# $$   #", "#  ..  #", "########"].join("\n");

let levelIndex = 0;
let state = null;
let history = [];
let customLevel = null;
let customMode = false;
let audioContext = null;
let masterGain = null;
let bgmTimer = null;
let bgmOn = localStorage.getItem("jata-box-shift-bgm:v1") !== "off";
let sfxOn = localStorage.getItem("jata-box-shift-sfx:v1") !== "off";
let playerFacing = "right";
let playerFrame = 0;
let highestUnlocked = readHighestUnlocked();
let gameStarted = false;

function readHighestUnlocked() {
  const saved = Number(localStorage.getItem(PROGRESS_KEY));
  if (!Number.isInteger(saved)) return 0;
  return Math.max(0, Math.min(saved, LEVELS.length - 1));
}

function unlockNextLevel() {
  if (customMode) return;
  const nextLevel = Math.min(LEVELS.length - 1, levelIndex + 1);
  if (nextLevel > highestUnlocked) {
    highestUnlocked = nextLevel;
    localStorage.setItem(PROGRESS_KEY, String(highestUnlocked));
    updateStartButtonText();
  }
}

function updateProgressControls() {
  prevBtn.disabled = customMode || levelIndex <= 0;
  nextBtn.disabled = customMode || levelIndex >= highestUnlocked || levelIndex >= LEVELS.length - 1;
  overlayNextBtn.textContent = !customMode && levelIndex === LEVELS.length - 1 && isCleared() ? "HOME" : "次へ";
}

function updateStartButtonText() {
  startBtn.textContent = highestUnlocked > 0 ? "CONTINUE" : "START";
}

function startGame() {
  gameStarted = true;
  document.body.classList.add("game-started");
  coverScreen.classList.add("hidden");
  loadLevel(Math.min(highestUnlocked, LEVELS.length - 1));
}

function returnToTitle() {
  gameStarted = false;
  closeEditor();
  overlay.classList.add("hidden");
  overlay.classList.remove("is-final-clear");
  document.body.classList.remove("game-started");
  updateStartButtonText();
  coverScreen.classList.remove("hidden");
}

function initAudio() {
  if (audioContext) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  audioContext = new AudioContextClass();
  masterGain = audioContext.createGain();
  masterGain.gain.value = 0.16;
  masterGain.connect(audioContext.destination);
}

function resumeAudio() {
  initAudio();
  audioContext?.resume?.();
}

function tone(freq, duration = 0.08, type = "sine", volume = 0.22, delay = 0) {
  if (!audioContext || !masterGain || !sfxOn) return;
  const start = audioContext.currentTime + delay;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(start);
  osc.stop(start + duration + 0.04);
}

function playMoveSound(push = false) {
  resumeAudio();
  tone(push ? 260 : 180, 0.05, "triangle", push ? 0.18 : 0.1);
  if (push) tone(340, 0.07, "triangle", 0.12, 0.04);
}

function playClearSound(final = false) {
  resumeAudio();
  const notes = final ? [392, 523, 659, 784, 1046, 1318] : [440, 554, 659, 880];
  notes.forEach((note, index) => tone(note, 0.12, "square", 0.18, index * 0.08));
}

function playErrorSound() {
  resumeAudio();
  tone(120, 0.12, "sawtooth", 0.15);
}

function scheduleBgm() {
  if (!audioContext || !masterGain || !bgmOn) return;
  const notes = [196, 0, 247, 0, 294, 330, 294, 247, 220, 0, 262, 330, 392, 0, 330, 262];
  notes.forEach((note, index) => {
    if (!note) return;
    const wasSfxOn = sfxOn;
    sfxOn = true;
    tone(note, 0.18, "triangle", 0.055, index * 0.18);
    sfxOn = wasSfxOn;
  });
  bgmTimer = window.setTimeout(scheduleBgm, notes.length * 180);
}

function startBgm() {
  resumeAudio();
  window.clearTimeout(bgmTimer);
  if (bgmOn) scheduleBgm();
}

function stopBgm() {
  window.clearTimeout(bgmTimer);
  bgmTimer = null;
}

function updateSoundButtons() {
  bgmBtn.setAttribute("aria-pressed", String(bgmOn));
  sfxBtn.setAttribute("aria-pressed", String(sfxOn));
}

function normalizeLevel(rows) {
  const width = Math.max(...rows.map((row) => row.length));
  return rows.map((row) => row.padEnd(width, " "));
}

function loadLevel(index) {
  customMode = false;
  levelIndex = Math.max(0, Math.min(index, highestUnlocked, LEVELS.length - 1));
  updateBackdrop(levelIndex);
  const rows = normalizeLevel(LEVELS[levelIndex]);
  loadRows(rows);
}

function loadCustomLevel(rows) {
  customMode = true;
  updateBackdrop(Math.floor(Math.random() * Math.max(1, BACKDROP_IMAGES.length)));
  loadRows(normalizeLevel(rows));
}

function updateBackdrop(index) {
  if (!BACKDROP_IMAGES.length) return;
  const image = BACKDROP_IMAGES[(index + BACKDROP_SEED) % BACKDROP_IMAGES.length];
  document.body.style.setProperty("--stage-backdrop-image", `url("${image}")`);
}

function loadRows(rows) {
  const walls = new Set();
  const targets = new Set();
  const boxes = new Set();
  let player = { x: 0, y: 0 };

  rows.forEach((row, y) => {
    [...row].forEach((char, x) => {
      const key = cellKey(x, y);
      if (char === "#") walls.add(key);
      if (char === "." || char === "+" || char === "*") targets.add(key);
      if (char === "$" || char === "*") boxes.add(key);
      if (char === "@" || char === "+") player = { x, y };
    });
  });

  state = {
    width: rows[0].length,
    height: rows.length,
    walls,
    targets,
    boxes,
    player,
    playerFacing,
    playerFrame,
    moves: 0,
  };
  history = [];
  playerFacing = "right";
  playerFrame = 0;
  state.playerFacing = playerFacing;
  state.playerFrame = playerFrame;
  overlay.classList.add("hidden");
  overlay.classList.remove("is-final-clear");
  updateWorld();
  render();
}

function currentWorld() {
  if (customMode) {
    return {
      theme: "dragon",
      icon: "🛠",
      name: "DIY",
      sub: "自作ステージを試し中",
      clear: "自作ステージをクリアしました",
    };
  }
  return WORLDS[Math.min(WORLDS.length - 1, Math.floor(levelIndex / 10))];
}

function updateWorld() {
  const world = currentWorld();
  appEl.dataset.theme = world.theme;
  worldIcon.textContent = world.icon;
  worldText.textContent = `${world.name} ${levelIndex + 1}`;
  worldSub.textContent = world.sub;
}

function cellKey(x, y) {
  return `${x},${y}`;
}

function cloneState() {
  return {
    width: state.width,
    height: state.height,
    walls: new Set(state.walls),
    targets: new Set(state.targets),
    boxes: new Set(state.boxes),
    player: { ...state.player },
    playerFacing: state.playerFacing,
    playerFrame: state.playerFrame,
    moves: state.moves,
  };
}

function restoreState(snapshot) {
  state = snapshot;
  playerFacing = state.playerFacing || "right";
  playerFrame = state.playerFrame || 0;
  overlay.classList.add("hidden");
  overlay.classList.remove("is-final-clear");
  render();
}

function move(dirName) {
  if (!state || !DIRS[dirName] || isCleared()) return;
  resumeAudio();
  const { dx, dy } = DIRS[dirName];
  const next = { x: state.player.x + dx, y: state.player.y + dy };
  const nextKey = cellKey(next.x, next.y);

  if (state.walls.has(nextKey)) {
    playErrorSound();
    return;
  }

  const pushingBox = state.boxes.has(nextKey);
  if (pushingBox) {
    const afterBox = { x: next.x + dx, y: next.y + dy };
    const afterKey = cellKey(afterBox.x, afterBox.y);
    if (state.walls.has(afterKey) || state.boxes.has(afterKey)) {
      playErrorSound();
      return;
    }

    history.push(cloneState());
    state.boxes.delete(nextKey);
    state.boxes.add(afterKey);
  } else {
    history.push(cloneState());
  }

  state.player = next;
  if (dx < 0) playerFacing = "left";
  if (dx > 0) playerFacing = "right";
  playerFrame = (playerFrame + 1) % 4;
  state.playerFacing = playerFacing;
  state.playerFrame = playerFrame;
  state.moves += 1;
  playMoveSound(pushingBox);
  render();

  if (isCleared()) {
    const world = currentWorld();
    const finalClear = !customMode && levelIndex === LEVELS.length - 1;
    unlockNextLevel();
    clearTitle.textContent = finalClear ? "HAPPY HATCH!" : "NEST CLEAR!";
    clearText.textContent =
      finalClear ? "巨大な巣が完成。ちびコーンスネーク誕生!" : world.clear;
    overlay.classList.toggle("is-final-clear", finalClear);
    updateProgressControls();
    playClearSound(finalClear);
    overlay.classList.remove("hidden");
  }
}

function isCleared() {
  return [...state.boxes].every((box) => state.targets.has(box));
}

function undo() {
  const snapshot = history.pop();
  if (snapshot) restoreState(snapshot);
}

function render() {
  const wrap = boardEl.parentElement;
  const wrapRect = wrap.getBoundingClientRect();
  const gap = 3;
  const padding = 16;
  const maxCellByWidth = (wrapRect.width - padding - gap * (state.width - 1)) / state.width;
  const maxCellByHeight = (wrapRect.height - padding - gap * (state.height - 1)) / state.height;
  const cellSize = Math.max(18, Math.floor(Math.min(maxCellByWidth, maxCellByHeight)));
  const boardWidth = cellSize * state.width + gap * (state.width - 1) + padding;
  const boardHeight = cellSize * state.height + gap * (state.height - 1) + padding;

  boardEl.style.setProperty("--board-width", `${boardWidth}px`);
  boardEl.style.setProperty("--board-height", `${boardHeight}px`);
  boardEl.style.gridTemplateColumns = `repeat(${state.width}, 1fr)`;
  boardEl.style.gridTemplateRows = `repeat(${state.height}, 1fr)`;
  boardEl.innerHTML = "";

  for (let y = 0; y < state.height; y += 1) {
    for (let x = 0; x < state.width; x += 1) {
      const key = cellKey(x, y);
      const cell = document.createElement("div");
      cell.className = "cell";
      if (state.walls.has(key)) cell.classList.add("wall");
      if (state.targets.has(key)) cell.classList.add("target");
      if (state.boxes.has(key)) cell.classList.add("box");
      if (state.player.x === x && state.player.y === y) {
        cell.classList.add("player", `face-${state.playerFacing || "right"}`, `step-${state.playerFrame || 0}`);
      }
      boardEl.append(cell);
    }
  }

  const onTarget = [...state.boxes].filter((box) => state.targets.has(box)).length;
  stageText.textContent = customMode ? "DIY" : `${levelIndex + 1}/${LEVELS.length}`;
  movesText.textContent = String(state.moves);
  boxesText.textContent = `${onTarget}/${state.boxes.size}`;
  updateProgressControls();
}

function changeLevel(delta) {
  const target = levelIndex + delta;
  if (target < 0 || target > highestUnlocked || target >= LEVELS.length) return;
  loadLevel(target);
}

function editorRows() {
  return levelEditor.value
    .replace(/\r/g, "")
    .split("\n")
    .filter((row) => row.length > 0);
}

function parseRows(rows) {
  const normalized = normalizeLevel(rows);
  const walls = new Set();
  const targets = new Set();
  const boxes = [];
  let player = null;
  let playerCount = 0;
  let badChars = [];

  normalized.forEach((row, y) => {
    [...row].forEach((char, x) => {
      const key = cellKey(x, y);
      if (!"# .$@+*".includes(char)) badChars.push(char);
      if (char === "#") walls.add(key);
      if (char === "." || char === "+" || char === "*") targets.add(key);
      if (char === "$" || char === "*") boxes.push(key);
      if (char === "@" || char === "+") {
        player = key;
        playerCount += 1;
      }
    });
  });

  return {
    rows: normalized,
    width: normalized[0]?.length || 0,
    height: normalized.length,
    walls,
    targets,
    boxes: boxes.sort(),
    player,
    playerCount,
    badChars,
  };
}

function hasClosedOuterWall(parsed) {
  if (parsed.width < 3 || parsed.height < 3) return false;
  for (let x = 0; x < parsed.width; x += 1) {
    if (parsed.rows[0][x] !== "#" || parsed.rows[parsed.height - 1][x] !== "#") return false;
  }
  for (let y = 0; y < parsed.height; y += 1) {
    if (parsed.rows[y][0] !== "#" || parsed.rows[y][parsed.width - 1] !== "#") return false;
  }
  return true;
}

function solveRows(rows, maxSteps = 160000) {
  const parsed = parseRows(rows);
  if (!parsed.player || parsed.boxes.length === 0) return { solved: false, reason: "player-or-box" };
  if (parsed.boxes.length !== parsed.targets.size) return { solved: false, reason: "box-target-count" };

  const queue = [{ player: parsed.player, boxes: parsed.boxes, depth: 0 }];
  const seen = new Set([`${parsed.player}|${parsed.boxes.join(";")}`]);
  let steps = 0;

  while (queue.length) {
    const current = queue.shift();
    steps += 1;
    if (steps > maxSteps) return { solved: false, reason: "too-hard", steps };
    if (current.boxes.every((box) => parsed.targets.has(box))) {
      return { solved: true, moves: current.depth, steps };
    }

    const boxSet = new Set(current.boxes);
    const [px, py] = current.player.split(",").map(Number);

    for (const { dx, dy } of Object.values(DIRS)) {
      const nx = px + dx;
      const ny = py + dy;
      const nextKey = cellKey(nx, ny);
      if (parsed.walls.has(nextKey)) continue;

      let nextBoxes = current.boxes;
      if (boxSet.has(nextKey)) {
        const bx = nx + dx;
        const by = ny + dy;
        const pushedKey = cellKey(bx, by);
        if (parsed.walls.has(pushedKey) || boxSet.has(pushedKey)) continue;
        nextBoxes = current.boxes.map((box) => (box === nextKey ? pushedKey : box)).sort();
      }

      const signature = `${nextKey}|${nextBoxes.join(";")}`;
      if (!seen.has(signature)) {
        seen.add(signature);
        queue.push({ player: nextKey, boxes: nextBoxes, depth: current.depth + 1 });
      }
    }
  }

  return { solved: false, reason: "dead-end", steps };
}

function validateEditorRows(rows) {
  if (!rows.length) return { ok: false, message: "ステージが空です" };
  const parsed = parseRows(rows);
  if (parsed.badChars.length) return { ok: false, message: "使える記号は # @ $ . + * と半角スペースだけです" };
  if (!hasClosedOuterWall(parsed)) return { ok: false, message: "外周は # で囲ってください" };
  if (parsed.playerCount !== 1) return { ok: false, message: "@ すももを1匹だけ置いてください" };
  if (parsed.boxes.length === 0) return { ok: false, message: "$ 卵を1個以上置いてください" };
  if (parsed.boxes.length !== parsed.targets.size) return { ok: false, message: "$ 卵と . 巣の数を同じにしてください" };

  const result = solveRows(rows);
  if (!result.solved) {
    const message = result.reason === "too-hard" ? "重すぎるか詰みの可能性あり。少し小さくしてね" : "詰み判定。TEST PLAYは止めました";
    return { ok: false, message };
  }

  return { ok: true, message: `OK: ${result.moves}手で解けます` };
}

function setEditorStatus(message, good = false) {
  editorStatus.textContent = message;
  editorStatus.style.color = good ? "var(--good)" : "var(--muted)";
}

function openEditor() {
  levelEditor.value = localStorage.getItem(CUSTOM_LEVEL_KEY) || SAMPLE_LEVEL;
  editorPanel.classList.remove("hidden");
  setEditorStatus("# 壁 / @ すもも / $ 卵 / . 巣");
}

function closeEditor() {
  editorPanel.classList.add("hidden");
}

bgmBtn.addEventListener("click", () => {
  bgmOn = !bgmOn;
  localStorage.setItem("jata-box-shift-bgm:v1", bgmOn ? "on" : "off");
  updateSoundButtons();
  if (bgmOn) startBgm();
  else stopBgm();
});

sfxBtn.addEventListener("click", () => {
  sfxOn = !sfxOn;
  localStorage.setItem("jata-box-shift-sfx:v1", sfxOn ? "on" : "off");
  updateSoundButtons();
  if (sfxOn) playClearSound(false);
});

editBtn.addEventListener("click", () => {
  resumeAudio();
  if (editorPanel.classList.contains("hidden")) openEditor();
  else closeEditor();
});

startBtn.addEventListener("click", () => {
  resumeAudio();
  startGame();
});

homeBtn.addEventListener("click", () => {
  resumeAudio();
  returnToTitle();
});

document.querySelector("#sampleBtn").addEventListener("click", () => {
  levelEditor.value = SAMPLE_LEVEL;
  setEditorStatus("サンプルを入れました");
});

document.querySelector("#checkBtn").addEventListener("click", () => {
  const rows = editorRows();
  const result = validateEditorRows(rows);
  setEditorStatus(result.message, result.ok);
  if (result.ok) playClearSound(false);
  else playErrorSound();
});

document.querySelector("#testBtn").addEventListener("click", () => {
  const rows = editorRows();
  const result = validateEditorRows(rows);
  setEditorStatus(result.message, result.ok);
  if (!result.ok) {
    playErrorSound();
    return;
  }
  customLevel = rows;
  localStorage.setItem(CUSTOM_LEVEL_KEY, rows.join("\n"));
  closeEditor();
  loadCustomLevel(customLevel);
});

document.querySelector("#closeEditorBtn").addEventListener("click", closeEditor);

prevBtn.addEventListener("click", () => changeLevel(-1));
nextBtn.addEventListener("click", () => changeLevel(1));
document.querySelector("#resetBtn").addEventListener("click", () => {
  if (customMode && customLevel) loadCustomLevel(customLevel);
  else loadLevel(levelIndex);
});
document.querySelector("#undoBtn").addEventListener("click", undo);
document.querySelector("#againBtn").addEventListener("click", () => {
  if (customMode && customLevel) loadCustomLevel(customLevel);
  else loadLevel(levelIndex);
});
overlayNextBtn.addEventListener("click", () => {
  if (!customMode && levelIndex === LEVELS.length - 1 && isCleared()) {
    returnToTitle();
    return;
  }
  changeLevel(1);
});

document.querySelectorAll("[data-dir]").forEach((button) => {
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    move(button.dataset.dir);
  });
});

window.addEventListener("keydown", (event) => {
  resumeAudio();
  if (!gameStarted) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      startGame();
    }
    return;
  }
  const keyMap = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    w: "up",
    s: "down",
    a: "left",
    d: "right",
  };
  if (keyMap[event.key]) {
    event.preventDefault();
    move(keyMap[event.key]);
  }
  if (event.key === "z" || event.key === "Backspace") undo();
  if (event.key === "r") loadLevel(levelIndex);
});

window.addEventListener("resize", () => {
  if (state) render();
});

updateSoundButtons();
loadLevel(0);
updateStartButtonText();
if (bgmOn) {
  window.addEventListener("pointerdown", startBgm, { once: true });
  window.addEventListener("keydown", startBgm, { once: true });
}
