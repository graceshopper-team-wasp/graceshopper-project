import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Checkout from './Checkout'

class Cart extends React.Component {
  render() {
    console.log('in cart render', this.props)
    const cart = this.props.cart
    return (
      <div>
        {cart.map(item => (
          <h4 key={item.id}>
            {item.flavor}, quantity:{' '}
            {item.product_orders ? item.product_orders.quantity : item.quantity}
          </h4>
        ))}
        <br />
        <Link to="/checkout">
          <button
            type="submit"
            className="checkout"
            // onClick={() => ()}
          >
            Proceed To Checkout
          </button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Cart)
