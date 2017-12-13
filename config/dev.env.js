'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
require('dotenv').config()

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FIREBASE_URL: `"${process.env.FIREBASE_URL}"`,
  HOST: `"${process.env.HOST}"`,
  PORT: `"${process.env.PORT}"`,
  SHOW_PORT: true
})
