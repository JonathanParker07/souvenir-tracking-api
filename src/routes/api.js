const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Search student
router.post('/students/search', async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.body.studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update souvenir status
router.post('/souvenirs/log', async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.body.studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    student.hasCollected = !student.hasCollected;
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get status
router.get('/status/:studentId', async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ hasCollected: student.hasCollected });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
