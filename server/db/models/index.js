const User = require('./user')
const Cart = require('./cart')
const Product = require('./product')

// ASSOCIATIONS

Product.belongsToMany(User, {through: 'cart'})

module.exports = {
  User,
  Cart,
  Product
}
