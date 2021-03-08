import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const FILTER_PRODUCTS = 'FILTER_PRODUCTS'

export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

export const _addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const _deleteProduct = product => {
  return {
    type: DELETE_PRODUCT,
    product
  }
}

export const _filterProducts = (products, filter) => {
  console.log('filter', filter)
  return {
    type: FILTER_PRODUCTS,
    products,
    filter
  }
}

// would it be more efficient to filter from the backend?
// can we use query parameters
export const filterProducts = filter => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      console.log('filter', filter)
      dispatch(_filterProducts(data, filter))
    } catch (error) {
      console.log('Error fetching products from the server')
    }
  }
}

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(setProducts(data))
    } catch (error) {
      console.log('Error fetching products from the server')
    }
  }
}

export const addProduct = product => {
  return async dispatch => {
    try {
      const added = (await axios.post('/api/products', product)).data
      dispatch(_addProduct(added))
    } catch (error) {
      console.log('error adding product')
    }
  }
}

export const deleteProduct = product => {
  return async dispatch => {
    try {
      const deleted = await axios.delete(`/api/products/${product.id}`)
      dispatch(_deleteProduct(deleted))
    } catch (error) {
      console.log('Error deleting product')
    }
  }
}
const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    case DELETE_PRODUCT:
      const copyOfState = [...state]
      const stateWithoutDeletedCampus = copyOfState.filter(
        product => product.id !== action.product.data.id
      )
      return [...stateWithoutDeletedCampus]
    case FILTER_PRODUCTS:
      let filteredProducts = action.products.filter(product =>
        product.description.includes(action.filter)
      )
      return [...filteredProducts]
    default:
      return state
  }
}
