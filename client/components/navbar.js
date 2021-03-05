import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {AllUsers} from './AllUsers'

const Navbar = (props, {handleClick, isLoggedIn}) => (
  <div>
    <div className="text text-1">B</div>
    <div className="text text-2">u</div>
    <div className="text text-3">b</div>
    <div className="text text-4">b</div>
    <div className="text text-2">l</div>
    <div className="text text-1">y</div>
    <div className="text text-2">S</div>
    <div className="text text-3">o</div>
    <div className="text text-4">r</div>
    <div className="text text-2">t</div>
    {/* <h1 id="title">BubblySort</h1> */}
    <nav>
      {props.user.isAdmin && <Link to="/users">All Users</Link>}
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/products">Products</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
