require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://kikiaimarwicaksana.vercel.app',
  'https://kikiaimar.com',
  'https://aimar.my.id',
  'https://www.aimar.my.id'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.indexOf(origin) !== -1 || 
                     origin.endsWith('aimar.my.id');

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('❌ CORS Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Handle Vercel's pre-parsed body
app.use((req, res, next) => {
  if (req.body) {
    req._body = true; // Tell Express body-parser that body is already parsed
  }
  next();
});
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Cloudinary Configuration ───────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pixel_quest',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 1000, crop: 'limit' }]
  },
});
const upload = multer({ storage });

// ── Auth Middleware ────────────────────────────────────
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ success: false, message: 'No token provided' });

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ success: false, message: 'Unauthorized' });
    req.userId = decoded.id;
    next();
  });
}

// ── Auth Routes ────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) return res.status(404).json({ success: false, message: 'User not found' });

    const user = users[0];
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) return res.status(401).json({ success: false, message: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 }); // 24 hours
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/auth/verify', verifyToken, (req, res) => {
  res.json({ success: true, message: 'Token is valid' });
});

// ── Public Routes (Read-Only) ──────────────────────────
app.get('/api/portfolio', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM portfolio';
    let params = [];
    if (category && category !== 'all') {
      query += ' WHERE category = ?';
      params.push(category);
    }
    const [data] = await pool.query(query, params);

    // Parse tech string to array for frontend compatibility
    const formattedData = data.map(item => ({
      ...item,
      tech: item.tech ? item.tech.split(',').map(t => t.trim()) : []
    }));

    res.json({ success: true, data: formattedData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/portfolio/:id', async (req, res) => {
  try {
    const [data] = await pool.query('SELECT * FROM portfolio WHERE id = ?', [req.params.id]);
    if (data.length === 0) return res.status(404).json({ success: false, message: 'Quest not found' });

    const item = data[0];
    item.tech = item.tech ? item.tech.split(',').map(t => t.trim()) : [];
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/activities', async (req, res) => {
  try {
    const [data] = await pool.query('SELECT * FROM activities ORDER BY year DESC, id DESC');
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/activities/:id', async (req, res) => {
  try {
    const [data] = await pool.query('SELECT * FROM activities WHERE id = ?', [req.params.id]);
    if (data.length === 0) return res.status(404).json({ success: false, message: 'Achievement not found' });
    res.json({ success: true, data: data[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const [portData] = await pool.query('SELECT IFNULL(SUM(xp),0) as totalXp, COUNT(*) as count FROM portfolio');
    const [actData] = await pool.query('SELECT IFNULL(SUM(xp),0) as totalXp FROM activities');

    const totalXp = Number(portData[0].totalXp) + Number(actData[0].totalXp);
    res.json({ success: true, data: { totalXp, quests: portData[0].count, level: Math.floor(totalXp / 400) } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  console.log('📨 New message from:', name, email);
  res.json({ success: true, message: 'Message received! Quest accepted! +100 XP' });
});

// ── Admin Protected Routes (CRUD) ──────────────────────

// Portfolio
app.post('/api/portfolio', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { category, icon, color, title, desc, tech, xp, demo, code } = req.body;
    const image = req.file ? req.file.path : null;
    await pool.query(
      'INSERT INTO portfolio (category, icon, color, title, `desc`, tech, xp, demo, code, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [category, icon, color, title, desc, tech, xp, demo, code, image]
    );
    res.json({ success: true, message: 'Quest added successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/portfolio/:id', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { category, icon, color, title, desc, tech, xp, demo, code } = req.body;
    const image = req.file ? req.file.path : req.body.existingImage;
    await pool.query(
      'UPDATE portfolio SET category=?, icon=?, color=?, title=?, `desc`=?, tech=?, xp=?, demo=?, code=?, image=? WHERE id=?',
      [category, icon, color, title, desc, tech, xp, demo, code, image, req.params.id]
    );
    res.json({ success: true, message: 'Quest updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/portfolio/:id', verifyToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM portfolio WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Quest deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Activities
app.post('/api/activities', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { year, icon, title, desc, xp, badge } = req.body;
    const image = req.file ? req.file.path : null;
    await pool.query(
      'INSERT INTO activities (year, icon, title, `desc`, xp, badge, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [year, icon, title, desc, xp, badge, image]
    );
    res.json({ success: true, message: 'Achievement added successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/activities/:id', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { year, icon, title, desc, xp, badge } = req.body;
    const image = req.file ? req.file.path : req.body.existingImage;
    await pool.query(
      'UPDATE activities SET year=?, icon=?, title=?, `desc`=?, xp=?, badge=?, image=? WHERE id=?',
      [year, icon, title, desc, xp, badge, image, req.params.id]
    );
    res.json({ success: true, message: 'Achievement updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/activities/:id', verifyToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM activities WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Achievement deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error('Express Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Only listen when running locally (not on Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => console.log(`🎮 Pixel Quest server running on http://localhost:${PORT}`));
}

module.exports = app;
