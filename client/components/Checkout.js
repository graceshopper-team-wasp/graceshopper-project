import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {checkout} from '../store'
import Alert from 'react-bootstrap/Alert'

// Validation function: accepts current fields values and return error object
// 'True' value means INVALID (missing input)
// eslint-disable-next-line max-params
function validate(
  firstName,
  lastName,
  email,
  streetAddress1,
  city,
  state,
  zipCode
) {
  return {
    firstName: firstName.length === 0,
    lastName: lastName.length === 0,
    email: email.length === 0,
    streetAddress1: streetAddress1.length === 0,
    city: city.length === 0,
    state: state.length === 0,
    zipCode: zipCode.length === 0
  }
}

export class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      streetAddress1: '',
      streetAddress2: '',
      city: '',
      state: '',
      zipCode: '',

      touched: {
        firstName: false,
        lastName: false,
        email: false,
        streetAddress1: false,
        city: false,
        state: false,
        zipCode: false
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleBlur = field => evt => {
    this.setState({
      touched: {...this.state.touched, [field]: true}
    })
  }

  handleSubmit(evt) {
    if (!this.canBeSubmitted()) {
      evt.preventDefault()
      return
    }
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      streetAddress1: '',
      streetAddress2: '',
      city: '',
      state: '',
      zipCode: ''
    })
  }

  canBeSubmitted() {
    const errors = validate(
      this.state.email,
      this.state.password,
      this.state.email,
      this.state.streetAddress1,
      this.state.city,
      this.state.state,
      this.state.zipCode
    )

    const isDisabled = Object.keys(errors).some(x => errors[x])
    return !isDisabled
  }

  // eslint-disable-next-line complexity
  render() {
    const {
      firstName,
      lastName,
      email,
      streetAddress1,
      streetAddress2,
      city,
      state,
      zipCode
    } = this.state

    const errors = validate(
      firstName,
      lastName,
      email,
      streetAddress1,
      city,
      state,
      zipCode
    )
    const isDisabled = !Object.keys(errors).some(x => errors[x])

    const shouldMarkError = field => {
      const hasError = errors[field]
      const shouldShow = this.state.touched[field]
      return hasError ? shouldShow : false
    }

    const {handleSubmit, handleChange} = this
    const cart = this.props.cart

    const user = this.props.user

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
      <div>
        {cart.map(item => (
          <h4 key={item.id}>
            <img src={item.imageURL} />
            {item.flavor}, quantity:{' '}
            {item.product_orders ? item.product_orders.quantity : item.quantity}
          </h4>
        ))}

        <h4>Total Items in Cart: {totalQuantity}</h4>

        <h4>Total Price: ${finalPrice}</h4>

        <form id="checkout-form" onSubmit={handleSubmit}>
          <div className="shipping">
            {' '}
            Shipping Address:
            <label htmlFor="firstName">First Name: </label>
            <input
              className={shouldMarkError('firstName') ? 'error' : ''}
              type="text"
              name="firstName"
              onChange={handleChange}
              value={user.id ? user.firstName : firstName}
              onBlur={this.handleBlur('firstName')}
            />
            <br />
            <label htmlFor="lastName">Last Name: </label>
            <input
              className={shouldMarkError('lastName') ? 'error' : ''}
              type="text"
              name="lastName"
              onChange={handleChange}
              value={user.id ? user.lastName : lastName}
              onBlur={this.handleBlur('lastName')}
            />
            <br />
            <label htmlFor="email">Email: </label>
            <input
              className={shouldMarkError('email') ? 'error' : ''}
              type="text"
              name="email"
              onChange={handleChange}
              value={user.id ? user.email : email}
              onBlur={this.handleBlur('email')}
            />
            <br />
            <label htmlFor="streetAddress1">Address Line 1: </label>
            <input
              className={shouldMarkError('streetAddress1') ? 'error' : ''}
              type="text"
              name="streetAddress1"
              onChange={handleChange}
              value={streetAddress1}
              onBlur={this.handleBlur('streetAddress1')}
            />
            <label htmlFor="streetAddress2">Address Line 2: </label>
            <input
              type="text"
              name="streetAddress2"
              onChange={handleChange}
              value={streetAddress2}
            />
            <label htmlFor="city">City: </label>
            <input
              className={shouldMarkError('city') ? 'error' : ''}
              type="text"
              name="city"
              onChange={handleChange}
              value={city}
              onBlur={this.handleBlur('city')}
            />
            <label htmlFor="state">State: </label>
            <input
              className={shouldMarkError('state') ? 'error' : ''}
              type="text"
              name="state"
              onChange={handleChange}
              value={state}
              onBlur={this.handleBlur('state')}
            />
            <label htmlFor="zipCode">Zip Code: </label>
            <input
              className={shouldMarkError('zipCode') ? 'error' : ''}
              type="text"
              name="zipCode"
              onChange={handleChange}
              value={zipCode}
              onBlur={this.handleBlur('zipCode')}
            />
            <br />
          </div>
          <div className="billing">
            {' '}
            Billing Address:
            <label htmlFor="firstName">First Name: </label>
            <input
              className={shouldMarkError('firstName') ? 'error' : ''}
              type="text"
              name="firstName"
              onChange={handleChange}
              value={user.id ? user.firstName : firstName}
              onBlur={this.handleBlur('firstName')}
            />
            <br />
            <label htmlFor="lastName">Last Name: </label>
            <input
              className={shouldMarkError('lastName') ? 'error' : ''}
              type="text"
              name="lastName"
              onChange={handleChange}
              value={user.id ? user.lastName : lastName}
              onBlur={this.handleBlur('lastName')}
            />
            <br />
            <label htmlFor="email">Email: </label>
            <input
              className={shouldMarkError('email') ? 'error' : ''}
              type="text"
              name="email"
              onChange={handleChange}
              value={user.id ? user.email : email}
              onBlur={this.handleBlur('email')}
            />
            <br />
            <label htmlFor="streetAddress1">Address Line 1: </label>
            <input
              className={shouldMarkError('streetAddress1') ? 'error' : ''}
              type="text"
              name="streetAddress1"
              onChange={handleChange}
              value={streetAddress1}
              onBlur={this.handleBlur('streetAddress1')}
            />
            <label htmlFor="streetAddress2">Address Line 2: </label>
            <input
              type="text"
              name="streetAddress2"
              onChange={handleChange}
              value={streetAddress2}
            />
            <label htmlFor="city">City: </label>
            <input
              className={shouldMarkError('city') ? 'error' : ''}
              type="text"
              name="city"
              onChange={handleChange}
              value={city}
              onBlur={this.handleBlur('city')}
            />
            <label htmlFor="state">State: </label>
            <input
              className={shouldMarkError('state') ? 'error' : ''}
              type="text"
              name="state"
              onChange={handleChange}
              value={state}
              onBlur={this.handleBlur('state')}
            />
            <label htmlFor="zipCode">Zip Code: </label>
            <input
              className={shouldMarkError('zipCode') ? 'error' : ''}
              type="text"
              name="zipCode"
              onChange={handleChange}
              value={zipCode}
              onBlur={this.handleBlur('zipCode')}
            />
          </div>

          <Link to="/confirmation">
            <button
              className="stylizedButton"
              type="submit"
              onClick={() => this.props.checkingOut()}
              disabled={!isDisabled}
            >
              Place your order
            </button>
          </Link>
        </form>
        <Alert variant="secondary">
          Sure you don't want any more
          <Alert.Link href="/products"> seltzer</Alert.Link>?
        </Alert>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  checkingOut: () => dispatch(checkout())
})

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatch)(Checkout)
