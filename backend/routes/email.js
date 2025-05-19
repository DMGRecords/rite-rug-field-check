const express = require('express');
const nodemailer = require('nodemailer');
const db = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
  const { subdivision_id, email } = req.body;
  const [subdivision] = await db.execute('SELECT * FROM subdivisions WHERE id = ?', [subdivision_id]);
  const [stages] = await db.execute('SELECT * FROM stages WHERE subdivision_id = ?', [subdivision_id]);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  const htmlContent = `
    <h3>${subdivision[0].name}</h3>
    <ul>
      ${stages.map(stage => `<li>${stage.stage_name}: ${stage.stage_date} — ${stage.notes || ''}</li>`).join('')}
    </ul>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Subdivision Report: ${subdivision[0].name}`,
    html: htmlContent,
  });

  res.json({ message: 'Email sent' });
});

module.exports = router;

