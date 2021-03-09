import axios from 'axios'
import history from '../history'

//ACTION TYPE

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_ONE_FROM_CART = 'DELETE_ONE_FROM_CART'
const CHECKOUT = 'CHECKOUT'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

//INITIAL STATE
const defaultCart = []

//ACTION CREATOR
//got a cart from the database if user is logged in
const gotCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

//add to cart manually in state if user is not logged in
export const _addToCart = product => {
  return {
    type: ADD_TO_CART,
    product
  }
}

const _deleteOneFromCart = product => {
  return {
    type: DELETE_ONE_FROM_CART,
    product
  }
}

const checkedOut = () => {
  return {
    type: CHECKOUT
  }
}

const deletedFromCart = product => {
  return {
    type: DELETE_FROM_CART,
    product
  }
}
//THUNK CREATORS

//gets a cart from databse from logged in user, if there is no logged in user
//or logged in user's cart is empty, sets default cart
export const getCart = () => async dispatch => {
  try {
    const res = await axios.get(`/api/users/cart`)
    dispatch(gotCart(res.data === 'no user found' ? defaultCart : res.data))
  } catch (err) {
    console.error(err)
  }
}

//if user is logged in, adds cart to database and then dispatches getCart from databse,
//if user is visitor, manually adds product to cart on state
export const addToCart = id => async dispatch => {
  try {
    const res = await axios.post(`/api/users/${id}`)
    console.log('RES IN ADDTOCART: ', res)
    // if logged in...
    if (res.data !== 'no user found') {
      dispatch(getCart())

      // if not logged in...
    } else {
      const productRes = await axios.get(`/api/products/${id}`)
      dispatch(_addToCart(productRes.data))
    }
  } catch (err) {
    console.error(err)
  }
}

//if user is logged in, adds cart to database and then dispatches getCart from databse,
//if user is visitor, manually adds product to cart on state
export const deleteOneFromCart = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/users/${id}`)

    // if logged in...
    if (res.data !== 'no user found') {
      dispatch(getCart())

      // if not logged in...
    } else {
      const productRes = await axios.get(`/api/products/${id}`)
      dispatch(_deleteOneFromCart(productRes.data))
    }
  } catch (err) {
    console.error(err)
  }
}

export const checkout = () => async dispatch => {
  try {
    const res = await axios.put(`/api/users/checkout`)
    console.log('RES: ', res)
    // if logged in
    if (res.data !== 'no user found') {
      dispatch(getCart())
    } else {
      // if not logged in...
      dispatch(checkedOut())
    }
  } catch (err) {
    console.error(err)
  }
}

export const deleteFromCart = product => async dispatch => {
  try {
    // for logged in users...
    const res = await axios.delete(`/api/users/delete/${product.id}`)
    if (res.data !== 'no user found') {
      dispatch(deletedFromCart(product))
    } else {
      // for logged out users...
      dispatch(deletedFromCart(product))
    }
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return [...action.cart]
    //below case: checks to see if product is already in cart,
    //if it is, increase quantity by one, if not, add a quantity property and set to one
    case ADD_TO_CART:
      console.log('IN ADD TO CART REDUCER')
      let product = action.product
      //check to see if product is already on state
      const productAlreadyInState = state.filter(item => item.id === product.id)
      //if it is, isolate it and increase quantity property by one
      if (productAlreadyInState.length > 0) {
        product = productAlreadyInState[0]
        product.quantity = product.quantity + 1
        //return copy of state with previous product replaced by updated one
        const newState = state.map(
          item => (item.id === product.id ? product : item)
        )
        return newState
      } else {
        product.quantity = 1
        return [...state, product]
      }
    case DELETE_FROM_CART:
      return state.filter(item => item.id !== action.product.id)
    case DELETE_ONE_FROM_CART:
      //we can assume the item is already in the cart because this action is
      //only availble from cart view
      product = state.filter(item => item.id === action.product.id)[0]
      product.quantity--
      //if this puts quantity to 0, remove it completely
      const filteredState = state.filter(item => item.id !== product.id)
      return product.quantity === 0
        ? filteredState
        : [...filteredState, product]
    case CHECKOUT:
      return defaultCart
    default:
      return state
  }
}
