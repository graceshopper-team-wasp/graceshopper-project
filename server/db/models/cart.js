const Sequelize = require('sequelize')
const db = require('../db')

// how do I distinguish between past orders? Am I duplicating data potentially?
// ^^^ this is the other design we came up with
const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER
  }, // default value and minimum?
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Cart
