/**
 * Creates a API Response JSON object.
 * @param [] array of data to be sent in response
 * @param [] array of data to be sent in response
 */
module.exports = (httpCode, data, message, success, res) => {
    res.json({success, httpCode, data, message});
  };
  