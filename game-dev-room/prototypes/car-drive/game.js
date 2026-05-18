const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const scoreEl = document.querySelector("#score");
const bestEl = document.querySelector("#best");
const levelEl = document.querySelector("#level");
const overlay = document.querySelector("#overlay");
const overlayTitle = document.querySelector("#overlayTitle");
const overlayText = document.querySelector("#overlayText");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const restartBtn = document.querySelector("#restartBtn");
const soundBtn = document.querySelector("#soundBtn");
const carSelect = document.querySelector("#carSelect");
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const boostBtn = document.querySelector("#boostBtn");

const BEST_KEY = "car-drive-best:v1";
const SOUND_KEY = "car-drive-sfx:v1";
const CAR_KEY = "car-drive-car:v1";
const W = canvas.width;
const H = canvas.height;
const ROAD_LEFT = 58;
const ROAD_RIGHT = W - 58;
const LANES = [104, 180, 256];
const CAR_TYPES = {
  "arcade-red": {
    name: "Arcade Red",
  },
  "toyota-hilux": {
    name: "Toyota Hilux",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Toyota_Hilux,_side_view.svg",
    width: 76,
    height: 34,
  },
  "porsche-959": {
    name: "Porsche 959",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Porsche_959.svg",
    width: 82,
    height: 28,
  },
};

let car = { lane: 1, x: LANES[1], y: H - 92, targetX: LANES[1], boost: 0 };
let objects = [];
let particles = [];
let keys = new Set();
let score = 0;
let best = readBest();
let level = 1;
let spawnTimer = 0;
let roadOffset = 0;
let running = false;
let paused = false;
let gameOver = false;
let lastTime = 0;
let audioContext = null;
let sfxEnabled = readSound();
let selectedCar = readCar();
let carImages = {};

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY) || 0);
  } catch {
    return 0;
  }
}

function saveBest() {
  const finalScore = Math.floor(score);
  if (finalScore > best) {
    best = finalScore;
    try {
      localStorage.setItem(BEST_KEY, String(best));
    } catch {
      // localStorage can be blocked in some local browser contexts.
    }
  }
}

function readSound() {
  try {
    return localStorage.getItem(SOUND_KEY) !== "off";
  } catch {
    return true;
  }
}

function saveSound() {
  try {
    localStorage.setItem(SOUND_KEY, sfxEnabled ? "on" : "off");
  } catch {
    // localStorage can be blocked in some local browser contexts.
  }
}

function readCar() {
  try {
    const saved = localStorage.getItem(CAR_KEY);
    return CAR_TYPES[saved] ? saved : "arcade-red";
  } catch {
    return "arcade-red";
  }
}

function saveCar() {
  try {
    localStorage.setItem(CAR_KEY, selectedCar);
  } catch {
    // localStorage can be blocked in some local browser contexts.
  }
}

function loadCarImages() {
  Object.entries(CAR_TYPES).forEach(([id, type]) => {
    if (!type.src) return;
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = draw;
    image.src = type.src;
    carImages[id] = image;
  });
}

function wakeAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === "suspended") audioContext.resume();
}

function playSfx(type) {
  if (!sfxEnabled) return;
  wakeAudio();
  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  if (type === "coin") {
    osc.frequency.setValueAtTime(720, now);
    osc.frequency.exponentialRampToValueAtTime(1080, now + 0.08);
    gain.gain.setValueAtTime(0.08, now);
  } else if (type === "crash") {
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(58, now + 0.18);
    gain.gain.setValueAtTime(0.1, now);
  } else {
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(480, now + 0.05);
    gain.gain.setValueAtTime(0.04, now);
  }
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  osc.start(now);
  osc.stop(now + 0.22);
}

function resetGame() {
  car = { lane: 1, x: LANES[1], y: H - 92, targetX: LANES[1], boost: 0 };
  objects = [];
  particles = [];
  keys.clear();
  score = 0;
  level = 1;
  spawnTimer = 0;
  roadOffset = 0;
  running = true;
  paused = false;
  gameOver = false;
  lastTime = 0;
  overlay.classList.add("hidden");
  pauseBtn.textContent = "Pause";
  updateStats();
}

function updateStats() {
  const visibleScore = Math.floor(score);
  scoreEl.textContent = visibleScore;
  bestEl.textContent = Math.max(best, visibleScore);
  levelEl.textContent = level;
}

function showOverlay(title, text, buttonText = "Start") {
  overlayTitle.textContent = title;
  overlayText.textContent = text;
  startBtn.textContent = buttonText;
  overlay.classList.remove("hidden");
}

function chooseLane() {
  return LANES[Math.floor(Math.random() * LANES.length)];
}

function spawnObject() {
  const lane = chooseLane();
  const roll = Math.random();
  const type = roll < 0.52 ? "coin" : roll < 0.78 ? "cone" : "puddle";
  objects.push({
    type,
    x: lane,
    y: -40,
    r: type === "coin" ? 15 : 20,
    spin: Math.random() * Math.PI,
  });
}

