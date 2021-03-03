import axios from 'axios'

// ACTION TYPES
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

// ACTION CREATORS
const setSingleProduct = product => ({
  type: SET_SINGLE_PRODUCT,
  product
})

const _updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

// THUNK CREATORS
export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data: product} = await axios.get(`/api/products/${id}`)
      setTimeout(() => dispatch(setSingleProduct(product)), 500)
    } catch (error) {
      console.log('error fetching single product')
    }
  }
}

export const updateProduct = product => {
  return async dispatch => {
    try {
      const updated = (await axios.put(`/api/products/${product.id}`, {
        product,
        callback: 'updateProduct' // what is callback here?
      })).data
      dispatch(_updateProduct(updated))
    } catch (error) {
      console.log('error updating campus')
    }
  }
}

// INITIAL STATE

const initialState = {
  single: {}
}

// REDUCER
const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return {...state, single: action.product}
    case UPDATE_PRODUCT:
      return {...state, single: action.product}
    default:
      return state
  }
}

export default singleProductReducer
