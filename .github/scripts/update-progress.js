#!/usr/bin/env node
/**
 * Auto-update bagian Progress & Project Selesai di README.md
 *
 * Project dianggap SELESAI kalau foldernya (format NNN-nama-project)
 * punya semua file ini: index.html, style.css, script.js, README.md
 *
 * Jalankan manual:  node scripts/update-readme.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const README_PATH = path.join(ROOT, 'README.md');
const TOTAL = 100;
const REQUIRED_FILES = ['index.html', 'style.css', 'script.js', 'README.md'];

const MILESTONES = [
  { at: 20, badge: '🥉', title: 'Junior Coder' },
  { at: 40, badge: '🥈', title: 'App Builder' },
  { at: 60, badge: '🥇', title: 'Game Dev' },
  { at: 80, badge: '💎', title: 'Tool Master' },
  { at: 100, badge: '👑', title: 'Full-Stack Dev' },
];

// ---------- helpers ----------

function prettyName(folder) {
  return folder
    .replace(/^\d{3}-/, '')