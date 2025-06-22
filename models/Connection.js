const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Connection', connectionSchema);
