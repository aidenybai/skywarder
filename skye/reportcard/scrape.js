// Helper function to build querystring
const body = ({ dwd, wfaacl, encses }) => {
  if (!dwd || !wfaacl || !encses) throw new TypeError('dwd, wfaacl, & encses are required');

  return `dwd=${dwd}&wfaacl=${wfaacl}&encses=${encses}`;
};

// Return a double nested function for easier interfacing with the API
module.exports = (axios, skywardURL) => (auth) => {
  if (!axios || !skywardURL) throw new TypeError('axios & skywardURL are required');

  // Return axios junk from data
  return axios({
    // Login endpoint
    url: '../sfgradebook001.w',
    baseURL: skywardURL,
    method: 'post',
    // Format credentials (b/c axios just appends)
    data: body(auth),
  });
};
