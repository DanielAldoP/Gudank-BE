const e = require('../config/error-message')

module.exports = (error) => {
  let fixError = {};

  if(error[0]) {
    if(error[0].type === "field") {
      fixError = {
        type: e.error_validation,
        msg: error[0].msg
      }
      return fixError
    }
  }

  if (error.name) {
    fixError = {
      type: e.error_general,
      msg: error.message
    }
    return fixError;
  }

  if (error) {
    fixError = {
      type: e.error_validation,
      msg: error
    };
    return fixError;
  }

  return fixError ? fixError : error;
}