const _ = require("lodash");
const mongoose = require("mongoose");

// A practical regex for RFC 2822 email spec. @see http://stackoverflow.com/a/1373724/1531054
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
const PASSWORD_REGEX = new RegExp('^(?=.{8,30})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$');

/**
 * Extra formats for tv4 JSON schema validator.
 * @type {Object}
 */
module.exports = {
  // anything parcelable to a valid Date Object
  date: data => {
    let valid = _.isFinite(data) || _.isString(data) || _.isDate(data);
    valid = valid && new Date(data).toString() !== "Invalid Date";
    return valid ? null : "Should be a date.";
  },

  // string with something to read. i.e not empy or blank
  nonEmptyOrBlank: data => {
    return data.length > 0 && !/^\s+$/.test(data)
      ? null
      : "Should not be empty or blank.";
  },

  // string parcelable to a number
  numberString: data => {
    return !isNaN(data) ? null : "Should be a numeric";
  },

  // true or false string
  booleanString: data => {
    return data === "true" || data === "false"
      ? null
      : "Should be a true/false";
  },

  // email address
  email: data => {
    return REGEX_EMAIL.test(data) ? null : "Should be a valid email";
  },

  //password validations
  password: data => {
    return PASSWORD_REGEX.test(data) ? null : "Choose a stronger password."
  },

  // true or false string
  phoneWithCountryCodeExtention: data => {
    return /^[0-9]{11,15}$/.test(data)
      ? null
      : "Should be Valid phone number with country code extension.";
  },

  countryCodeExtention: function (data) {
    return /^[0-9]{1,3}$/.test(data) ? null : "Should be a country code type.";
  },

  mobileNumber: function (data) {
    return /^[0-9]{10,15}$/.test(data) ? null : "Should be a mobile number.";
  },

  objectId: function (data) {
    return mongoose.Types.ObjectId.isValid(data)
      ? null
      : "Should be an object id.";
  },

  positiveNumeric: function (data) {
    return data >= 0 ? null : "Should be positive number";
  },
  positiveInteger: function (data) {
    return /^[0-9]{1,15}$/.test(data)  ? null : "Should be greater than 0 and non Decimal";
  }
};
