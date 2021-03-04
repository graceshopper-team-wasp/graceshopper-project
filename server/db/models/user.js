const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Product_Order = require('./product_order')
const Product = require('./product')
const Order = require('./order')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */

//add to cart finds product/user association or creats, and increments quantity by one
User.prototype.addToCart = async function(productId) {
  try {
    const currentOrder = await Order.findOne({
      where: {
        userId: this.id,
        complete: false
      }
    })
    const [orderItem, wasCreated] = await Product_Order.findOrCreate({
      where: {
        orderId: currentOrder.id,
        productId: productId
      }
    })
    if (!wasCreated) {
      orderItem.quantity++
      await orderItem.save()
    }
  } catch (err) {
    console.log(err)
  }
}

//add to cart finds product/user association and decrements quantity by one
User.prototype.removeFromCart = async function(productId) {
  const currentOrder = await Order.findOne({
    where: {
      userId: this.id,
      complete: false
    }
  })

  const orderItem = await Product_Order.findOne({
    where: {
      orderId: currentOrder.id,
      productId: productId
    }
  })

  orderItem.quantity--
  orderItem.quantity === 0 ? await orderItem.destroy() : await orderItem.save()
}

//getCart finds all rows where userid matches and complete status is false, returns array of products and quantities
User.prototype.getCart = async function() {
  const currentOrder = await Order.findOne({
    where: {
      userId: this.id,
      complete: false
    }
  })
  const cart = await Product_Order.findAll({
    where: {
      orderId: currentOrder.id
    }
  })

  return cart
}

//checkout grabs checkout and iterates through changing complete to false
User.prototype.checkout = async function() {
  await Order.update(
    {complete: true},
    {
      where: {
        userId: this.id,
        complete: false
      }
    }
  )
}

//getPrevOrders grabs all cart rows where id matches user id and complete is false, returns array of cart rows
User.prototype.getPrevOrders = async function() {
  const prevOrders = await Order.findAll({
    where: {
      userId: this.id,
      complete: true
    },
    include: {
      model: Product
    }
  })
  return prevOrders
}

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
