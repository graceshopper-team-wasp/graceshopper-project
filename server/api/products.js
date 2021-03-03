const router = require('express').Router()
const {Product} = require('../db/models')

// possible bug am i requiring product from the right place

// GET /api/product/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(product)
  } catch (error) {
    next(error)
    console.log('error getting single campus from DB')
  }
})

module.exports = router
