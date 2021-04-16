const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const runtimeConfig = require('./.env');


module.exports = () => {
  let config = {
    // webpack: getWebpackConfig,
    publicRuntimeConfig: runtimeConfig,
  };

  config = withCss( withSass());
  config = {
    ...config,
    publicRuntimeConfig: runtimeConfig,

  }
  return config;
};