const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: String,
  description: String,
  price: Number,
  duration: String,
});

module.exports = mongoose.model('Course', courseSchema);