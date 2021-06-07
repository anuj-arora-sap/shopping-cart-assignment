const UserModel = require('../User/models/UserModel'),
    orderModel = require('../order/models/orderModel'),
    { generatePaginationResponse } = require('../../lib/utility');

class OrderController {

    /**
     * Register an oder by user
     * @param {Object} bookData 
     */
    static async registerOrder(bookData) {
        const OrderModel = new orderModel(bookData)
        await OrderModel.save();
        await UserModel.updateOne({ _id: bookData.userId }, { $inc: { noOfOrders: 1 } });
        return;
    }

    /**
     *  Get OrderLsiting
     * @param {String} page
     * @param {String} limit 
     */
    static async orderListing({ page, limit }) {
        page = parseInt(page) || 1,
            limit = parseInt(limit) || 10;
        const query = [
            {
                $lookup: {
                    from: 'orders',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'userDetails'
                }

            },
            {
                $unwind: '$userDetails'
            },
            {
                $group: { _id: '$userDetails.userId', firstName: { $first: '$firstName' }, lastName: { $first: '$lastName' }, averageBillValue: { $avg: "$userDetails.subTotal" }, noOfOrders: { $first: '$noOfOrders' } }
            },
            {
                $addFields: {
                    name: {
                        $concat: [
                            { $cond: [{ $eq: ['$firstName', null] }, '', '$firstName'] },
                            ' ',
                            { $cond: [{ $eq: ['$lastName', null] }, '', '$lastName'] }
                        ]
                    }
                }
            },
            {
                $facet: {
                    pipelineResults: [{ $skip: (page - 1) * limit }, { $limit: limit }],
                    totalCount: [{ $count: 'count' }]
                }
            }];
        const data = await UserModel.aggregate(query) //Can also use .find().populate()
        const result = generatePaginationResponse(data, limit, page);
        return result;
    }
}

module.exports = OrderController;