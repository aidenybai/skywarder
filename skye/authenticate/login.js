// Helper function to build querystring
const body = ({ user, pass }) => {
  if (!user || !pass) throw new TypeError('user and pass are required');
  return `requestAction=eel&codeType=tryLogin&login=${user}&password=${pass}`;
};

// Return a double nested function for easier interfacing with the API
module.exports = (axios, skywardURL) => (credentials) => {
  if (!axios || !skywardURL) throw new TypeError('axios & skywardURL are required');

  // Return axios junk from data
  return axios({
    // Login endpoint
    url: '../skyporthttp.w',
    baseURL: skywardURL,
    method: 'post',
    // Format credentials (b/c axios just appends)
    data: body(credentials),
  });
};
