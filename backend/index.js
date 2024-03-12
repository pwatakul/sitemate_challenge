const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

// Declare expressjs application
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Add router
app.use('/', routes);

// Handle Error
app.use(errorHandler);

// Start the Express server here
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})