const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'admin', 'views'));

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import admin routes
const adminRoutes = require('./admin/routes');
const authRoutes = require('./routes/auth');
const userProfileRoutes = require('./routes/userProfile');
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userProfileRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SIH 2025 Backend API',
    status: 'Server is running successfully!',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Local URL: http://localhost:${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
