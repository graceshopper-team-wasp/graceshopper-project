import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'

import {logout, getCart, getPrevOrders} from '../store'

import {AllUsers} from './AllUsers'

class Navibar extends React.Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getCart()
    }
  }

  render() {
    const {handleClick, isLoggedIn, cart, user} = this.props
    const totalQuantity = cart.reduce((accum, currVal) => {
      return accum + currVal.quantity
    }, 0)

    const totalPrice = []

    cart.forEach(item => {
      const totalPricePerItem = item.price * item.quantity
      totalPrice.push(totalPricePerItem)
    })

    const finalPrice = totalPrice.reduce((accum, currVal) => {
      return accum + currVal
    }, 0)

    //we want the quantity of every item in cart
    //THIS IS A BUG => THIS ONLY WORKS FOR NOT-LOGGED-IN USERS
    //when a user is logged in, we have to access cart.product_orders.quantity, not cart.quantity
    const cartQuantity = cart.reduce((accum, current) => {
      return accum + current.quantity
    }, 0)
    return (
      // <div id="navbar">
      <Navbar className="nav" collapseOnSelect expand="sm">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {/* <Navbar.Text> */}
        <Navbar.Brand href="/" className="text">
          BubblySort
        </Navbar.Brand>
        <Link to="/" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <div id="links">
            <Nav className="mr-auto">
              {isLoggedIn ? (
                <div>
                  {user.isAdmin && <Link to="/users">All Users</Link>}
                  <Link to="/home">My Account</Link>
                  <Link to="/products">Products</Link>
                  <Link to="/cart">
                    <OverlayTrigger
                      trigger={['hover', 'focus']}
                      placement="bottom"
                      overlay={
                        <Popover id="popover-positioned-bottom">
                          <Popover.Title>
                            <img
                              className="cart"
                              src="https://i.imgur.com/XET9X5C.png"
                            />
                            ({cartQuantity})
                          </Popover.Title>
                          <Popover.Content>
                            <div className="cartPopoverView">
                              {cart.map(item => (
                                <div key={item.id} className="cartPopoverItem">
                                  <img
                                    className="popoverImg"
                                    src={item.imageURL}
                                  />
                                  <div>
                                    <p>{item.flavor}</p>
                                    <p>Qty: {item.quantity}</p>
                                  </div>
                                </div>
                              ))}
                              <div>Total Quantity: {totalQuantity}</div>
                              <div>Total Price: ${finalPrice}</div>
                            </div>
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <Button variant="secondary">
                        <img
                          className="cart"
                          src="https://i.imgur.com/XET9X5C.png"
                        />
                        ({cartQuantity})
                      </Button>
                    </OverlayTrigger>
                  </Link>
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
                  <Link to="/cart">
                    {' '}
                    <OverlayTrigger
                      trigger={['hover', 'focus']}
                      placement="bottom"
                      overlay={
                        <Popover id="popover-positioned-bottom">
                          <Popover.Title>
                            <img
                              className="cart"
                              src="https://i.imgur.com/XET9X5C.png"
                            />
                            ({cartQuantity})
                          </Popover.Title>
                          <Popover.Content>
                            <div className="cartPopoverView">
                              {cart.map(item => (
                                <div key={item.id} className="cartPopoverItem">
                                  <img
                                    className="popoverImg"
                                    src={item.imageURL}
                                  />
                                  <div>
                                    <p>{item.flavor}</p>
                                    <p>Qty: {item.quantity}</p>
                                  </div>
                                </div>
                              ))}
                              <div>Total Quantity: {totalQuantity}</div>
                              <div>Total Price: ${finalPrice}</div>
                            </div>
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <Button variant="secondary">
                        <img
                          className="cart"
                          src="https://i.imgur.com/XET9X5C.png"
                        />
                        ({cartQuantity})
                      </Button>
                    </OverlayTrigger>
                  </Link>
                </div>
              )}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick: () => dispatch(logout()),
    getCart: () => dispatch(getCart())
  }
}

export default connect(mapState, mapDispatch)(Navibar)

/**
 * PROP TYPES
 */
Navibar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
