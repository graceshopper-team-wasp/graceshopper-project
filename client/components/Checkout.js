import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import ShippingForm from '../components/ShippingForm'
import BillingForm from '../components/BillingForm'
import {checkout} from '../store/cart'

export class Checkout extends React.Component {
  render() {
    // const isEnabled =
    //   firstName.length > 0 &&
    //   lastName.length > 0 &&
    //   email.length > 0
    //

    const cart = this.props.cart

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

    return (
      <div className="checkout">
        <div className="cart-summary">
          <h4>Cart Summary:</h4>
          <br />
          {cart.map(item => (
            <div key={item.id}>
              <p>
                <img src={item.imageURL} />
                {item.flavor} ({item.quantity})
              </p>
              <p>${item.price * item.quantity}</p>
            </div>
          ))}
          <p style={{fontWeight: 'bold'}}>Total price: ${finalPrice}</p>
        </div>
        <div className="checkout-address-details">
          <ShippingForm />
          <BillingForm />
        </div>
        <div>
          <Link to="/confirmation">
            <button
              className="stylizedButton"
              type="submit"
              onClick={() => this.props.checkingOut()}
              // disabled={!isEnabled}
            >
              Place your order
            </button>
          </Link>
          <Alert variant="secondary">
            Sure you don't want any more
            <Alert.Link href="/products"> seltzer</Alert.Link>?
          </Alert>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  checkingOut: () => dispatch(checkout())
})

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps, mapDispatch)(Checkout)
