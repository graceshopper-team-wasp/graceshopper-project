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
  console.log('IN PREVORDER THUNK')
  try {
    console.log('IN TRY BLOCK')
    const res = await axios.get(`/api/users/previousorders`)
    console.log('RES IN PREVORDERS', res)
    if (res.data === 'no user found') {
      dispatch(_gotPrevOrders(defaultOrders))
    } else {
      dispatch(_gotPrevOrders(res.data))
    }
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
