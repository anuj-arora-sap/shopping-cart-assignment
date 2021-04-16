'use strict'
console.log(`You are in ${process.env.NODE_ENV ? process.env.NODE_ENV : `development`} Environment`);
module.exports = require(`./${process.env.NODE_ENV ? process.env.NODE_ENV : `development`}.js`) || require(`./${process.env.NODE_ENV ? process.env.NODE_ENV : `default`}.js`);