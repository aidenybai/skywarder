const { Router } = require('express');
const mongoose = require('mongoose');

// Import middleware, models, and library
const skye = require('./../skye/index.js');
const tokenModel = require('./../models/token.js');
const token = require('./../middleware/token.js');
const lock = require('./../middleware/lock.js');
const auth = require('./../middleware/auth.js');

const router = Router();

// Generate token
router.get('/token', auth, async (req, res) => {
  const apiToken = await token();

  skye(req.query.skyward || process.env.SKYWARD_URL)
    // Reparse encoded URL parameters
    .login(decodeURIComponent(req.query.username), decodeURIComponent(req.query.password))
    .then((data) => {
      tokenModel
        .create({ token: apiToken })
        .then(() => res.status(200).json({ code: 200, message: apiToken }))
        .catch(() => req.boom.badImplementation());
    })
    .catch((err) => {
      res.boom.badImplementation(err);
    });
});

// Get report
router.get('/report', auth, (req, res) => {
  skye(req.query.skyward || process.env.SKYWARD_URL)
    // Reparse encoded URL parameters
    .scrapeReport(decodeURIComponent(req.query.username), decodeURIComponent(req.query.password))
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.boom.badImplementation(err);
    });
});

// Get gradebook data based off of course and bucket data
router.get('/gradebook', auth, (req, res) => {
  skye(req.query.skyward || process.env.SKYWARD_URL)
    // Reparse encoded URL parameters
    .scrapeGradebook(
      decodeURIComponent(req.query.username),
      decodeURIComponent(req.query.password),
      { course: decodeURIComponent(req.query.course), bucket: decodeURIComponent(req.query.bucket) }
    )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.boom.badImplementation(err);
    });
});

// Get academic history
router.get('/history', auth, (req, res) => {
  skye(req.query.skyward || process.env.SKYWARD_URL)
    // Reparse encoded URL parameters
    .scrapeHistory(decodeURIComponent(req.query.username), decodeURIComponent(req.query.password))
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.boom.badImplementation(err);
    });
});

// Lock attack
router.get('/lock', auth, (req, res) => {
  lock(decodeURIComponent(req.query.username), decodeURIComponent(req.query.requests), req.query.skyward)
    .then((result) => {
      res.status(200).json({ code: 200, message: result });
    })
    .catch((err) => {
      res.boom.badImplementation(err);
    });
});

router.get('/login', auth, (req, res) => {
  skye(req.query.skyward || process.env.SKYWARD_URL)
    // Reparse encoded URL parameters
    .login(decodeURIComponent(req.query.username), decodeURIComponent(req.query.password))
    .then((data) => {
      res.status(200).json({ code: 200, message: true });
    })
    .catch((err) => {
      res.status(200).json({ code: 200, message: false });
    });
});


module.exports = router;
