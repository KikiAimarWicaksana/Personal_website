const pool = require('./db');
const bcrypt = require('bcryptjs');

const portfolioData = [
  { category: 'web', icon: '🌐', color: '#ff6b9d, #c44569', title: 'E-Commerce Platform', desc: 'A full-featured online store with pixel-perfect design.', tech: 'React, Node.js, MongoDB', xp: 500, demo: '#', code: '#' },
  { category: 'app', icon: '📱', color: '#4ecdc4, #2d9b93', title: 'Task Manager App', desc: 'A productivity app to manage daily quests and track progress.', tech: 'Flutter, Firebase, Dart', xp: 400, demo: '#', code: '#' },
  { category: 'design', icon: '🎨', color: '#a55eea, #6c5ce7', title: 'Brand Identity Kit', desc: 'Complete branding package with logo and visual guidelines.', tech: 'Figma, Illustrator, Photoshop', xp: 350, demo: '#', code: '#' },
  { category: 'web', icon: '📊', color: '#f7d794, #f19066', title: 'Analytics Dashboard', desc: 'Real-time data visualization with interactive charts.', tech: 'Vue.js, D3.js, Python', xp: 450, demo: '#', code: '#' },
  { category: 'app', icon: '🎮', color: '#6a89cc, #4a69bd', title: 'Pixel RPG Game', desc: 'A retro-style RPG game with pixel art and epic quests.', tech: 'Unity, C#, Aseprite', xp: 600, demo: '#', code: '#' },
  { category: 'design', icon: '✨', color: '#e77f67, #cf6a87', title: 'UI Component Library', desc: 'Reusable pixel-themed UI components for modern web apps.', tech: 'Storybook, CSS, React', xp: 300, demo: '#', code: '#' }
];

const activitiesData = [
  { year: '2024', icon: '🎓', title: '🏅 Graduated with Honors', desc: 'Completed Computer Science degree with flying colors!', xp: 1000, badge: 'SCHOLAR' },
  { year: '2024', icon: '🏆', title: '🥇 Hackathon Champion', desc: 'Won first place at a national hackathon in 48 hours.', xp: 800, badge: 'CHAMPION' },
  { year: '2023', icon: '💼', title: '🚀 Internship at Tech Corp', desc: 'Gained real-world experience on production-grade apps.', xp: 600, badge: 'INTERN' },
  { year: '2023', icon: '🎤', title: '🎙️ Tech Conference Speaker', desc: 'Presented a talk on modern web technologies.', xp: 500, badge: 'SPEAKER' },
  { year: '2022', icon: '🌟', title: '💻 Open Source Contributor', desc: 'Active contributor with 100+ merged pull requests.', xp: 700, badge: 'CONTRIBUTOR' },
  { year: '2022', icon: '📜', title: '📝 Published Tech Article', desc: 'Wrote an article that gained 10k+ readers.', xp: 400, badge: 'WRITER' }
];

async function initDB() {
  try {
    console.log('Connecting to TiDB Cloud...');
    
    // Create Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);

    // Create Portfolio table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(50) NOT NULL,
        icon VARCHAR(50) NOT NULL,
        color VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        \`desc\` TEXT NOT NULL,
        tech VARCHAR(255) NOT NULL,
        xp INT NOT NULL,
        demo VARCHAR(255),
        code VARCHAR(255),
        image VARCHAR(255),
        year VARCHAR(100)
      )
    `);

    // Create Activities table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        year VARCHAR(100) NOT NULL,
        icon VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        \`desc\` TEXT NOT NULL,
        xp INT NOT NULL,
        badge VARCHAR(50) NOT NULL,
        image VARCHAR(255)
      )
    `);

    console.log('Tables created or verified.');

    // Check if admin exists
    const [rows] = await pool.query('SELECT * FROM users WHERE username = "admin"');
    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', ['admin', hashedPassword]);
      console.log('Admin user created (username: admin, password: password123)');
    }

    // Insert dummy portfolio if empty
    const [pfRows] = await pool.query('SELECT COUNT(*) as count FROM portfolio');
    if (pfRows[0].count === 0) {
      for (const p of portfolioData) {
        await pool.query(
          'INSERT INTO portfolio (category, icon, color, title, `desc`, tech, xp, demo, code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [p.category, p.icon, p.color, p.title, p.desc, p.tech, p.xp, p.demo, p.code]
        );
      }
      console.log('Dummy portfolio data inserted.');
    }

    // Insert dummy activities if empty
    const [actRows] = await pool.query('SELECT COUNT(*) as count FROM activities');
    if (actRows[0].count === 0) {
      for (const a of activitiesData) {
        await pool.query(
          'INSERT INTO activities (year, icon, title, `desc`, xp, badge) VALUES (?, ?, ?, ?, ?, ?)',
          [a.year, a.icon, a.title, a.desc, a.xp, a.badge]
        );
      }
      console.log('Dummy activities data inserted.');
    }

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    process.exit();
  }
}

initDB();
