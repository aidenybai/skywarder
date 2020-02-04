const { connect } = require('mongoose');

// Export factory function
module.exports = (dbURL, options = {}) => {
  // Destructured mongoose method for explicit definition
  connect(
    dbURL,
    options
  )
    .then((db) => {
      console.log(`Connected to ${dbURL}.`);
      return db;
    })
    .catch((err) => {
      // Parse MongoDB error codes
      if (err.message.code === 'ETIMEDOUT') {
        console.log('Attempting to re-establish database connection.');
        connect(dbURL);
      } else {
        console.log('Error while attempting to connect to database:');
        console.log(err);
      }
    });
};
