import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers, deleteUser} from '../store/users'
import {Link} from 'react-router-dom'

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const users = this.props.users
    return (
      <div>
        <h3>Users</h3>
        {users.map(user => (
          <ul key={user.id}>
            <li>
              <h3>{user.email}</h3>
            </li>
          </ul>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers()),
    deleteUser: user => dispatch(deleteUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
