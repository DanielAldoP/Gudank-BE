const { validationResult } = require("express-validator");
const handleError = require("../../helpers/handle-error");
const sendResponse = require("../../helpers/send-response");
const returnData = require('../../helpers/return-data')
const { sequelize, Sequelize } = require('../../models/index')
const { admin_users, roles } = require('../../models')
const bcryptjs = require("bcryptjs");
const salt = bcryptjs.genSaltSync(12);
const jwt = require("jsonwebtoken");
const configJwt = require("../../config/auth-config");

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

exports.signup = async(req, res, next) => {
  let { status, data, error, stack } = returnData();
  const t = await sequelize.transaction()
  
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) throw(errors.array()[0].msg);
    
    let resultData = []

    const [checkName] = await sequelize.query(
      `SELECT *
      FROM admin_users au
      WHERE au.name = :name`, {
        replacements: { name: req.body.name }
      }
    )

    if(checkName) throw new Error('User already exist')
    
    const [checkRole] = await sequelize.query(
      `SELECT *
      FROM roles r
      WHERE r.name = :name`, {
        replacements: { name: 'superadmin' },
        type: sequelize.QueryTypes.SELECT
      }
    )
      
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    if(!checkRole) {
    // Check apakah akun superadmin sudah ada
      const [checkSuperAdmin] = await sequelize.query(
        `SELECT *
        FROM admin_users au
        WHERE au.name = :name`, {
          replacements: { name: 'superadmin' },
          type: sequelize.QueryTypes.SELECT
        }
      )

      // Create roles superadmin dan akunnya
      
      if(!checkSuperAdmin) {
        const createSuperAdminRole = { name: 'superadmin' }
        const createSuperAdmin = await roles.create(createSuperAdminRole, { transaction: t })


        const createSuperAdminUser = {
          role_id: createSuperAdmin.id,
          name: req.body.name,
          password: hashedPassword,
          phone: req.body.phone          
        }

        await admin_users.create(createSuperAdminUser, { transaction: t })

        const payloadData = {
          name: req.body.name,
          phone: req.body.phone
        }
        const token = jwt.sign(payloadData, configJwt.secret);
        if(!token) throw new Error('Create Token Failed')

        resultData = {
          ...payloadData,
          token: token
        }

      }
    } else {
      // check apakah role admin sudah ada

      const [checkAdmin] = await sequelize.query(
        `SELECT *
        FROM roles r
        WHERE r.name = :name`, {
          replacements: { name: 'admin' },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if(!checkAdmin) {
        // Jika admin belum ada maka create role admin
        const createAdminRole = { name: 'admin' }
        const createAdmin = await roles.create(createAdminRole, { transaction: t })

        const createAdminUser = {
          role_id: createAdmin.id,
          name: req.body.name,
          password: hashedPassword,
          phone: req.body.phone          
        }
  
        await admin_users.create(createAdminUser, { transaction: t })
  
        const payloadData = {
          name: req.body.name,
          phone: req.body.phone
        }
        const token = jwt.sign(payloadData, configJwt.secret);
        if(!token) throw new Error('Create Token Failed')
  
        resultData = {
          ...payloadData,
          token: token
        }
      }

      else {
        const createAdminUser = {
          role_id: checkAdmin.id,
          name: req.body.name,
          password: hashedPassword,
          phone: req.body.phone          
        }
  
        await admin_users.create(createAdminUser, { transaction: t })
  
        const payloadData = {
          name: req.body.name,
          phone: req.body.phone
        }
        const token = jwt.sign(payloadData, configJwt.secret);
        if(!token) throw new Error('Create Token Failed')
  
        resultData = {
          ...payloadData,
          token: token
        }
      }
    }

    await t.commit()

    data = resultData
    status = true

  } catch (err) {
    console.log(err, 'err generate va')
    await t.rollback()
    stack = err.message || err.stack || err;
    error = handleError(err)
  } finally {
    sendResponse(res, status, data, error, stack)
  }
}