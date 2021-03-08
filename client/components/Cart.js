import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Checkout from './Checkout'
import {addToCart, deleteFromCart} from '../store'

class Cart extends React.Component {
  render() {
    const {cart, addOne, deleteOne} = this.props
    return (
      <div>
        <h3>Your cart</h3>
        <div className="cart-view">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.imageURL} />
              <p>{item.flavor}</p>
              <p>
                <button onClick={() => deleteOne(item.id)} type="buton">
                  -
                </button>
                Qty: {item.quantity}
                <button onClick={() => addOne(item.id)} type="buton">
                  +
                </button>
              </p>
            </div>
          ))}
        </div>
        <Link to="/checkout">
          <button type="submit" className="checkout stylizedButton">
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

const mapDispatchToProps = dispatch => {
  return {
    addOne: id => dispatch(addToCart(id)),
    deleteOne: id => dispatch(deleteFromCart(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
