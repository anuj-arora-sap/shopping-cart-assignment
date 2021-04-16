const mongoose = require('mongoose');
const logger = require('./logger');
const config = require('../config');

const dbConfig = config.dbConfig;

module.exports = async function() {
  try {
    await mongoose.connect(
      `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      }
    );
  } catch (err) {
    logger.error(err);
  }
};
