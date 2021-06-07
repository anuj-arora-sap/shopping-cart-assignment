const { Schema } = require('mongoose');

const options = {
    timestamps: true
};

const orderSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        subTotal: { type: Number, default: 0 }
    },
    options
);

module.exports = orderSchema;
