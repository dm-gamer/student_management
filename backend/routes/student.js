const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Student = require('../models/Student');

router.get('/', auth, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/', auth, async (req, res) => {
  const { name, age, grade, department, batch } = req.body;
  try {
    const student = new Student({ name, age, grade, department, batch });
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/:id', auth, async (req, res) => {
  const { name, age, grade, department, batch } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age, grade, department, batch },
      { new: true }
    );
    res.json(student);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Student deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;