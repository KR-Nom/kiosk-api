// routes/noticeRoutes.js
const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');

// 📌 전체 공지사항 불러오기
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: '공지사항 불러오기 실패' });
  }
});

// 📌 새 공지사항 등록
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: '제목과 내용이 필요합니다.' });

  try {
    const newNotice = new Notice({ title, content });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (err) {
    res.status(500).json({ error: '공지사항 저장 실패' });
  }
});

// 📌 공지사항 삭제
router.delete('/:id', async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: '공지사항 삭제 실패' });
  }
});

module.exports = router;
