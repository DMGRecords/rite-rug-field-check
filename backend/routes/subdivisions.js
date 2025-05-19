const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all subdivisions
router.get('/', async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM subdivisions');
  res.json(rows);
});

// Create subdivision
router.post('/', async (req, res) => {
  const { user_id, name, description } = req.body;
  await db.execute('INSERT INTO subdivisions (user_id, name, description) VALUES (?, ?, ?)', [user_id, name, description]);
  res.status(201).json({ message: 'Subdivision created' });
});

// Add stage
router.post('/:id/stages', async (req, res) => {
  const { stage_name, stage_date, notes } = req.body;
  const subdivision_id = req.params.id;
  await db.execute('INSERT INTO stages (subdivision_id, stage_name, stage_date, notes) VALUES (?, ?, ?, ?)', [subdivision_id, stage_name, stage_date, notes]);
  res.status(201).json({ message: 'Stage added' });
});

// Delete subdivision + stages
router.delete('/:id', async (req, res) => {
  await db.execute('DELETE FROM subdivisions WHERE id = ?', [req.params.id]);
  res.json({ message: 'Subdivision deleted' });
});

module.exports = router;

