const fs = require('fs');
const path = require('path');

// ===============================
// KONFIGURASI
// ===============================
const ROOT = process.cwd();
const README_PATH = path.join(ROOT, 'README.md');
const GITHUB_USERNAME = 'USERNAME'; // ← GANTI INI
const REPO_NAME = '100-js-projects';

// Daftar 100 project (nomor + nama + level)
const PROJECTS = [
  // Level 1
  { no: 1, name: 'Hello World', slug: 'hello-world', level: 1 },
  { no: 2, name: 'Kalkulator Sederhana', slug: 'kalkulator', level: 1 },
  { no: 3, name: 'BMI Calculator', slug: 'bmi-calculator', level: 1 },
  { no: 4, name: 'Konversi Suhu', slug: 'konversi-suhu', level: 1 },
  { no: 5, name: 'Kalkulator Diskon', slug: 'kalkulator-diskon', level: 1 },
  { no: 6, name: 'Simple Interest', slug: 'simple-interest', level: 1 },
  { no: 7, name: 'Umur Calculator', slug: 'umur-calculator', level: 1 },
  { no: 8, name: 'Tip Calculator', slug: 'tip-calculator', level: 1 },
  { no: 9, name: 'Digital Clock', slug: 'digital-clock', level: 1 },
  { no: 10, name: 'Stopwatch', slug: 'stopwatch', level: 1 },
  { no: 11, name: 'Countdown Timer', slug: 'countdown-timer', level: 1 },
  { no: 12, name: 'Counter App', slug: 'counter-app', level: 1 },
  { no: 13, name: 'Ganti Warna', slug: 'ganti-warna', level: 1 },
  { no: 14, name: 'Ganti Tema', slug: 'ganti-tema', level: 1 },
  { no: 15, name: 'Random Dice Roller', slug: 'dice-roller', level: 1 },
  { no: 16, name: 'Random Quote', slug: 'random-quote', level: 1 },
  { no: 17, name: 'Password Generator', slug: 'password-generator', level: 1 },
  { no: 18, name: 'Text Case Converter', slug: 'text-case', level: 1 },
  { no: 19, name: 'Todo List Simple', slug: 'todo-simple', level: 1 },
  { no: 20, name: 'Word Counter', slug: 'word-counter', level: 1 },
  // Level 2
  { no: 21, name: 'Todo LocalStorage', slug: 'todo-localstorage', level: 2 },
  { no: 22, name: 'Notes App', slug: 'notes-app', level: 2 },
  { no: 23, name: 'Expense Tracker', slug: 'expense-tracker', level: 2 },
  { no: 24, name: 'Grade Calculator', slug: 'grade-calculator', level: 2 },
  { no: 25, name: 'Flashcard App', slug: 'flashcard-app', level: 2 },
  { no: 26, name: 'Palindrome Checker', slug: 'palindrome-checker', level: 2 },
  { no: 27, name: 'Anagram Checker', slug: 'anagram-checker', level: 2 },
  { no: 28, name: 'Password Strength', slug: 'password-strength', level: 2 },
  { no: 29, name: 'Search Filter', slug: 'search-filter', level: 2 },
  { no: 30, name: 'Color Picker', slug: 'color-picker', level: 2 },
  { no: 31, name: 'Weather App', slug: 'weather-app', level: 2 },
  { no: 32, name: 'Currency Converter', slug: 'currency-converter', level: 2 },
  { no: 33, name: 'Joke Generator', slug: 'joke-generator', level: 2 },
  { no: 34, name: 'Random User Generator', slug: 'random-user', level: 2 },
  { no: 35, name: 'Cat Fact Generator', slug: 'cat-fact', level: 2 },
  { no: 36, name: 'Quiz App', slug: 'quiz-app', level: 2 },
  { no: 37, name: 'IP Address Lookup', slug: 'ip-lookup', level: 2 },
  { no: 38, name: 'QR Code Generator', slug: 'qr-generator', level: 2 },
  { no: 39, name: 'Sorting Visualizer', slug: 'sorting-visualizer', level: 2 },
  { no: 40, name: 'Pomodoro Timer', slug: 'pomodoro-timer', level: 2 },
  // Level 3
  { no: 41, name: 'Music Player', slug: 'music-player', level: 3 },
  { no: 42, name: 'Video Player Custom', slug: 'video-player', level: 3 },
  { no: 43, name: 'Image Slider', slug: 'image-slider', level: 3 },
  { no: 44, name: 'Modal Popup', slug: 'modal-popup', level: 3 },
  { no: 45, name: 'Accordion FAQ', slug: 'accordion-faq', level: 3 },
  { no: 46, name: 'Tabs Component', slug: 'tabs-component', level: 3 },
  { no: 47, name: 'Toast Notification', slug: 'toast-notification', level: 3 },
  { no: 48, name: 'Tooltip Component', slug: 'tooltip-component', level: 3 },
  { no: 49, name: 'Form Validation', slug: 'form-validation', level: 3 },
  { no: 50, name: 'Multi-step Form', slug: 'multistep-form', level: 3 },
  { no: 51, name: 'Drag & Drop List', slug: 'drag-drop-list', level: 3 },
  { no: 52, name: 'Kanban Board', slug: 'kanban-board', level: 3 },
  { no: 53, name: 'Memory Game', slug: 'memory-game', level: 3 },
  { no: 54, name: 'Simon Says', slug: 'simon-says', level: 3 },
  { no: 55, name: 'Tic Tac Toe', slug: 'tic-tac-toe', level: 3 },
  { no: 56, name: 'Rock Paper Scissors', slug: 'rock-paper-scissors', level: 3 },
  { no: 57, name: 'Whack-a-Mole', slug: 'whack-a-mole', level: 3 },
  { no: 58, name: 'Hangman', slug: 'hangman', level: 3 },
  { no: 59, name: 'Typing Speed Test', slug: 'typing-speed-test', level: 3 },
  { no: 60, name: 'Pong Game', slug: 'pong-game', level: 3 },
  // Level 4
  { no: 61, name: 'Snake Game', slug: 'snake-game', level: 4 },
  { no: 62, name: 'Tetris', slug: 'tetris', level: 4 },
  { no: 63, name: 'Breakout', slug: 'breakout', level: 4 },
  { no: 64, name: 'Flappy Bird Clone', slug: 'flappy-bird', level: 4 },
  { no: 65, name: 'Minesweeper', slug: 'minesweeper', level: 4 },
  { no: 66, name: '2048 Game', slug: '2048-game', level: 4 },
  { no: 67, name: 'Sudoku Solver', slug: 'sudoku-solver', level: 4 },
  { no: 68, name: 'Chess Board', slug: 'chess-board', level: 4 },
  { no: 69, name: 'Paint App', slug: 'paint-app', level: 4 },
  { no: 70, name: 'Image Editor', slug: 'image-editor', level: 4 },
  { no: 71, name: 'Markdown Previewer', slug: 'markdown-previewer', level: 4 },
  { no: 72, name: 'Code Editor Mini', slug: 'code-editor', level: 4 },
  { no: 73, name: 'Regex Tester', slug: 'regex-tester', level: 4 },
  { no: 74, name: 'JSON Formatter', slug: 'json-formatter', level: 4 },
  { no: 75, name: 'Base64 Tool', slug: 'base64-tool', level: 4 },
  { no: 76, name: 'Password Manager', slug: 'password-manager', level: 4 },
  { no: 77, name: 'Chart Generator', slug: 'chart-generator', level: 4 },
  { no: 78, name: 'Habit Tracker', slug: 'habit-tracker', level: 4 },
  { no: 79, name: 'Budget Planner', slug: 'budget-planner', level: 4 },
  { no: 80, name: 'Recipe Finder', slug: 'recipe-finder', level: 4 },
  // Level 5
  { no: 81, name: 'Chat App', slug: 'chat-app', level: 5 },
  { no: 82, name: 'Video Call App', slug: 'video-call', level: 5 },
  { no: 83, name: 'Collaborative Notes', slug: 'collab-notes', level: 5 },
  { no: 84, name: 'Multiplayer Game', slug: 'multiplayer-game', level: 5 },
  { no: 85, name: 'E-commerce Cart', slug: 'ecommerce-cart', level: 5 },
  { no: 86, name: 'Blog CRUD', slug: 'blog-crud', level: 5 },
  { no: 87, name: 'Dashboard Admin', slug: 'admin-dashboard', level: 5 },
  { no: 88, name: 'Social Media Feed', slug: 'social-feed', level: 5 },
  { no: 89, name: 'Task Management', slug: 'task-management', level: 5 },
  { no: 90, name: 'File Upload Preview', slug: 'file-upload', level: 5 },
  { no: 91, name: 'Instagram Clone', slug: 'instagram-clone', level: 5 },
  { no: 92, name: 'Twitter Clone', slug: 'twitter-clone', level: 5 },
  { no: 93, name: 'Netflix Clone', slug: 'netflix-clone', level: 5 },
  { no: 94, name: 'Spotify Clone', slug: 'spotify-clone', level: 5 },
  { no: 95, name: 'PWA Todo App', slug: 'pwa-todo', level: 5 },
  { no: 96, name: 'Portfolio Website', slug: 'portfolio', level: 5 },
  { no: 97, name: 'Landing Page Produk', slug: 'landing-page', level: 5 },
  { no: 98, name: 'PDF Generator', slug: 'pdf-generator', level: 5 },
  { no: 99, name: 'Screen Recorder', slug: 'screen-recorder', level: 5 },
  { no: 100, name: 'Full-Stack Mini App', slug: 'fullstack-app', level: 5 },
];

