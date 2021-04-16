const _ = require("lodash");
const asyncback = require("asyncback");
const config = require("../config");

/**
 * Mounts async handler on app for given method at given path.
 * @param {string} method HTTP method
 * @param {string} path route path
 * @param {function} handler handler async function
 * @param {express} app express/router instance
 */
function mount(method, path, handler, meta, app) {
  let apiRoute =  path;
  if (meta && meta.isPublic) {
    apiRoute = "/public" + apiRoute;
  }
  apiRoute = config.prefixApiUrl +apiRoute;
  app[method](apiRoute, asyncback(handler));
}

// supported HTTP methods
const methods = ["get", "put", "post", "delete"];

// add route methods to exports
_.each(methods, method => {
  module.exports[method] = (path, handler, meta = { isPublic: false }) =>
    _.partial(mount, method, path, handler, meta);
});
