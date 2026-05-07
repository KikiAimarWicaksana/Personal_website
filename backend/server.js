const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// ── Data ──────────────────────────────────────────────
const portfolioData = [
  { id: 1, category: 'web',    icon: '🌐', color: '#ff6b9d, #c44569', title: 'E-Commerce Platform',    desc: 'A full-featured online store with pixel-perfect design.',       tech: ['React', 'Node.js', 'MongoDB'],          xp: 500, demo: '#', code: '#' },
  { id: 2, category: 'app',    icon: '📱', color: '#4ecdc4, #2d9b93', title: 'Task Manager App',        desc: 'A productivity app to manage daily quests and track progress.',  tech: ['Flutter', 'Firebase', 'Dart'],           xp: 400, demo: '#', code: '#' },
  { id: 3, category: 'design', icon: '🎨', color: '#a55eea, #6c5ce7', title: 'Brand Identity Kit',      desc: 'Complete branding package with logo and visual guidelines.',     tech: ['Figma', 'Illustrator', 'Photoshop'],     xp: 350, demo: '#', code: '#' },
  { id: 4, category: 'web',    icon: '📊', color: '#f7d794, #f19066', title: 'Analytics Dashboard',     desc: 'Real-time data visualization with interactive charts.',           tech: ['Vue.js', 'D3.js', 'Python'],             xp: 450, demo: '#', code: '#' },
  { id: 5, category: 'app',    icon: '🎮', color: '#6a89cc, #4a69bd', title: 'Pixel RPG Game',          desc: 'A retro-style RPG game with pixel art and epic quests.',          tech: ['Unity', 'C#', 'Aseprite'],              xp: 600, demo: '#', code: '#' },
  { id: 6, category: 'design', icon: '✨', color: '#e77f67, #cf6a87', title: 'UI Component Library',    desc: 'Reusable pixel-themed UI components for modern web apps.',        tech: ['Storybook', 'CSS', 'React'],             xp: 300, demo: '#', code: '#' },
];

const activitiesData = [
  { id: 1, year: '2024', icon: '🎓', title: '🏅 Graduated with Honors',    desc: 'Completed Computer Science degree with flying colors!',          xp: 1000, badge: 'SCHOLAR' },
  { id: 2, year: '2024', icon: '🏆', title: '🥇 Hackathon Champion',        desc: 'Won first place at a national hackathon in 48 hours.',          xp: 800,  badge: 'CHAMPION' },
  { id: 3, year: '2023', icon: '💼', title: '🚀 Internship at Tech Corp',   desc: 'Gained real-world experience on production-grade apps.',        xp: 600,  badge: 'INTERN' },
  { id: 4, year: '2023', icon: '🎤', title: '🎙️ Tech Conference Speaker',  desc: 'Presented a talk on modern web technologies.',                 xp: 500,  badge: 'SPEAKER' },
  { id: 5, year: '2022', icon: '🌟', title: '💻 Open Source Contributor',  desc: 'Active contributor with 100+ merged pull requests.',            xp: 700,  badge: 'CONTRIBUTOR' },
  { id: 6, year: '2022', icon: '📜', title: '📝 Published Tech Article',   desc: 'Wrote an article that gained 10k+ readers.',                   xp: 400,  badge: 'WRITER' },
];

// ── Routes ─────────────────────────────────────────────
app.get('/api/portfolio', (req, res) => {
  const { category } = req.query;
  const data = category && category !== 'all'
    ? portfolioData.filter(p => p.category === category)
    : portfolioData;
  res.json({ success: true, data });
});

app.get('/api/activities', (req, res) => {
  res.json({ success: true, data: activitiesData });
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  // In production, send email via nodemailer here
  console.log('📨 New message from:', name, email);
  console.log('Subject:', subject);
  console.log('Message:', message);
  res.json({ success: true, message: 'Message received! Quest accepted! +100 XP' });
});

app.get('/api/stats', (req, res) => {
  const totalXp = [...portfolioData, ...activitiesData].reduce((s, i) => s + i.xp, 0);
  res.json({ success: true, data: { totalXp, quests: portfolioData.length, level: Math.floor(totalXp / 400) } });
});

app.listen(PORT, () => console.log(`🎮 Pixel Quest server running on http://localhost:${PORT}`));
