const router = require('express').Router()
const {Product} = require('../db/models')

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET /api/products/:id
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

// PUT /api/products/:id
router.put('/:id', async (req, res, next) => {
  const {product} = req.body
  try {
    const productInDb = await Product.findByPk(product.id)
    const updatedProduct = await productInDb.update(product)
    res.send(updatedProduct)
  } catch (error) {
    next(error)
    console.log('error updating student in db')
  }
})

//POST /api/products
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body))
  } catch (error) {
    next(error)
    console.log('error adding product to database')
  }
})

//DELETE /api/products
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.destroy()
    res.send(product)
  } catch (error) {
    next(error)
    console.log('error deleting product from database')
  }
})
module.exports = router
