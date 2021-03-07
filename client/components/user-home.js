import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name, email, prevOrders, cart} = props

  return (
    <div className="user-home-page">
      <h2>Welcome, {name ? name : email}</h2>
      {prevOrders.length > 0 ? (
        <div className="previous-orders">
          <h4>Your previous orders:</h4>

          {prevOrders.map(order => {
            let date = `${order.updatedAt.slice(5, 7)}/${order.updatedAt.slice(
              8,
              10
            )}/${order.updatedAt.slice(2, 4)}`
            let total = order.products.reduce(
              (accum, current) => accum + current.quantity * current.price,
              0
            )
            return (
              <div key={order.id} className="order-box">
                <div className="stats">
                  <p>{date}</p>
                  <p>Total: ${total}</p>
                </div>
                {order.products.map(product => {
                  return (
                    <div key={product.id}>
                      <img src={product.imageURL} />
                      <p>{product.flavor}</p>
                      <p>Qty: {product.quantity}</p>{' '}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      ) : (
        ''
      )}
      <Link to="/home/edit">Edit Profile</Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.firstName,
    email: state.user.email,
    cart: state.cart,
    prevOrders: state.prevOrders
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
