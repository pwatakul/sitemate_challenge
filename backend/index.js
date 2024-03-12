const express = require('express');
const routes = require('./routes');
const cors = require('cors');

// Declare expressjs application
const app = express();
const PORT = process.env.PORT || 3000;

// Config expreesJS to work with JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Add router
app.use('/', routes);


// Start the Express server here
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})