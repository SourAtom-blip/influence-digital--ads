import jwt from 'jsonwebtoken';

export default function protect(req, res, next) {
  const token = req.cookies?.adminToken
    || req.headers.authorization?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'Not authenticated.' });

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Session expired. Please sign in again.' });
  }
}
