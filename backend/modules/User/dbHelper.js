const userModel = require('./models/UserModel');

class DbHelper {
    /**
 * To find documents which matches the query.
 * @param {object} query
 * @param {object} select 
 * @return promise.
 */
    static async findOne(query, select) {
        return userModel.findOne(query, select || {}).lean().exec();
    };

    /**
     * To update documents which matches the query.
     * @param {object} query
     * @param {object} updateData
     * @param {object} data
     * @return promise.
     */
    static async  updateOne(query, updateData) {
        return userModel.updateOne(query, updateData).exec();
    };
}

module.exports = DbHelper;