function moveLane(dir) {
  if (!running || paused || gameOver) return;
  const nextLane = Math.max(0, Math.min(LANES.length - 1, car.lane + dir));
  if (nextLane !== car.lane) {
    car.lane = nextLane;
    car.targetX = LANES[car.lane];
    playSfx("move");
  }
}

function boost() {
  if (!running || paused || gameOver) return;
  car.boost = 0.45;
  addParticles(car.x, car.y + 44, "#ffd76a", 8);
  playSfx("move");
}

function addParticles(x, y, color, count) {
  for (let i = 0; i < count; i += 1) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 120,
      vy: 80 + Math.random() * 130,
      life: 0.35 + Math.random() * 0.25,
      color,
    });
  }
}

function collides(obj) {
  const dx = obj.x - car.x;
  const dy = obj.y - car.y;
  const distance = Math.hypot(dx, dy);
  return distance < obj.r + 28;
}

function update(dt) {
  if (!running || paused || gameOver) return;
  const speedBoost = car.boost > 0 ? 1.55 : 1;
  const speed = (170 + level * 22) * speedBoost;
  car.boost = Math.max(0, car.boost - dt);
  roadOffset = (roadOffset + speed * dt) % 80;
  score += 18 * dt * speedBoost;
  level = Math.floor(score / 650) + 1;
  car.x += (car.targetX - car.x) * Math.min(1, dt * 14);

  spawnTimer -= dt;
  if (spawnTimer <= 0) {
    spawnObject();
    spawnTimer = Math.max(0.38, 0.92 - level * 0.045);
  }

  objects.forEach((obj) => {
    obj.y += speed * dt;
    obj.spin += dt * 4;
  });

  objects = objects.filter((obj) => {
    if (collides(obj)) {
      if (obj.type === "coin") {
        score += 120;
        addParticles(obj.x, obj.y, "#ffd76a", 14);
        playSfx("coin");
        return false;
      }
      gameOver = true;
      running = false;
      saveBest();
      addParticles(car.x, car.y, "#ff746f", 24);
      playSfx("crash");
      showOverlay("Crash!", "Restart to drive again.", "Restart");
      return false;
    }
    return obj.y < H + 70;
  });

  particles.forEach((p) => {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.life -= dt;
  });
  particles = particles.filter((p) => p.life > 0);
  updateStats();
}

function drawRoad() {
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, "#58b9f3");
  sky.addColorStop(0.24, "#95dcff");
  sky.addColorStop(0.25, "#59b76a");
  sky.addColorStop(1, "#1f703d");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#29323b";
  ctx.beginPath();
  ctx.moveTo(ROAD_LEFT, 0);
  ctx.lineTo(ROAD_RIGHT, 0);
  ctx.lineTo(W - 20, H);
  ctx.lineTo(20, H);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#f5f2dc";
  ctx.lineWidth = 5;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(ROAD_LEFT + 10, 0);
  ctx.lineTo(28, H);
  ctx.moveTo(ROAD_RIGHT - 10, 0);
  ctx.lineTo(W - 28, H);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,.62)";
  ctx.lineWidth = 4;
  ctx.setLineDash([28, 28]);
  for (let x = 142; x <= 218; x += 76) {
    ctx.beginPath();
    ctx.moveTo(x, -80 + roadOffset);
    ctx.lineTo(x, H + 80);
    ctx.stroke();
  }
  ctx.setLineDash([]);
}

function drawCar() {
  const type = CAR_TYPES[selectedCar];
  const image = carImages[selectedCar];
  if (type?.src && image?.complete && image.naturalWidth > 0) {
    const w = type.width;
    const h = type.height;
    ctx.save();
    ctx.translate(car.x, car.y + 2);
    ctx.shadowColor = "rgba(0,0,0,.55)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 6;
    ctx.drawImage(image, -w / 2, -h / 2, w, h);
    ctx.restore();
    ctx.save();
    ctx.fillStyle = "#fff6aa";
    ctx.globalAlpha = 0.86;
    ctx.fillRect(car.x - 33, car.y - 24, 8, 5);
    ctx.fillRect(car.x + 25, car.y - 24, 8, 5);
    ctx.restore();
    return;
  }
  drawArcadeCar();
}

function drawArcadeCar() {
  const x = car.x;
  const y = car.y;
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#ef3f43";
  roundRect(-25, -38, 50, 76, 14);
  ctx.fill();
  ctx.fillStyle = "#ffd05e";
  roundRect(-18, -30, 36, 24, 9);
  ctx.fill();
  ctx.fillStyle = "#92e6ff";
  roundRect(-16, -20, 32, 18, 8);
  ctx.fill();
  ctx.fillStyle = "#1c2630";
  roundRect(-28, -24, 8, 22, 4);
  ctx.fill();
  roundRect(20, -24, 8, 22, 4);
  ctx.fill();
  roundRect(-28, 8, 8, 22, 4);
  ctx.fill();
  roundRect(20, 8, 8, 22, 4);
  ctx.fill();
  ctx.fillStyle = "#fff6aa";
  ctx.fillRect(-18, -40, 10, 7);
  ctx.fillRect(8, -40, 10, 7);
  ctx.restore();
}

