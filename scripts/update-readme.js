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
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function getProjects() {
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^\d{3}-/.test(d.name))
    .map((d) => d.name)
    .sort()
    .filter((folder) =>
      REQUIRED_FILES.every((f) => fs.existsSync(path.join(ROOT, folder, f)))
    );
}

function replaceBlock(content, name, body) {
  const re = new RegExp(
    `<!-- ${name}:START -->[\\s\\S]*?<!-- ${name}:END -->`
  );
  if (!re.test(content)) {
    throw new Error(
      `Marker <!-- ${name}:START --> / <!-- ${name}:END --> tidak ketemu di README.md`
    );
  }
  return content.replace(
    re,
    `<!-- ${name}:START -->\n${body}\n<!-- ${name}:END -->`
  );
}

// ---------- builders ----------

function buildProgress(done) {
  const percent = Math.round((done / TOTAL) * 100);
  const barSize = 20;
  const filled = Math.round((done / TOTAL) * barSize);
  const bar = '█'.repeat(filled) + '░'.repeat(barSize - filled);

  const reached = [...MILESTONES].reverse().find((m) => done >= m.at);
  const next = MILESTONES.find((m) => done < m.at);

  const lines = [
    `**${done} / ${TOTAL}** project selesai (${percent}%)`,
    '',
    '```',
    `${bar}  ${percent}%`,
    '```',
    '',
    `🏅 **Gelar sekarang:** ${
      reached ? `${reached.badge} ${reached.title}` : '🌱 Pemula'
    }`,
  ];

  if (next) {
    lines.push(
      `🎯 **Target berikutnya:** ${next.badge} ${next.title} — tinggal **${
        next.at - done
      }** project lagi`
    );
  } else {
    lines.push('🎉 **Semua milestone tercapai!**');
  }

  return lines.join('\n');
}

// Link GitHub Pages dibuat otomatis dari nama repo.
// - Repo biasa            -> https://user.github.io/nama-repo/
// - Repo user.github.io   -> https://user.github.io/
function getBaseUrl() {
  const full = process.env.GITHUB_REPOSITORY || 'pajrinurfarhan/Project-JavaScript';
  const [owner, repo] = full.split('/');
  const host = `https://${owner.toLowerCase()}.github.io`;
  const isUserSite = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;
  return isUserSite ? `${host}/` : `${host}/${repo}/`;
}

function buildProjectList(projects) {
  if (projects.length === 0) {
    return '_Belum ada project yang selesai. Semangat! 💪_';
  }

  const base = getBaseUrl();

  const rows = projects.map((folder) => {
    const num = folder.slice(0, 3);
    return `| ${num} | [${prettyName(folder)}](./${folder}) | [🌐 Demo](${base}${folder}/) |`;
  });

  return [
    '| # | Project | Demo |',
    '|---|---------|------|',
    ...rows,
  ].join('\n');
}

// ---------- main ----------

function main() {
  const projects = getProjects();
  let readme = fs.readFileSync(README_PATH, 'utf8');

  readme = replaceBlock(readme, 'PROGRESS', buildProgress(projects.length));
  readme = replaceBlock(readme, 'PROJECTS', buildProjectList(projects));

  fs.writeFileSync(README_PATH, readme);
  console.log(`✅ README diupdate: ${projects.length}/${TOTAL} project selesai`);
}

main();
