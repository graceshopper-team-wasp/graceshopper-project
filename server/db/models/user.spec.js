/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Product = db.model('product')
const Order = db.model('order')
// const Cart = db.model('cart')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  it('has fields firstName, lastName, email, isAdmin, password, salt, googleId', async () => {
    const user = await User.create({
      firstName: 'user',
      lastName: 'lastName',
      email: 'user@user.com',
      password: '123',
      salt: '123',
      googleId: ''
    })
    expect(user.firstName).to.equal('user')
    expect(user.lastName).to.equal('lastName')
    expect(user.email).to.equal('user@user.com')
    expect(user.password('123')).to.equal(user.password('123'))
    expect(user.salt('123')).to.equal(user.salt('123'))
    expect(user.isAdmin).to.equal(false)
    expect(user.googleId).to.equal('')
  })

  it('email and password cannot be null', async () => {
    const user = User.build({})
    try {
      await user.validate()
      throw Error('email, password cannot be null')
    } catch (err) {
      expect(err.message).to.contain(
        'notNull Violation: user.email cannot be null'
      )
      expect(err.message).to.contain(
        'notNull Violation: user.password cannot be null'
      )
    }
  })
  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
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
        const order = await Order.findAll({
          where: {
            userId: cody.id
          }
        })
        console.log('ORDER', order)
      })
      // console.log('CODYS CART: ', codysCart)
      // expect(codysCart.length).to.be.equal(1)
    })
  })
}) // end describe('instanceMethods')
// end describe('User model')
