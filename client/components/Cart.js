import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  render() {
    const cart = this.props.cart
    return (
      <div>
        <h3>Your cart</h3>
        <div className="cart-view">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.imageURL} />
              <p>{item.flavor}</p>
              <p>Qty: {item.quantity}</p>
            </div>
          ))}
        </div>
        <Link to="/checkout">
          <button type="submit" className="checkout">
            Proceed to Checkout
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
