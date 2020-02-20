const { Router } = require('express');

const LogEntry = require('../models/logEntry');

const router = Router();

router.get('/', async (_, res, next) => {
  try {
    const entry = await LogEntry.find();
    res.json(entry);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const entry = await LogEntry.findById(req.params.id);
    res.json(entry);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createEntry = await logEntry.save();
    res.json(createEntry);
  } catch (error) {
    if (error.name === 'ValidationError') res.status(422);
    next(error);
  }
});

router.post('/:id/delete', async (req, res, next) => {
  try {
    const entry = await LogEntry.findById(req.params.id);
    entry.remove();
    res.json(entry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
