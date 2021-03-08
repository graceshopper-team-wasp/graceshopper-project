import axios from 'axios'
import history from '../history'

//ACTION TYPE

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const CHECKOUT = 'CHECKOUT'

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
const _addToCart = product => {
  return {
    type: ADD_TO_CART,
    product
  }
}

const _deleteFromCart = product => {
  return {
    type: DELETE_FROM_CART,
    product
  }
}

const checkedOut = cart => {
  return {
    type: CHECKOUT,
    cart
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
export const deleteFromCart = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/users/${id}`)

    // if logged in...
    if (res.data !== 'no user found') {
      dispatch(getCart())

      // if not logged in...
    } else {
      const productRes = await axios.get(`/api/products/${id}`)
      dispatch(_deleteFromCart(productRes.data))
    }
  } catch (err) {
    console.error(err)
  }
}

export const checkout = id => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${id}`)
    console.log(res)
    dispatch(getCart())
    //   if (res.data !== 'no user found') {
    //     dispatch(getCart())

    //   }
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
      let product = action.product
      //check to see if product is already on state
      const productAlreadyInState = state.filter(item => item.id === product.id)
      //if it is, isolate it and increase quantity property by one
      if (productAlreadyInState.length > 0) {
        product = productAlreadyInState[0]
        product.quantity++
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

    default:
      return state
  }
}
