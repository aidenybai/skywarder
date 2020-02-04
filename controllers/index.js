const { Router } = require('express');
const { join } = require('path');

const router = Router();

// 404 route
router.use((req, { boom }) => {
  boom.notFound();
});

module.exports = router;
