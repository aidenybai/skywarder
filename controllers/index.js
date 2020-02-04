const { Router } = require('express');
const { join } = require('path');
const cmd = require('node-cmd');

const router = Router();

// Autoupdating
router.post('/git', (req, res) => {
  // Check for Github header
  if (req.headers['x-github-event'] === 'push') { 
    cmd.run('chmod 777 git.sh'); // Fix no perms after updating
    cmd.get('./git.sh', (err, data) => {  // Run script
      if (data) console.log(data);
      if (err) console.log(err);
    });
    cmd.run('refresh');  // Refresh project

    console.log('> [GIT] Updated with origin/master');
  }

  return res.sendStatus(200); // Send back OK status
});

// 404 route
router.use((req, { boom }) => {
  boom.notFound();
});

module.exports = router;
