const { Router } = require('express');
const { join } = require('path');
const cmd = require('node-cmd');
const crypto = require('crypto');

const router = Router();

// Autoupdating
router.post('/git', (req, res) => {
  let hmac = crypto.createHmac('sha1', process.env.SECRET); // Create SHA1 HMAC from Github webhook secret
  let sig = `sha1=${hmac.update(JSON.stringify(req.body)).digest('hex')}`; // Parse signature from header

  // Check for Github header
  if (req.headers['x-github-event'] === 'push' && sig == req.headers['x-hub-signature']) {
    cmd.run('chmod 777 git.sh'); // Fix no perms after updating
    cmd.get('./git.sh', (err, data) => {
      // Run script
      if (data) console.log(data);
      if (err) console.log(err);
    });
    cmd.run('refresh'); // Refresh project

    let commits = // Descriptive logging
      req.body.head_commit.message.split('\n').length == 1
        ? req.body.head_commit.message
        : req.body.head_commit.message
            .split('\n')
            .map((el, i) => (i !== 0 ? '                       ' + el : el))
            .join('\n');
    console.log(`> [GIT] Updated with origin/master\n` + `        Latest commit: ${commits}`);
  }

  return res.sendStatus(200); // Send back OK status
});

// 404 route
router.use((req, { boom }) => {
  boom.notFound();
});

module.exports = router;
