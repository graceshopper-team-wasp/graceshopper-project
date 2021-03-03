const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  flavor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://ucarecdn.com/8a74b68c-3a61-4338-b294-d4a0b858f0f7/-/preview/'
  }
})

module.exports = Product
