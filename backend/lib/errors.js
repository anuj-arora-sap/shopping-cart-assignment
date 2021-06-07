const _ = require("lodash");
const ApiError = require("./apiError");
const errorCodes = require("./errorCodes");

// Transform error value into error functions
module.exports = _.mapValues(errorCodes, (val, key) => {
  return message => new ApiError(message || val.message, val.status, key);
});
