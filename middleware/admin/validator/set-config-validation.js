const { body } = require("express-validator");

module.exports = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage('name required'),
  body("description")
    .trim()
    .notEmpty()
    .withMessage('description required'),
  body("email")
    .trim()
    .notEmpty()
    .withMessage('email required'),
  body("contact")
    .trim()
    .notEmpty()
    .withMessage('contact required')
];
