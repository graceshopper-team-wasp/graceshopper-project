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
    const cart = await user.getCart()
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
    const prevOrders = await user.getPrevOrders()
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
      res.send('hello')
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
    await Order.create({
      userId: user.id
    })
  } catch (err) {
    next(err)
  }
})