// ===============================
// HELPER
// ===============================
function pad(n) {
  return String(n).padStart(3, '0');
}

function getFolderName(p) {
  return `${pad(p.no)}-${p.slug}`;
}

function isCompleted(p) {
  const folderPath = path.join(ROOT, getFolderName(p));
  const scriptPath = path.join(folderPath, 'script.js');
  const htmlPath = path.join(folderPath, 'index.html');

  // Project dianggap selesai kalau folder ada & script.js > 100 bytes (bukan template kosong)
  if (!fs.existsSync(folderPath)) return false;
  if (!fs.existsSync(scriptPath)) return false;
  if (!fs.existsSync(htmlPath)) return false;

  const scriptSize = fs.statSync(scriptPath).size;
  const htmlSize = fs.statSync(htmlPath).size;

  // Template kosong ~150 bytes. Kalau > 300, berarti udah diisi.
  return scriptSize > 300 && htmlSize > 500;
}

function makeBar(done, total, length = 10) {
  const filled = Math.round((done / total) * length);
  return '▓'.repeat(filled) + '░'.repeat(length - filled);
}

function badgeColor(percent) {
  if (percent === 0) return 'red';
  if (percent < 25) return 'red';
  if (percent < 50) return 'orange';
  if (percent < 75) return 'yellow';
  if (percent < 100) return 'green';
  return 'blue';
}

