const g = require('../../../helpers/global-helper')
const jwt = require("jsonwebtoken");
const configJwt = require("../../../config/auth-config");
const { promisify } = require("util");

module.exports = async(req, res, next) => {
  try {
    
    let token = req.headers.authorization
    if(!token) throw new Error('Unauthorized')
    token = token.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, configJwt.secret);

    req.adminAuth = decoded
    next()

  } catch (error) {
    console.log(error)
    let data = {
      status: false,
      error: error.message,
    };
    return res.status(403).send(data);
  }
}