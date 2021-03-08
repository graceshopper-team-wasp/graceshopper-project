import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Checkout from './Checkout'
import CartSummary from './CartSummary'
import {addToCart, deleteOneFromCart, deleteFromCart} from '../store'

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
                <button
                  className="stylizedButton"
                  onClick={() => deleteOne(item.id)}
                  type="button"
                >
                  -
                </button>
                Qty: {item.quantity}
                <button
                  className="stylizedButton"
                  onClick={() => addOne(item.id)}
                  type="button"
                >
                  +
                </button>
              </p>
              <button
                type="button"
                className="stylizedButton"
                onClick={() => this.props.deleteItem(item)}
              >
                Delete Item
              </button>
            </div>
          ))}
        </div>
        {cart.length > 0 ? (
          <CartSummary cart={cart} />
        ) : (
          <div>
            <h4>No items yet!</h4>
            <Link to="/products">
              <h5>Start shopping</h5>
            </Link>
          </div>
        )}
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
    deleteOne: id => dispatch(deleteOneFromCart(id)),
    deleteItem: item => dispatch(deleteFromCart(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
