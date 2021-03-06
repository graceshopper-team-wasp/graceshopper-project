import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPrevOrders} from '../store/prevOrders'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name, email, prevOrders, cart} = props

  return (
    <div>
      <h3>Welcome, {name ? name : email}</h3>
      {prevOrders.length > 0 ? (
        <div>
          <h4>Your previous orders:</h4>
          <ul>
            {prevOrders.map(order => {
              return (
                <div key={order.id}>
                  <h5>{order.updatedAt}</h5>
                  <ul>
                    {order.products.map(product => {
                      return (
                        <div key={product.id}>
                          <h6>{product.flavor}</h6>
                          <img src={product.imgURL} />
                          <p>Quantity: {product.quantity}</p>
                          <p> ${product.price * product.quantity}</p>
                        </div>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
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
