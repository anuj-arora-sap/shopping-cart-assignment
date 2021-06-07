const jwt = require("jsonwebtoken"),
  moment = require("moment"),
  util = require("util"),
  config = require("../config"),
  errors = require("./errors");
const tokenDetails = config.tokenDetails;

class AuthtokenController {
  /**
   * Generate and save a new auth token for user.
   * @param {number} userId user id
   * @param {string} modelName model name
   * @param {string} issuer issuer
   * @param {date} expiresIn expiry time
   */
  static async  generateToken(userId, modelName, issuer, expiresIn) {
    const sign = util.promisify(jwt.sign);
    const options = {};
    options["expiresIn"] = tokenDetails.expiresIn;
    options["issuer"] = issuer;
    const createdAt = moment.now();
    const token =  await sign(
      {
        data: {
          userId: userId,
          userType: modelName,
          createdAt: createdAt
        }
        // expiry must be set by options
      },
      tokenDetails.jwtSecret,
      options
    );
    return token;
  }

  /**
   * Refresh the auth token.
   * @param {*} oldAuthToken - old auth token
   * @param {String} issuer - issuer name
   * @param {string} expiresIn - expiresIn value and must be in jwt's expiresIn value format.
   * @returns resolve promise with new authtoken.
   */
  static async  refreshAuthToken(oldAuthToken, issuer, expiresIn) {
    const decodedToken = await verifyAuthToken(oldAuthToken, issuer),
      data = decodedToken.data,
      userId = data.userId,
      modelName = data.userType;
    return await generateToken(userId, modelName, issuer, expiresIn);
  }

  /**
   * @param authToken - user's auth token
   * @param {String} issuer - issuer name
   * @returns decoded token promise
   * @throws INVALID_AUTH error
   */
  static async  verifyAuthToken(authToken, issuer) {
    const verify = util.promisify(jwt.verify),
      authSecret = tokenDetails.jwtSecret;
    try {
      return await verify(authToken, authSecret, { issuer: issuer });
    } catch (e) {
      const detail =
        e.name == "TokenExpiredError"
          ? "Token is expired."
          : "Auth token is invalid.";
      throw errors.UNAUTHORIZED(detail);
    }
  }

  /**
   *  @type {verifyAuthToken}
   */
}

module.exports = AuthtokenController;
