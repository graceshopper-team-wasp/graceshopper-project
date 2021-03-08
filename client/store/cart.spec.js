/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getCart, addToCart, _addToCart} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import cartReducer from './cart'
import history from '../history'
import {getMaxListeners} from '../../server'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {cart: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getCart', () => {
    it('eventually dispatches the GET CART action', async () => {
      const fakeCart = [{flavor: 'cherry', id: 1, quantity: 2}]
      mockAxios.onGet('api/users/cart').replyOnce(200, fakeCart)
      await store.dispatch(getCart())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_CART')
      expect(actions[0].cart).to.be.deep.equal(fakeCart)
    })

    it('sets default state if user is not logged in', async () => {
      mockAxios.onGet('api/users/cart').replyOnce(200, 'OK')
      await store.dispatch(getCart())
      expect(store.getState()).to.be.deep.equal(initialState)
    })
  })

  describe.only('addToCart', () => {
    it('if user is found, it adds item to cart in db and dispatches getCart', async () => {
      const fakeCart = [{flavor: 'cherry', id: 1}]
      mockAxios.onPost('/api/users/1').replyOnce(200, 'OK')
      mockAxios.onGet('/api/users/cart').replyOnce(200, fakeCart)
      await store.dispatch(addToCart(1))
      await store.dispatch(getCart())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_CART')
      expect(actions[0].cart).to.be.deep.equal(fakeCart)
    })

    it('if user does not exist, dispatches ADD_TO_CART action creator', async () => {
      const fakeItem = {flavor: 'cherry', id: 1}
      mockAxios.onPost('/api/users/1').replyOnce(200, 'no user found')
      mockAxios.onGet('/api/products/1').replyOnce(200, fakeItem)
      await store.dispatch(addToCart(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_TO_CART')
      expect(actions[0].product).to.be.deep.equal(fakeItem)
    })

    it('if product already exists on state, it increases quantity by one', async () => {
      let state = [{flavor: 'cherry', id: 1, quantity: 1}]
      const fakeItem = {flavor: 'cherry', id: 1, quantity: 1}
      expect(
        cartReducer(state, {type: 'ADD_TO_CART', product: fakeItem})
      ).to.deep.equal([{flavor: 'cherry', id: 1, quantity: 2}])
    })
  })
})
