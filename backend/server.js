require('dotenv').config();
const mongoose = require('mongoose');
const createApp = require('./app');

const port = process.env.PORT || 5000;

// Database connection
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connected'))
    .catch(err => console.error('DB Connection Error:', err));
} else {
  console.warn('Warning: MONGO_URI not provided. Running without database.');
}

const app = createApp();

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
