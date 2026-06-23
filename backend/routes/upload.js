import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`);
  },
});

// No file size limit — admin uploads high-res images
const upload = multer({ storage });

function authRequired(req, res, next) {
  const token = req.cookies?.adminToken || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

router.post('/', authRequired, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file received' });
  const base = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
  res.json({ url: `${base}/uploads/${req.file.filename}` });
});

export default router;
