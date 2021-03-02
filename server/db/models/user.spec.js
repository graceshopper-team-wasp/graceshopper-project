/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Product = db.model('product')
const Cart = db.model('cart')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody
      let product

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
        product = await product.create({
          flavor: 'banana',
          price: 4.5,
          description: 'ahkjfdhsl'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')

    describe('addToCart', async () => {
      let cody
      let product

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
        product = await Product.create({
          flavor: 'banana',
          price: 4.5,
          description: 'ahkjfdhsl'
        })
      })

      it('creates a new association between the product and user via the cart', async () => {
        await cody.addToCart(product.id, 2)

        const codysCart = await Cart.findAll({
          where: {
            userId: cody.id
          }
        })
        console.log('CODYS CART: ', codysCart)
        expect(codysCart.length.to.be.equal(1))
      })
    })
  }) // end describe('instanceMethods')
}) // end describe('User model')
