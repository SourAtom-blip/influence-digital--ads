import express from 'express';
import nodemailer from 'nodemailer';
import Quote from '../models/Quote.js';
import protect from '../middleware/protect.js';

const router = express.Router();

function getTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });
}

async function sendEmails(quote) {
  const transporter = getTransporter();
  if (!transporter) return;

  // Confirmation to user
  await transporter.sendMail({
    from: `"Influence Digital Ads" <${process.env.GMAIL_USER}>`,
    to: quote.email,
    subject: `We received your quote request — ${quote.targetArea}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#000;padding:24px 32px">
          <h2 style="color:#fff;margin:0;font-size:20px">Influence Digital Ads</h2>
        </div>
        <div style="padding:32px;background:#f8f9ff">
          <p style="color:#0b1c30;font-size:16px">Dear <strong>${quote.name}</strong>,</p>
          <p style="color:#45464d">Thank you for reaching out. We have received your quote request for <strong>${quote.targetArea}</strong> and a member of our strategy team will contact you within <strong>24 hours</strong>.</p>
          <div style="background:#fff;border:1px solid #e5eeff;padding:20px;margin:24px 0;border-radius:4px">
            <p style="margin:0 0 8px;color:#45464d;font-size:13px"><strong>Your Request Summary</strong></p>
            <p style="margin:4px 0;font-size:14px;color:#0b1c30">Service: ${quote.targetArea}</p>
            <p style="margin:4px 0;font-size:14px;color:#0b1c30">Duration: ${quote.duration}</p>
            ${quote.location ? `<p style="margin:4px 0;font-size:14px;color:#0b1c30">Location: ${quote.location}</p>` : ''}
          </div>
          <p style="color:#45464d;font-size:14px">If you have any urgent questions, reply to this email or call us directly.</p>
          <p style="color:#45464d;font-size:14px;margin-top:32px">Best regards,<br><strong>Influence Digital Ads Strategy Team</strong></p>
        </div>
        <div style="padding:16px 32px;background:#000;text-align:center">
          <p style="color:#76777d;font-size:12px;margin:0">© 2024 Influence Digital Ads. All rights reserved.</p>
        </div>
      </div>
    `,
  });

  // Alert to admin
  if (process.env.ADMIN_NOTIFY_EMAIL) {
    await transporter.sendMail({
      from: `"Influence Ads Portal" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_NOTIFY_EMAIL,
      subject: `New Quote Lead — ${quote.name} (${quote.targetArea})`,
      html: `
        <div style="font-family:sans-serif;max-width:600px">
          <h3 style="color:#0051d5">New Quote Request</h3>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            ${[['Name', quote.name], ['Email', quote.email], ['Company', quote.company || '—'],
               ['Telephone', quote.telephone || '—'], ['Location', quote.location || '—'],
               ['Target Area', quote.targetArea], ['Duration', quote.duration]]
              .map(([k, v]) => `<tr><td style="padding:8px;background:#f5f5f5;font-weight:600;width:140px">${k}</td><td style="padding:8px;border-bottom:1px solid #eee">${v}</td></tr>`)
              .join('')}
          </table>
          <p style="margin-top:16px;font-size:13px;color:#666">Log in to the admin panel to view and respond to this lead.</p>
        </div>
      `,
    });
  }
}

// POST /api/quotes  (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, targetArea, duration } = req.body;
    if (!name || !email || !targetArea || !duration)
      return res.status(400).json({ message: 'Name, email, target area and duration are required.' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: 'Please enter a valid email address.' });

    const quote = await Quote.create(req.body);

    // Send emails in background — don't block the response
    sendEmails(quote).catch(err => console.error('[Email Error]', err.message));

    res.status(201).json({ _id: quote._id, message: 'Quote submitted successfully.' });
  } catch (err) {
    console.error('[Quotes POST]', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// GET /api/quotes  (admin)
router.get('/', protect, async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    console.error('[Quotes GET]', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// PUT /api/quotes/:id  (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quote) return res.status(404).json({ message: 'Quote not found.' });
    res.json(quote);
  } catch (err) {
    console.error('[Quotes PUT]', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// DELETE /api/quotes/:id  (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted.' });
  } catch (err) {
    console.error('[Quotes DELETE]', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

export default router;
