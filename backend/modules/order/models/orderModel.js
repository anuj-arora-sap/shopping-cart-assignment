const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const orderSchema = require('./schemas/orderSchema');

orderSchema.plugin(mongoosePaginate);
/**
 * @type {Model}
 */
module.exports = mongoose.model('order', orderSchema);
