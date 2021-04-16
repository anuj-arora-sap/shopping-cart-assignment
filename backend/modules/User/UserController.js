const bcrypt = require('bcryptjs'),
  util = require('util'),
  _ = require('lodash'),
  errors = require('../../lib/errorCodes'),
  UserModel = require('./models/UserModel'),
  config = require('../../config'),
  accessRoles = config.accessRoles,
  ApiError = require('../../lib/apiError'),
  authToken = require('../../lib/authToken'),
  { findOne, updateOne } = require('./dbHelper');

/**
 *  User Controller use to perform all the User related stuffs in this class only.
 *
 * @class User controller.
 */
class UserController {
  /**
   * creates an user if not exist
   * @param {object} user {
   * @param {string} email - user email
   * @param {string} password - user password
   * @param {string} lastName - user lastName
   * @param {string} firstName - user firstName
   * @param {string} profession - user profession
   * @param {string} employedAt - user work location
   * }
   * @return {object} user details.
   */
  static async createUser({ email, password, firstName, lastName }) {
    const hashPassword = await this.hashPassword(password);
    email = email.toLowerCase();
    const result = await UserModel.create({
      password: hashPassword,
      email: email,
      firstName: firstName,
      lastName: lastName
    });
    return result.toObject();
  }

  /**
   * hashes the given password using bcrypt.
   * @param {*} password - password string
   * @returns hashed password
   */
  static async hashPassword(password) {
    const hashFn = util.promisify(bcrypt.hash);
    return hashFn(password, config.tokenDetails.saltRounds);
  }

  /**
   * check if document for query exists.
   *
   * @param {Model} model - mongoose model.
   * @param {Object} query - model query.
   * @returns {Promise} success promise promise.
   */
  static async checkDocumentExists(query) {
    const doc = await UserModel.findOne(query).exec();
    if (_.isNil(doc)) {
      return false;
    }
    return true;
  }

  /**
   * Comare password with hash using bcrypt.
   * @param {*} password - password
   * @param {*} hash - hashed password
   * @returns compare result promise
   */
  static async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  /**
   * User login handler.
   * @param {String} email - Email for user
   * @param {String} password - Password for user
   * @returns {Object} {
   * @param {String} token   authorizationToken
   * @param {Object} customer customerDetails
   * }
   */
  static async loginHandler({ email, password }) {
    email = email.toLowerCase();
    const customer = await findOne({ email: email }, { email: 1, password: 1, firstName: 1, lastName: 1, noOfOrders: 1 });
    if (_.isNil(customer)) {
      throw new ApiError('Email not found', errors.NOT_FOUND.status);
    } else if (!(await this.comparePassword(password, customer.password)))
      throw new ApiError('Wrong password', errors.NOT_ALLOWED.status);
    else {
      delete customer['password'];
      const token = await authToken.generateToken(customer._id.toString(), accessRoles.user, accessRoles.user);
      return { customer, token };
    }
  }
  /**Update userProfile
   *
   * @param {string} id  _id of user
   * @param {object} data userDetails that have to updated
   */
  static async updateProfile(id, data) {
    const query = { _id: id };
    return await updateOne(query, data);
  }
}
/**
 *  @type {UserController}
 */
module.exports = UserController;
