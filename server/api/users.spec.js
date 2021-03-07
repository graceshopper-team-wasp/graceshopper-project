/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe.only('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        password: 'treats'
      })
    })

    it('GET /api/users is only accessible to admin', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(401)

      expect(res.status).to.be.equal(401)
    })

    it('GET /api/')
  }) // end describe('/api/users')
}) // end describe('User routes')
