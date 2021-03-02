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
    defaultValue: ''
  }
})

module.exports = Product
