const route = require('../../../lib/route'),
    validate = require('../../../lib/validate'),
    orderController = require('../orderController'),
    apiResponse = require('../../../lib/apiResponse');

const validateBody = {
    type: 'object',
    properties: {
        subTotal: { type: 'number', format: 'positiveInteger' }
    },
    required: ['subTotal'],
    additionalProperties: false
};

const userOrderHandler = async (req, res) => {
    validate(req.body, validateBody);

    const result = await orderController.registerOrder({ ...req.body, userId: req.userInfo.userId });
    return apiResponse(200, result, 'Successfully updated', true, res);
};

module.exports = route.post('/user/order', userOrderHandler);
