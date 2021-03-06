import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Cart from './Cart'
import {checkout} from '../store'

export class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    // How to prevent form submission with incomplete info??

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      address: ''
    })
  }

  render() {
    const {firstName, lastName, email, address} = this.state
    const {handleSubmit, handleChange} = this
    const cart = this.props.cart

    const totalQuantity = cart.reduce((accum, currVal) => {
      console.log('ACCUM: ', accum)
      console.log('CURR VAL: ', currVal)
      accum.quantity += currVal.quantity
      return accum.quantity
    })

    const totalPrice = cart.reduce((accum, currVal) => {
      console.log('ACCUM: ', accum)
      console.log('CURR VAL: ', currVal)
      accum.price += currVal.price
      return accum.price
    })

    console.log('TOTAL QUANTITY: ', totalQuantity)
    console.log('TOTAL Price: ', totalPrice)
    return (
      <div>
        {cart.map(item => (
          <h4 key={item.id}>
            {item.flavor}, quantity:{' '}
            {item.product_orders ? item.product_orders.quantity : item.quantity}
          </h4>
        ))}

        <h4>Total Items in Cart: {totalQuantity}</h4>
        <h4>Total Price: {totalPrice}</h4>

        <form id="checkout-form" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            value={firstName}
          />
          <br />
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            value={lastName}
          />
          <br />
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={email}
          />
          <br />
          <label htmlFor="address">Address: </label>
          <input
            type="text"
            name="address"
            onChange={handleChange}
            value={address}
          />
          <br />
          <Link to="/confirmation">
            <button type="submit">Place your order</button>
          </Link>
        </form>
      </div>
    )
  }
}

// const mapDispatch = dispatch => ({
//   checkout: () => dispatch(checkout())
// })

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Checkout)
