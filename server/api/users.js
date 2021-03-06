const router = require('express').Router()
const {User, Product, Order} = require('../db/models')
const isAdmin = require('../isAdmin')

module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//returns cart
router.get('/cart', async (req, res, next) => {
  try {
    const userId = req.user.id
    const user = await User.findByPk(userId)
    let cart = await user.getCart()
    cart = cart.map(item => {
      item.dataValues.quantity = item.dataValues.product_orders.quantity
      return item
    })
    res.send(cart)
  } catch (err) {
    next(err)
  }
})

//returns prevorders
router.get('/previousorders', async (req, res, next) => {
  try {
    const userId = req.user.id
    const user = await User.findByPk(userId)
    let prevOrders = await user.getPrevOrders()
    //BELOW is adding a quantity property to the object so it matches the
    //syntax of a prev orders that is handled on state

    prevOrders = prevOrders.map(order => {
      order.dataValues.products = order.dataValues.products.map(product => {
        product.dataValues.quantity = product.dataValues.product_orders.quantity
        return product
      })
      return order
    })
    res.send(prevOrders)
  } catch (err) {
    next(err)
  }
})

//adds product to to cart
router.post('/:productId', async (req, res, next) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const user = await User.findByPk(userId)
      await user.addToCart(req.params.productId)
      res.sendStatus(200)
    } else {
      res.send('no user found')
    }
  } catch (err) {
    next(err)
  }
})

//removes product from cart
router.delete('/:productId', async (req, res, next) => {
  try {
    const userId = req.user.id
    const user = await User.findByPk(userId)
    await user.removeFromCart(req.params.productId)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

//checks out cart
router.put('/checkout', async (req, res, next) => {
  try {
    const userId = req.user.id
    const user = await User.findByPk(userId)
    await user.checkout()
    //NOTE FROM NUALA: I UPDATED the user instance method to do this.
    // //user always needs an open order, so we create a new order and assign it to user
    // //(order creating automatically has complete being true)
    // await Order.create({
    //   userId: user.id
    // })
  } catch (err) {
    next(err)
  }
})

//put request to edit user information, should only be accessible
//if user is logged in and matches user on state
router.put('/', async (req, res, next) => {
  try {
    const user = await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      },
      {
        where: {
          id: req.user.id
        },
        returning: true
      }
    )
    res.send(user[1])
  } catch (err) {
    next(err)
  }
})
