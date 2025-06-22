// routes/connectionRoutes.js
const express = require('express');
const router = express.Router();
const Connection = require('../models/Connection');

// 📌 전체 연결 정보 불러오기
router.get('/', async (req, res) => {
  try {
    const data = await Connection.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: '연결 정보 불러오기 실패' });
  }
});

// 📌 새로운 연결 정보 추가
router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: '내용이 필요합니다.' });

  try {
    const newConn = new Connection({ text });
    await newConn.save();
    res.status(201).json(newConn);
  } catch (err) {
    res.status(500).json({ error: '연결 저장 실패' });
  }
});

// 📌 연결 삭제
router.delete('/:id', async (req, res) => {
  try {
    await Connection.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: '연결 삭제 실패' });
  }
});

module.exports = router;
