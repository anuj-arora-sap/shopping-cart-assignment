const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');


module.exports = () => {
  let config = {
    // webpack: getWebpackConfig,
    // publicRuntimeConfig: runtimeConfig,
  };
  config = withCss( withSass());

  return config;
};