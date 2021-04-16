const route = require('../../../lib/route'),
    validate = require('../../../lib/validate'),
    orderController = require('../orderController'),
    apiResponse = require('../../../lib/apiResponse');

const validateQuery = {
    type: 'object',
    properties: {
        page: { type: 'string', format: 'positiveInteger' },
        limit: { type: 'string', format: 'positiveInteger' }
    },
    required: [],
    additionalProperties: false
};

const userOrderHandler = async (req, res) => {
    validate(req.query, validateQuery);

    const result = await orderController.orderListing(req.query);
    return apiResponse(200, [result], '', true, res);
};

module.exports = route.get('/user/order', userOrderHandler);