function drawObject(obj) {
  ctx.save();
  ctx.translate(obj.x, obj.y);
  if (obj.type === "coin") {
    ctx.rotate(obj.spin);
    ctx.fillStyle = "#ffd953";
    ctx.beginPath();
    ctx.ellipse(0, 0, 15, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#a06b13";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "#a06b13";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("G", 0, 1);
  } else if (obj.type === "cone") {
    ctx.fillStyle = "#ff8b27";
    ctx.beginPath();
    ctx.moveTo(0, -24);
    ctx.lineTo(24, 22);
    ctx.lineTo(-24, 22);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#fff3d5";
    ctx.fillRect(-13, 3, 26, 7);
    ctx.fillStyle = "#4b2b16";
    ctx.fillRect(-28, 22, 56, 9);
  } else {
    ctx.fillStyle = "#55b9ff";
    ctx.beginPath();
    ctx.ellipse(0, 0, 30, 16, Math.sin(obj.spin) * 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.68)";
    ctx.beginPath();
    ctx.arc(-8, -4, 4, 0, Math.PI * 2);
    ctx.arc(9, 3, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawParticles() {
  particles.forEach((p) => {
    ctx.globalAlpha = Math.max(0, p.life * 2.2);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  });
}

function draw() {
  drawRoad();
  objects.forEach(drawObject);
  drawParticles();
  drawCar();
}

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
}

function gameLoop(time) {
  const dt = Math.min(0.033, (time - lastTime) / 1000 || 0);
  lastTime = time;
  if (keys.has("ArrowLeft")) moveLane(-1);
  if (keys.has("ArrowRight")) moveLane(1);
  if (keys.has("ArrowUp") || keys.has(" ")) boost();
  update(dt);
  draw();
  requestAnimationFrame(gameLoop);
}

function togglePause() {
  if (!running || gameOver) return;
  paused = !paused;
  pauseBtn.textContent = paused ? "Resume" : "Pause";
  if (paused) {
    showOverlay("Paused", "Press Resume to keep driving.", "Resume");
  } else {
    overlay.classList.add("hidden");
  }
}

function bindHold(button, down, up = () => {}) {
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    wakeAudio();
    down();
  });
  button.addEventListener("pointerup", (event) => {
    event.preventDefault();
    up();
  });
  button.addEventListener("pointercancel", up);
  button.addEventListener("click", (event) => event.preventDefault());
}

document.addEventListener("keydown", (event) => {
  if (["ArrowLeft", "ArrowRight", "ArrowUp", " "].includes(event.key)) {
    event.preventDefault();
    wakeAudio();
  }
  if (event.repeat) return;
  if (event.key === "ArrowLeft") moveLane(-1);
  if (event.key === "ArrowRight") moveLane(1);
  if (event.key === "ArrowUp" || event.key === " ") keys.add(event.key);
  if (event.key === "p" || event.key === "P") togglePause();
});

document.addEventListener("keyup", (event) => {
  keys.delete(event.key);
});

bindHold(leftBtn, () => moveLane(-1));
bindHold(rightBtn, () => moveLane(1));
bindHold(boostBtn, boost);

startBtn.addEventListener("click", () => {
  wakeAudio();
  resetGame();
});

restartBtn.addEventListener("click", () => {
  wakeAudio();
  resetGame();
});

pauseBtn.addEventListener("click", () => {
  wakeAudio();
  togglePause();
});

soundBtn.addEventListener("click", () => {
  wakeAudio();
  sfxEnabled = !sfxEnabled;
  saveSound();
  soundBtn.textContent = sfxEnabled ? "SFX ON" : "SFX OFF";
  soundBtn.setAttribute("aria-pressed", String(sfxEnabled));
  if (sfxEnabled) playSfx("coin");
});

carSelect.addEventListener("change", () => {
  selectedCar = carSelect.value;
  saveCar();
  playSfx("move");
  draw();
});

document.body.addEventListener(
  "touchmove",
  (event) => {
    event.preventDefault();
  },
  { passive: false }
);

soundBtn.textContent = sfxEnabled ? "SFX ON" : "SFX OFF";
soundBtn.setAttribute("aria-pressed", String(sfxEnabled));
carSelect.value = selectedCar;
loadCarImages();
updateStats();
draw();
showOverlay("Ready?", "Coins are good. Cones are bad.", "Start");
requestAnimationFrame(gameLoop);
