import axios from 'axios'

const SET_USERS = 'SET_USERS'
const DELETE_USER = 'DELETE_USER'

export const setUsers = users => ({
  type: SET_USERS,
  users
})

export const _deleteUser = user => {
  return {
    type: DELETE_USER,
    user
  }
}

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(setUsers(data))
    } catch (error) {
      console.log('Error fetching users from the server')
    }
  }
}

export const deleteUser = user => {
  return async dispatch => {
    try {
      const deleted = await axios.delete(`/api/users/${user.id}`)
      dispatch(_deleteUser(deleted))
    } catch (error) {
      console.log('Error deleting user')
    }
  }
}
const initialState = []

const allUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users
    case DELETE_USER:
      const copyOfState = [...state]
      const stateWithoutDeletedUser = copyOfState.filter(
        user => user.id !== action.user.data.id
      )
      return [...stateWithoutDeletedUser]
    default:
      return state
  }
}

export default allUsersReducer
