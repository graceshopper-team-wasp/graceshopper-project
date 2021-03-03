const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Product = db.model('product')
const Cart = db.model('cart')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  it('has fields flavor, inventory, price, description', async () => {
    const product = await Product.create({
      flavor: 'raspberry',
      inventory: 9,
      price: 2.0,
      description: 'a test product'
    })
    expect(product.flavor).to.equal('raspberry')
    expect(product.inventory).to.equal(9)
    expect(product.price).to.equal(2.0)
    expect(product.description).to.equal('a test product')
  })

  it('flavor, price, description cannot be null', async () => {
    const product = Product.build({})
    try {
      await product.validate()
      throw Error('flavor, price, description cannot be null')
    } catch (err) {
      expect(err.message).to.contain(
        'notNull Violation: product.flavor cannot be null'
      )
      expect(err.message).to.contain(
        'notNull Violation: product.price cannot be null'
      )
      expect(err.message).to.contain(
        'notNull Violation: product.description cannot be null'
      )
    }
  })
}) // end describe('User model')
