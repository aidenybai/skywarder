require('dotenv').config();

const express = require('express');
const { join } = require('path');

// MongoDB connection function
const connect = require('./connection.js');

// Import routes
const v1Routes = require('./../controllers/v1.js');
const rootRoutes = require('./../controllers/index.js');

const app = express();

// Import middleware

// Good to enable behind a reverse proxy
app.set('trust proxy', 1);

// Express error messages
app.use(require('express-boom')());

// Enables Cross-Origin Resource Sharing
app.use(require('cors')());

// G-Zip codec static resources sent to user
app.use(require('compression')());

// Prevents malicious headers, XSS, and clickjacking
app.use(require('helmet')());

// POST request support (encoding)
app.use(require('body-parser').urlencoded({ extended: true }));

// POST request support (read as application/json)
app.use(require('body-parser').json());

// Comprehensive HTTP logger
app.use(require('morgan')('combined'));

// Support for different ways of passing tokens
app.use(require('express-bearer-token')());

// Setup ratelimiting on v1 with 50req/10s
app.use(
  '/v1',
  require('express-rate-limit')({
    windowMs: 10000,
    max: 50,
    headers: true,
    handler: (_req, res) => {
      res.boom.tooManyRequests();
    },
  })
);

// Custom ratelimit on token 1req/12h
app.use(
  '/v1/token',
  require('express-rate-limit')({
    windowMs: 43200000,
    max: 1,
    headers: true,
    handler: (_req, res) => {
      res.boom.tooManyRequests();
    },
  })
);

// Connect to MongoDB
const db = connect(process.env.DB_URL, {
  useNewUrlParser: true, // Updated URL parser for mongoose, might as well use it
  useUnifiedTopology: true, // Use server discover and monitoring engine for MongoClient
});

// Register routes
app.use('/v1', v1Routes);
app.use(rootRoutes);

// Note: env PORT is explicitly defined by Glitch (default: 3000)
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
