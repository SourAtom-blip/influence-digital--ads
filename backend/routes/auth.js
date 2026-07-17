import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import protect from '../middleware/protect.js';

const router = express.Router();

const cookieOpts = {
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  secure: process.env.NODE_ENV === 'production',
};

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password)
      return res.status(400).json({ message: 'Username and password are required.' });

    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid username or password.' });

    const token = signToken(admin._id);
    res.cookie('adminToken', token, cookieOpts);
    res.json({ token, username: admin.username });
  } catch (err) {
    console.error('[Auth Login]', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('adminToken');
  res.json({ message: 'Signed out.' });
});

// POST /api/auth/change-password  (requires login)
router.post('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: 'Both fields are required.' });
    if (newPassword.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });

    const admin = await Admin.findById(req.admin.id);
    if (!await admin.matchPassword(currentPassword))
      return res.status(401).json({ message: 'Current password is incorrect.' });

    admin.passwordHash = await bcrypt.hash(newPassword, 12);
    await admin.save();
    res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    console.error('[Auth ChangePw]', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// POST /api/auth/reset-password  (public — uses recovery key)
router.post('/reset-password', async (req, res) => {
  try {
    const { recoveryKey, newPassword } = req.body;
    if (!recoveryKey || !newPassword)
      return res.status(400).json({ message: 'Both fields are required.' });
    if (newPassword.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });

    const admin = await Admin.findOne({});
    if (!admin || !await admin.matchRecoveryKey(recoveryKey))
      return res.status(401).json({ message: 'Recovery key is incorrect.' });

    admin.passwordHash = await bcrypt.hash(newPassword, 12);
    await admin.save();
    res.json({ message: 'Password reset successfully. You can now sign in.' });
  } catch (err) {
    console.error('[Auth ResetPw]', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// POST /api/auth/change-recovery-key  (requires login)
router.post('/change-recovery-key', protect, async (req, res) => {
  try {
    const { newRecoveryKey } = req.body;
    if (!newRecoveryKey || newRecoveryKey.length < 6)
      return res.status(400).json({ message: 'Recovery key must be at least 6 characters.' });

    const admin = await Admin.findById(req.admin.id);
    admin.recoveryKeyHash = await bcrypt.hash(newRecoveryKey, 12);
    await admin.save();
    res.json({ message: 'Recovery key updated.' });
  } catch (err) {
    console.error('[Auth ChangeKey]', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

export default router;