function statusEmoji(done, total) {
  if (done === 0) return '🔒';
  if (done === total) return '✅';
  return '🚧';
}

// ===============================
// GENERATE SECTION
// ===============================
function generateProgressSection(completed) {
  const levelStats = [1, 2, 3, 4, 5].map(level => {
    const levelProjects = PROJECTS.filter(p => p.level === level);
    const done = levelProjects.filter(p => completed.has(p.no)).length;
    const total = levelProjects.length;
    const percent = Math.round((done / total) * 100);
    const emoji = ['🟢', '🟡', '🟠', '🔴', '🟣'][level - 1];
    return { level, done, total, percent, emoji };
  });

  const totalDone = completed.size;
  const totalPercent = Math.round((totalDone / 100) * 100);
  const color = badgeColor(totalPercent);

  let md = `## 📊 Progress\n\n`;
  md += `![Progress](https://img.shields.io/badge/🎯_Total-${totalDone}%2F100-${color}?style=for-the-badge)\n\n`;
  md += `| Level | Progress | Status |\n`;
  md += `|:-----:|:--------:|:------:|\n`;

  levelStats.forEach(s => {
    md += `| ${s.emoji} Level ${s.level} | \`${makeBar(s.done, s.total)}\` ${s.done}/${s.total} | ${statusEmoji(s.done, s.total)} |\n`;
  });

  md += `\n**Legenda:** 🔒 Belum dibuka • 🚧 Progress • ✅ Selesai\n`;
  return md;
}

function generateProjectsSection(completed) {
  if (completed.size === 0) {
    return `## ✅ Project Selesai\n\n*Belum ada project selesai. Ayo mulai!* 🚀\n`;
  }

  let md = `## ✅ Project Selesai\n\n`;
  md += `| # | Project | Demo | Code |\n`;
  md += `|---|---------|------|------|\n`;

  PROJECTS.filter(p => completed.has(p.no)).forEach(p => {
    const folder = getFolderName(p);
    const demo = `https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/${folder}/`;
    md += `| ${pad(p.no)} | ${p.name} | [🌐 Demo](${demo}) | [📂 Code](./${folder}/) |\n`;
  });

  return md;
}

// ===============================
// UPDATE README
// ===============================
function updateReadme() {
  const completed = new Set();
  PROJECTS.forEach(p => {
    if (isCompleted(p)) completed.add(p.no);
  });

  console.log(`✅ Selesai: ${completed.size}/100`);
  console.log(`📋 Project: ${[...completed].join(', ') || 'belum ada'}`);

  if (!fs.existsSync(README_PATH)) {
    console.error('❌ README.md tidak ditemukan!');
    process.exit(1);
  }

  let readme = fs.readFileSync(README_PATH, 'utf8');

  // Replace section Progress
  const progressSection = generateProgressSection(completed);
  readme = readme.replace(
    /## 📊 Progress[\s\S]*?(?=\n## )/,
    progressSection + '\n'
  );

  // Replace section Project Selesai
  const projectsSection = generateProjectsSection(completed);
  readme = readme.replace(
    /## ✅ Project Selesai[\s\S]*?(?=\n## )/,
    projectsSection + '\n'
  );

  fs.writeFileSync(README_PATH, readme);
  console.log('✨ README.md berhasil di-update!');
}

updateReadme();
