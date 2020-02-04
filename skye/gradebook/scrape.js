// Helper function to build querystring
const body = ({ encses, sessionId }, course, bucket) => {
  if (!encses || !sessionId) throw new TypeError('encses & sessionId are required');

  return `action=viewGradeInfoDialog&fromHttp=yes&ishttp=true${`&corNumId=${course}&bucket=${bucket}`}${`&sessionid=${sessionId}&encses=${encses}`}`;
};

// Return a double nested function for easier interfacing with the API
module.exports = (axios, skywardURL) => (auth, course, bucket) => {
  if (!axios || !skywardURL) throw new TypeError('axios & skywardURL are required');

  // Return axios junk from data
  return axios({
    // Login endpoint
    url: '../httploader.p?file=sfgradebook001.w',
    baseURL: skywardURL,
    method: 'post',
    // Format credentials (b/c axios just appends)
    data: body(auth, course, bucket),
  });
};
