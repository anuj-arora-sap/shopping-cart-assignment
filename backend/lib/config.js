const _ = require('lodash');
const path = require('path');

/**
 * Makes an Object immutable by (deep) freezing all own peoperties.
 * 
 * @param {*} obj - Object to make immutable.
 * @returns {*} The input Object.
 */
function deepFreeze(obj) {
    if (_.isObject(obj) || _.isArray(obj) || _.isFunction(obj)) {
        Object.freeze(obj);
        _.forOwn(obj, deepFreeze);
    }
    return obj;
}

/**
 * Loads config JSON from process directory.
 * @returns {*} Immutable config object.
 */
function loadConfig() {
    try {
        const conf = require(path.join(__dirname, '..', 'config.json'));
        return deepFreeze(conf);
    } catch (err) {
        throw new Error(`Unable to load config.json from app directory: ${err.message || err.toString()}`);
    }
}

// lazy laoded config
let loadedConfig;

/**
 * Gets loaded config or loads if not already loaded.
 * @returns {*} Loaded config object.
 */
function getConfig() {
    // load when required
    if (_.isNil(loadedConfig)) {
        loadedConfig = loadConfig();
    }
    // return loaded
    return loadedConfig;
}

// export as a getter
module.exports = (path) => _.get(getConfig(), path);