import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  render() {
    const cart = this.props.cart
    return (
      <div>
        {cart.map(item => (
          <h4 key={item.id}>
            {item.flavor}, quantity:{' '}
            {item.product_orders ? item.product_orders.quantity : item.quantity}
          </h4>
        ))}
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
