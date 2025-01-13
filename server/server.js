require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courses');
const CORS = require('cors')


const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.json());
app.use(CORS({
  origin:"*"
}))
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Routes
app.use('/api/courses', courseRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
