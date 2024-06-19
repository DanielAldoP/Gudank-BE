const { validationResult } = require("express-validator");
const handleError = require("../../helpers/handle-error");
const sendResponse = require("../../helpers/send-response");
const returnData = require('../../helpers/return-data')

exports.login = async(req, res, next) => {
  let { status, data, error, stack } = returnData();
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) throw(errors.array()[0].msg);

    console.log('admin auth')

    data = "admin auth"
    status = true

  } catch (err) {
    console.log(err, 'err generate va')
    stack = err.message || err.stack || err;
    error = handleError(err)
  } finally {
    sendResponse(res, status, data, error, stack)
  }
}