const _ = require("lodash");
const errors = require("./errors");
const authToken = require("./authToken");
const mm = require("micromatch");
const asyncback = require("asyncback");
// const userCache = require("./userCache");

// white list url patterns
const AUTH_WHITE_LIST = [];

/**
 * Perform auth toke check, adds user to request on success
 * @param {Request} req request
 * @param {Response} res response
 */
async function authorize(req, res) {
  // skip if request matches white listed patterns
  if (mm.contains(req.path, AUTH_WHITE_LIST)) {
    return;
  }

  // get auth token
  const token = req.get("Authorization") || req.query["authToken"];

  // auth token must be supplied
  if (_.isNil(token) || token.length < 1) {
    throw errors.UNAUTHORIZED("Auth token is required.");
  }

  const userInfo = {name: 'ok'}

  // verify auth signature
  // const decodedToken = await authToken.verifyAuthToken(token);
  // const userInfo = decodedToken["data"];

  // set as request property
  req.userInfo = userInfo;
}

/**
 * Enables auth checking.
 * @param {express} app  express app
 * @param {string[]} [whiteList] array of white listed url patterns (see micromatch npm module)
 */
module.exports = function authCheck(app, whiteList = []) {
  // save white list
  let patterns = _.map(whiteList, _.toString);
  patterns = _.uniq(patterns);
  _.each(patterns, p => AUTH_WHITE_LIST.push(p));

  // add middleware
  app.use(asyncback(authorize));
};
