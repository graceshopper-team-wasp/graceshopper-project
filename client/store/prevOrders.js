import axios from 'axios'

//ACTION TYPE
const GET_ORDERS = 'GET_ORDERS'

//INITIAL STATE
const defaultOrders = []

//ACTION CREATOR
const _gotPrevOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

//THUNKS

//gets previous orders from logged in user
//(we know user is logged in because this is only rendered
//on a component only visible to logged in user)
export const getPrevOrders = () => async dispatch => {
  try {
    const res = await axios.get(`/api/users/previousorders`)
    dispatch(_gotPrevOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
