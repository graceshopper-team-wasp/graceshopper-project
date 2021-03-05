import axios from 'axios'
import history from '../history'

//ACTION TYPE

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
// const DELETE_FROM_CART = 'DELETE_FROM_CART'
// const CHECKOUT = 'CHECKOUT'

//INITIAL STATE
const defaultCart = []

//ACTION CREATOR
const gotCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

const _addToCart = product => {
  return {
    type: ADD_TO_CART,
    product
  }
}

export const getCart = () => async dispatch => {
  try {
    const res = await axios.get(`/api/users/cart`)
    dispatch(gotCart(res.data || defaultCart))
  } catch (err) {
    console.error(err)
  }
}

export const addToCart = id => async dispatch => {
  try {
    const res = await axios.post(`/api/users/${id}`)
    console.log(res)
    if (res.data !== 'hello') {
      dispatch(getCart())
    } else {
      const productRes = await axios.get(`/api/products/${id}`)
      dispatch(_addToCart(productRes.data))
    }
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return [...action.cart]
    case ADD_TO_CART:
      let product = action.product
      const productAlreadyInState = state.filter(item => item.id === product.id)
      if (productAlreadyInState.length > 0) {
        product = productAlreadyInState[0]
        product.quantity++
        const newState = state.map(
          item => (item.id === product.id ? product : item)
        )
        return newState
      } else {
        product.quantity = 1
        return [...state, product]
      }
    default:
      return state
  }
}
