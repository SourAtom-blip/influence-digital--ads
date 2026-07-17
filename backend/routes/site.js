import express from 'express';
import SiteData from '../models/SiteData.js';
import protect from '../middleware/protect.js';

const router = express.Router();

const ALLOWED_KEYS = ['content_en', 'content_fr', 'services', 'images'];

// GET /api/site/:key  (public)
router.get('/:key', async (req, res) => {
  try {
    if (!ALLOWED_KEYS.includes(req.params.key))
      return res.status(400).json({ message: 'Invalid key.' });

    const doc = await SiteData.findOne({ key: req.params.key });
    res.json(doc ? doc.value : null);
  } catch (err) {
    console.error('[Site GET]', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// PUT /api/site/:key  (admin)
router.put('/:key', protect, async (req, res) => {
  try {
    if (!ALLOWED_KEYS.includes(req.params.key))
      return res.status(400).json({ message: 'Invalid key.' });

    const doc = await SiteData.findOneAndUpdate(
      { key: req.params.key },
      { key: req.params.key, value: req.body.value },
      { upsert: true, new: true }
    );
    res.json(doc.value);
  } catch (err) {
    console.error('[Site PUT]', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

export default router;
