const { validationResult } = require("express-validator");
const handleError = require("../../helpers/handle-error");
const sendResponse = require("../../helpers/send-response");
const returnData = require('../../helpers/return-data')
const { sequelize, Sequelize } = require('../../models/index')
const { config } = require('../../models')
const bcryptjs = require("bcryptjs");
const salt = bcryptjs.genSaltSync(12);
const jwt = require("jsonwebtoken");
const configJwt = require("../../config/auth-config");

exports.logout = async(req, res, next) => {
  let { status, data, error, stack } = returnData();
  try {
  
    const { name, description, email, contact } = req.body
    status = true

  } catch (err) {
    console.log(err, 'err logout')
    stack = err.message || err.stack || err;
    error = handleError(err)
  } finally {
    sendResponse(res, status, data, error, stack)
  }
}