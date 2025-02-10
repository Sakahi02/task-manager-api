const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');  // Correct import
const taskRoutes = require('./routes/taskRoutes');  // Correct import
const connectDB = require('./config/db');

connectDB();
// Middleware for parsing JSON data in requests
app.use(express.json());  // Middleware to parse JSON bodies

// Add other global middleware if needed (like logging, CORS, etc.)

// Use the route modules for specific paths
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/tasks', taskRoutes);  // Task routes


const port = process.env.PORT || (process.env.NODE_ENV === 'test' ? 4000 : 5000);  // Default to 4000 for test, 5000 for start

// Start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app; //


