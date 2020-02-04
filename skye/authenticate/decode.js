module.exports = ({ data } = {}) => {
  // Check for Skyward exceptions
  if (!data) throw new TypeError('data is required');
  if (data === '<li>Invalid login or password.</li>')
    throw new Error('Invalid Skyward credentials');

  // Parse junk data from Skyward auth
  const tokens = data.slice(4, -5).split('^');
  if (tokens.length < 15) throw new Error('Malformed auth data');

  // Return slightly less garbage data in an object
  return {
    dwd: tokens[0],
    wfaacl: tokens[3],
    encses: tokens[14],
    sessionId: `${tokens[1]}%15${tokens[2]}`,
  };
};
