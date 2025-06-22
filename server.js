const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const noticeRoutes = require('./routes/noticeRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB 연결 성공'))
  .catch(err => console.error('❌ MongoDB 연결 실패:', err));

app.use('/api/notices', noticeRoutes);
app.use('/api/connections', connectionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 서버 실행 중: http://localhost:${PORT}`));
