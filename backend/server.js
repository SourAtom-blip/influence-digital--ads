import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import helmet from 'helmet';

import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes   from './routes/auth.js';
import quoteRoutes  from './routes/quotes.js';
import siteRoutes   from './routes/site.js';
import uploadRoutes from './routes/upload.js';
import Admin        from './models/Admin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Validate required environment variables ───────────────────────────────────
const REQUIRED_ENV = ['MONGO_URI', 'JWT_SECRET'];
const missing = REQUIRED_ENV.filter(k => !process.env[k]);
if (missing.length) {
  console.error(`[Config] Missing required environment variables: ${missing.join(', ')}`);
  console.error('[Config] Copy backend/.env.example to backend/.env and fill in the values.');
  process.exit(1);
}

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limit login — 10 attempts per 15 minutes per IP
app.use('/api/auth/login', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
}));

// Rate limit quote submissions — 5 per hour per IP (prevents spam)
app.use('/api/quotes', rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { message: 'Too many quote requests from this IP. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method !== 'POST', // only limit submissions, not admin reads
}));

// ── Static uploads ────────────────────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',   authRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/site',   siteRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({ message: 'Internal server error.' });
});

// ── DB seed — create admin from env vars on first run ────────────────────────
async function seedAdmin() {
  const exists = await Admin.findOne({});
  if (exists) return;

  const pw  = process.env.ADMIN_PASSWORD;
  const rk  = process.env.ADMIN_RECOVERY_KEY;
  const usr = process.env.ADMIN_USERNAME || 'admin';

  if (!pw || !rk) {
    console.error('[DB] No admin account found. Set ADMIN_PASSWORD and ADMIN_RECOVERY_KEY in .env to create one.');
    process.exit(1);
  }

  await Admin.create({
    username:        usr,
    passwordHash:    await bcrypt.hash(pw, 12),
    recoveryKeyHash: await bcrypt.hash(rk, 12),
  });
  console.log(`[DB] Admin account created — username: ${usr}`);
}

// ── Connect & Start ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
});

const shutdown = () => {
  console.log('[Server] Shutting down gracefully…');
  server.close(() => {
    mongoose.connection.close().then(() => process.exit(0));
  });
};
process.on('SIGTERM', shutdown);
process.on('SIGINT',  shutdown);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    console.log('[DB] MongoDB connected');
    await seedAdmin();

    setInterval(async () => {
      try {
        await mongoose.connection.db.command({ ping: 1 });
        console.log('[KeepAlive] MongoDB ping OK');
      } catch (e) {
        console.error('[KeepAlive] Ping failed:', e.message);
      }
    }, 24 * 60 * 60 * 1000);
  } catch (err) {
    console.error('[DB] Connection failed:', err.message);
    console.error('[DB] Server running without DB — fix MONGO_URI and restart.');
  }
}

connectDB();
