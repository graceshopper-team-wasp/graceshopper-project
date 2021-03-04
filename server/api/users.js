const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
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

//returns user info
router.get('/:id', async (req, res, next) => {})

//returns prevorders
router.get('/:id/previousorders', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    const prevOrders = await user.getPrevOrders()
    res.send(prevOrders)
  } catch (err) {
    next(err)
  }
})

//returns cart
router.get('/:id/cart', async (req, res, next) => {})

//adds product to to cart
router.post('/:id/:productId', async (req, res, next) => {})

//removes product from cart
router.delete('/:id/:productId', async (req, res, next) => {})

//checks out cart
router.put('/:id/checkout', async (req, res, next) => {})
