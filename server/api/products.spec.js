const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const productFlavor = 'blueberry'

    beforeEach(() => {
      return User.create({
        flavor: productFlavor,
        price: '2.00',
        description: 'a flavor of seltzer'
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].flavor).to.be.equal(productFlavor)
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
