const reportcard = require('./reportcard');
const gradebook = require('./gradebook');
const authenticate = require('./authenticate');
const history = require('./history');

// Class for accessing cookie-cutter methods
class Skye {
  /* 
    Return format:
    { raw: // unparsed html garbage, data: // parsed data }
  */

  constructor(skywardURL) {
    this.skywardURL = skywardURL;
  }
  
  // Retrieves report
  scrapeReport(user, pass) {
    return authenticate(this.skywardURL)(user, pass)
      .then(auth => reportcard.fetch(this.skywardURL)(auth))
      .then(response => ({
        // raw: response.data,
        data: reportcard.getData(response),
      }))
  }
  
  // Retrieves grades
  scrapeGradebook(user, pass, { course, bucket }) {
     return authenticate(this.skywardURL)(user, pass)
      .then(auth => gradebook.fetch(this.skywardURL)(auth)(course, bucket))
      .then(response => ({
        // raw: response.data,
        data: gradebook.getData(response),
      })) 
  }
  
  // Retrieves academic history
  scrapeHistory(user, pass) {
    return authenticate(this.skywardURL)(user, pass)
      .then(history.fetch(this.skywardURL))
      .then(response => ({
        // raw: response.data,
        data: history.getData(response),
      })) 
  }
  
  // Blank login attempt
  login(user, pass) {
    return authenticate(this.skywardURL)(user, pass);
  }
}

module.exports = Skye;
