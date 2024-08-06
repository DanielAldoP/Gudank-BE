const { validationResult } = require("express-validator");
const handleError = require("../../helpers/handle-error");
const sendResponse = require("../../helpers/send-response");
const returnData = require('../../helpers/return-data')
const { sequelize, Sequelize } = require('../../models/index')
const { config } = require('../../models')
const createKeyValue = require('../../helpers/create-key-value')

exports.createConfig = async(req, res, next) => {
  let { status, data, error, stack } = returnData();
  const t = await sequelize.transaction();
  try {

    const errors = validationResult(req)
    if (!errors.isEmpty()) throw(errors.array()[0].msg);
  
    const { name, description, email, contact } = req.body

    const arrConfig = [
      ['store_name', name],
      ['store_description', description],
      ['store_email', email],
      ['store_contact', contact]
    ]

    const mappedConfig = createKeyValue(arrConfig)

    await config.bulkCreate(mappedConfig, { transaction: t })

    await t.commit();
    status = true

  } catch (err) {
    console.log(err, 'err create config')
    stack = err.message || err.stack || err;
    error = handleError(err)
    await t.rollback();
  } finally {
    sendResponse(res, status, data, error, stack)
  }
}

exports.updateConfig = async(req, res, next) => {
  let { status, data, error, stack } = returnData();
  const t = await sequelize.transaction();
  try {

    if(req.body.name) {
      const whereCondition = { where: { key: 'store_name' } }
      await config.update({ value: req.body.name }, whereCondition, { transaction: t })
    }

    if(req.body.description) {
      const whereCondition = { where: { key: 'store_description' } }
      await config.update({ value: req.body.description }, whereCondition, { transaction: t })
    }

    if(req.body.email) {
      const whereCondition = { where: { key: 'store_email' } }
      await config.update({ value: req.body.email }, whereCondition, { transaction: t })
    }

    if(req.body.contact) {
      const whereCondition = { where: { key: 'store_contact' } }
      await config.update({ value: req.body.contact }, whereCondition, { transaction: t })
    }

    await t.commit();
    status = true

  } catch (err) {
    console.log(err, 'err update config')
    stack = err.message || err.stack || err;
    error = handleError(err)
    await t.rollback();
  } finally {
    sendResponse(res, status, data, error, stack)
  }
}