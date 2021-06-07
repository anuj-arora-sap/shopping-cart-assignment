const { Schema } = require('mongoose');

const options = {
  timestamps: true
};

const userSchema = new Schema(
  {
    firstName: { type: String, minlength: 1, required: true },
    lastName: { type: String, minlength: 1, required: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    noOfOrders: { type: Number, default: 0 }
  },
  options //will create updatedAt and createdAt 
);

module.exports = userSchema;
