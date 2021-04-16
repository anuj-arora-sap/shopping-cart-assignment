const mongoose = require("mongoose");
const userSchema = require("./schemas/userSchema");

/**
 * @type {Model}
 */
module.exports = mongoose.model("User", userSchema);
