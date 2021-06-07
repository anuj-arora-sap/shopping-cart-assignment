const _ = require("lodash");
const errors = require("./errors");

/**
 * Check api key for each request.
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns next if valid api key else return INVALID_KEY error
 */
async function apiKeyCheck(req, res, next) {
  // get api_key from header, or query string
  const apiKey = req.get("api_key") || _.get(req.query, "api_key");

  // check key for validity
  const result = validateApiKey(apiKey);

  if (result.valid) {
    // set client type and proceed
    return next();
  }
  // send error
  return next(errors.INVALID_KEY());
}

/**
 * Validate apikey.
 *
 * @param {any} apiKey
 * @returns - true with client type[android,ios,web],false if invalid api key.
 */
function validateApiKey(apiKey) {
  if (!_.isString(apiKey)) {
    return { valid: false };
  }

  const apiKeys = {
    web: process.env.apiKeysWeb
  };

  //check for valid api_key
  const clientType = _.findKey(apiKeys, function(value) {
    return value === apiKey;
  });

  if (_.isString(clientType)) {
    return { valid: true, clientType: clientType };
  }
  return { valid: false };
}

module.exports = apiKeyCheck;
