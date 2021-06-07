const _ = require("lodash"),
 mongoose = require("mongoose"),
 APIerror = require('./apiError'),
  errors = require('./errorCodes');


/**
 * Numeric characters string: 0-9.
 * @type {string}
 */
const NUMERIC = "0123456789";

/**
 * Utility class define common utility function that used throughout the system.
 *
 * @class Utility
 */
class Utility {
  /**
   * Generate a string of given length of random numeric digits.
   * @param {Number} length - desired output length. Must be > 0;
   * @return {string} generated output string.
   */
  static randomNumeric(length) {
    if (!_.isNumber(length) || length < 1) {
      throw new Error("length should be a non zero number.");
    }

    let random = [];
    for (let i = 0; i < length; i++) {
      random.push(NUMERIC[_.random(0, NUMERIC.length - 1)]);
    }

    return random.join("");
  }

  /**
   * @description Custom schema validation for schema variable array max length.
   *
   * @param {Number} minLength
   */
  static maxArrayLimit(maxLength) {
    return function (val) {
      return Promise.resolve(val.length <= maxLength);
    };
  }

  /**
   * @description Custom schema validation for schema variable array min length.
   *
   * @param {Number} minLength
   */
  static minArrayLimit(minLength) {
    return function (val) {
      return Promise.resolve(val.length >= minLength);
    };
  }

  /**
   * convert array of string ids to array of object ids
   * @params {Array} - array of string ids
   * @return {Array} array of object ids
   */
  static convertStringIdsToObjectIds(ids) {
    return _.map(ids, function (id) {
      return new mongoose.Types.ObjectId(id);
    });
  }

  /**
   * Convert string object id to mongoose object id.
   *
   * @static
   * @param {any} id
   * @returns
   * @memberof Utility
   */
  static convertToObjectId(id) {
    return new mongoose.Types.ObjectId(id);
  }


  /**
   * Generate Pagination Response
   * @param {Array} queryData - Array of Data object {
   * @param {Array} pipelineResults - Array of queried data object
   * @param {Array} totalCount - Array of total document count object {
   * @param {Number} count - total number of document count {
   * }
   * }
   * @param {Number} limit - limit Number
   * @param {Page} page - Page number
   * @returns {Object} response - formated response data
   */
  static generatePaginationResponse(queryData, limit, page, skip = 0) {
    try {
      const result = {};
      skip = parseInt(skip);
      limit = parseInt(limit);
      result.total =
        queryData[0].totalCount && queryData[0].totalCount.length
          ? queryData[0].totalCount[0].count
          : 0;
      result.docs = (queryData[0] && queryData[0].pipelineResults) || {};
      result.limit = limit;
      if (page) {
        result.page = page;
      } else {
        result.hasPrevPage = Boolean(skip) && skip <= result.total;
        result.hasNextPage = result.total > skip + limit;
      }
      result.pages =
        Math.floor(result.total / limit) + (result.total % limit == 0 ? 0 : 1);
      return result;
    } catch (error) {
      throw new APIerror('500', errors.INTERNAL.status);
    }
  }


}

/**
 * @type {Utility}
 */
module.exports = Utility;
