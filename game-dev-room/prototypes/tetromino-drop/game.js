const COLS = 10;
const ROWS = 20;
const BLOCK = 30;
const NEXT_BLOCK = 24;
const BEST_KEY = "tetromino-drop-best";

const COLORS = {
  I: "#64d8ff",
  J: "#6f8cff",
  L: "#ffb35c",
  O: "#ffe066",
  S: "#62e08f",
  T: "#c184ff",
  Z: "#ff6f91",
};

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

let board;
let current;
let nextPiece;
let bag = [];
let score = 0;
let lines = 0;
let level = 1;
let best = readBestScore();
let paused = false;
let gameOver = false;
let dropTimer = 0;
let lastTime = 0;

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
}

function spawnPiece() {
  current = nextPiece || drawFromBag();
  nextPiece = drawFromBag();
  if (collides(current)) {
    gameOver = true;
    paused = false;
    saveBest();
    showOverlay("Game Over", "Press Restart to play again.");
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
    draw();
  }
}

function softDrop() {
  if (paused || gameOver) return;
  if (!collides(current, 0, 1)) {
    current.y += 1;
    score += 1;
  } else {
    lockPiece();
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
    draw();
  }
}

function lockPiece() {
  mergePiece();
  clearLines();
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
      softDrop();
      dropTimer = 0;
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

function drawCell(context, x, y, size, color, alpha = 1) {
  context.globalAlpha = alpha;
  context.fillStyle = color;
  context.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
  context.fillStyle = "rgba(255,255,255,.16)";
  context.fillRect(x * size + 3, y * size + 3, size - 6, 3);
  context.globalAlpha = 1;
}

function drawGrid() {
  ctx.fillStyle = "#0a0d13";
  ctx.fillRect(0, 0, boardCanvas.width, boardCanvas.height);
  ctx.strokeStyle = "rgba(255,255,255,.055)";
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
      drawCell(ctx, piece.x + x, drawY, BLOCK, COLORS[piece.type], alpha);
    });
  });
}

function drawNext() {
  nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
  nextCtx.fillStyle = "#111722";
  nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
  const shape = nextPiece.shape;
  const offsetX = Math.floor((5 - shape[0].length) / 2);
  const offsetY = Math.floor((5 - shape.length) / 2);
  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        drawCell(nextCtx, offsetX + x, offsetY + y, NEXT_BLOCK, COLORS[nextPiece.type]);
      }
    });
  });
}

function draw() {
  drawGrid();
  board.forEach((row, y) => {
    row.forEach((type, x) => {
      if (type) drawCell(ctx, x, y, BLOCK, COLORS[type]);
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

  if (key === "ArrowLeft") move(-1);
  if (key === "ArrowRight") move(1);
  if (key === "ArrowDown") softDrop();
  if (key === " ") hardDrop();
  if (key === "z" || key === "Z") rotateCurrent(-1);
  if (key === "x" || key === "X" || key === "ArrowUp") rotateCurrent(1);
  if (key === "p" || key === "P") togglePause();
});

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    if (action === "left") move(-1);
    if (action === "right") move(1);
    if (action === "rotate") rotateCurrent(1);
    if (action === "drop") hardDrop();
  });
});

pauseBtn.addEventListener("click", togglePause);
restartBtn.addEventListener("click", restart);

restart();
requestAnimationFrame(update);
