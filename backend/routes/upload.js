import express from 'express';
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    cb(null, allowed.test(path.extname(file.originalname).toLowerCase()));
  },
});

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

router.post('/', authRequired, (req, res, next) => {
  upload.single('image')(req, res, async (err) => {
    if (err?.code === 'LIMIT_FILE_SIZE')
      return res.status(400).json({ message: 'File too large. Maximum size is 10MB.' });
    if (err)
      return res.status(400).json({ message: 'Invalid file. Only JPEG, PNG, and WebP are allowed.' });
    if (!req.file) return res.status(400).json({ message: 'No file received' });

    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'influence-ads', resource_type: 'image', transformation: [{ quality: 'auto', fetch_format: 'auto' }] },
          (error, result) => error ? reject(error) : resolve(result)
        );
        stream.end(req.file.buffer);
      });
      res.json({ url: result.secure_url });
    } catch (e) {
      console.error('[Upload] Cloudinary error:', e.message);
      res.status(500).json({ message: 'Upload failed. Please try again.' });
    }
  });
});

export default router;
