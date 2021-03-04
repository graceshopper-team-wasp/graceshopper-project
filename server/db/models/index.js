const User = require('./user')
const Product = require('./product')
const Order = require('./order')

// ASSOCIATIONS
Order.belongsTo(User)
User.hasMany(Order)
Product.belongsToMany(Order, {through: 'product_orders'})
Order.belongsToMany(Product, {through: 'product_orders'})

// Product.belongsToMany(User, {through: 'cart'})
// User.belongsToMany(Product, {through: 'cart'})

module.exports = {
  User,
  Order,
  Product
}
