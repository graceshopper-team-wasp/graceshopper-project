const User = require('./user')
const Cart = require('./cart')
const Product = require('./product')

// ASSOCIATIONS
//User.hasOne(Cart)
// Cart.belongsTo(User)
// Cart.hasMany(Product)
Product.belongsToMany(User, {through: 'cart'})
//User.hasMany(Product, {through: 'Cart'})

module.exports = {
  User,
  Cart,
  Product
}
