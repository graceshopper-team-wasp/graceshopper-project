import React from 'react'
import {Link} from 'react-router-dom'

const getTotalPrice = cart => {
  return cart.reduce(
    (accum, current) => accum + current.quantity * current.price,
    0
  )
}

const CartSummary = props => {
  const cart = props.cart

  return (
    <div>
      <div className="cart-summary">
        <h4>Cart Summary:</h4>
        {cart.map(item => (
          <div key={item.id}>
            <p>
              {item.flavor} ({item.quantity})
            </p>
            <p>${item.price * item.quantity}</p>
          </div>
        ))}
        <p>Total price: ${getTotalPrice(cart)}</p>
      </div>
      <Link to="/checkout">
        <button type="submit" className="checkout stylizedButton">
          Proceed to Checkout
        </button>
      </Link>
    </div>
  )
}

export default CartSummary
