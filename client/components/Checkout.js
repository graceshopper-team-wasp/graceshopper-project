import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Alert from 'react-bootstrap/Alert'
import {checkout} from '../store/cart'

function validate(
  firstName1,
  lastName1,
  email1,
  streetAddress_1,
  city1,
  state1,
  zipCode1,
  firstName2,
  lastName2,
  email2,
  streetAddress_2,
  city2,
  state2,
  zipCode2
) {
  return {
    firstName1: firstName1.length === 0,
    lastName1: lastName1.length === 0,
    email1: email1.length === 0,
    streetAddress_1: streetAddress_1.length === 0,
    city1: city1.length === 0,
    state1: state1.length === 0,
    zipCode1: zipCode1.length === 0,
    firstName2: firstName2.length === 0,
    lastName2: lastName2.length === 0,
    email2: email2.length === 0,
    streetAddress_2: streetAddress_2.length === 0,
    city2: city2.length === 0,
    state2: state2.length === 0,
    zipCode2: zipCode2.length === 0
  }
}



export class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      firstName1: props.user.firstName || '',
      lastName1: props.user.lastName || '',
      email1: props.user.email || '',
      streetAddress_1: '',
      streetAddress_1_2: '',
      city1: '',
      state1: '',
      zipCode1: '',
      firstName2: props.user.firstName || '',
      lastName2: props.user.lastName || '',
      email2: props.user.email || '',
      streetAddress_2: '',
      streetAddress_2_2: '',
      city2: '',
      state2: '',
      zipCode2: '',

      touched: {
        firstName1: false,
        lastName1: false,
        email1: false,
        streetAddress_1: false,
        city1: false,
        state1: false,
        zipCode1: false,
        firstName2: false,
        lastName2: false,
        email2: false,
        streetAddress_2: false,
        city2: false,
        state2: false,
        zipCode2: false

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
      firstName1: '',
      lastName1: '',
      email1: '',
      streetAddress_1: '',
      streetAddress_1_2: '',
      city1: '',
      state1: '',
      zipCode1: '',
      firstName2: '',
      lastName2: '',
      email2: '',
      streetAddress_2: '',
      streetAddress_2_2: '',
      city2: '',
      state2: '',
      zipCode2: ''
    })
  }

  canBeSubmitted() {
    const errors = validate(

      this.state.email1,
      this.state.password1,
      this.state.email1,
      this.state.streetAddress_1,
      this.state.city1,
      this.state.state1,
      this.state.zipCode1,
      this.state.email2,
      this.state.password2,
      this.state.email2,
      this.state.streetAddress_2,
      this.state.city2,
      this.state.state2,
      this.state.zipCode2

    )

    const isDisabled = Object.keys(errors).some(x => errors[x])
    return !isDisabled
  }


  // eslint-disable-next-line complexity
  render() {
    const {
      firstName1,
      lastName1,
      email1,
      streetAddress_1,
      streetAddress_1_2,
      city1,
      state1,
      zipCode1,
      firstName2,
      lastName2,
      email2,
      streetAddress_2,
      streetAddress_2_2,
      city2,
      state2,
      zipCode2
    } = this.state


    const errors = validate(
      firstName1,
      lastName1,
      email1,
      streetAddress_1,
      city1,
      state1,
      zipCode1,
      firstName2,
      lastName2,
      email2,
      streetAddress_2,
      city2,
      state2,
      zipCode2
    )
    const isDisabled = !Object.keys(errors).some(x => errors[x])


    const shouldMarkError = field => {
      const hasError = errors[field]
      const shouldShow = this.state.touched[field]
      return hasError ? shouldShow : false
    }

    const {handleSubmit, handleChange} = this

    const cart = this.props.cart

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
        <div className="address-details">
          <form id="shipping" onSubmit={handleSubmit}>
            <div className="shipping">
              {' '}
              <p>Shipping Address: </p>
              <label htmlFor="firstName1">
                First Name:
                <input
                  className={shouldMarkError('firstName1') ? 'error' : ''}
                  type="text"
                  name="firstName1"
                  onChange={handleChange}
                  value={firstName1}
                  onBlur={this.handleBlur('firstName1')}
                />
              </label>
              <br />
              <label htmlFor="lastName1">
                Last Name:
                <input
                  className={shouldMarkError('lastName1') ? 'error' : ''}
                  type="text"
                  name="lastName1"
                  onChange={handleChange}
                  value={lastName1}
                  onBlur={this.handleBlur('lastName1')}
                />
              </label>
              <br />
              <label htmlFor="email1">
                Email:
                <input
                  className={shouldMarkError('email1') ? 'error' : ''}
                  type="text"
                  name="email1"
                  onChange={handleChange}
                  value={email1}
                  onBlur={this.handleBlur('email1')}
                />
              </label>
              <br />
              <label htmlFor="streetAddress_1">
                Address Line 1:
                <input
                  className={shouldMarkError('streetAddress_1') ? 'error' : ''}
                  type="text"
                  name="streetAddress_1"
                  onChange={handleChange}
                  value={streetAddress_1}
                  onBlur={this.handleBlur('streetAddress_1')}
                />
              </label>
              <br />
              <label htmlFor="streetAddress_1_2">
                Address Line 2:
                <input
                  type="text"
                  name="streetAddress_1_2"
                  onChange={handleChange}
                  value={streetAddress_1_2}
                />
              </label>
              <br />
              <label htmlFor="city1">
                City:
                <input
                  className={shouldMarkError('city1') ? 'error' : ''}
                  type="text"
                  name="city1"
                  onChange={handleChange}
                  value={city1}
                  onBlur={this.handleBlur('city1')}
                />
              </label>
              <br />
              <label htmlFor="state1">
                State:
                <input
                  className={shouldMarkError('state1') ? 'error' : ''}
                  type="text"
                  name="state1"
                  onChange={handleChange}
                  value={state1}
                  onBlur={this.handleBlur('state1')}
                />
              </label>
              <br />
              <label htmlFor="zipCode1">
                Zip Code:
                <input
                  className={shouldMarkError('zipCode1') ? 'error' : ''}
                  type="text"
                  name="zipCode1"
                  onChange={handleChange}
                  value={zipCode1}
                  onBlur={this.handleBlur('zipCode1')}
                />
              </label>
              <br />
            </div>
          </form>
          <form id="billing" onSubmit={handleSubmit}>
            <div className="billing">
              {' '}
              <p>Billing Address:</p>
              <label htmlFor="firstName2">
                First Name:
                <input
                  className={shouldMarkError('firstName2') ? 'error' : ''}
                  type="text"
                  name="firstName2"
                  onChange={handleChange}
                  value={firstName2}
                  onBlur={this.handleBlur('firstName2')}
                />
              </label>
              <br />
              <label htmlFor="lastName2">
                Last Name:
                <input
                  className={shouldMarkError('lastName2') ? 'error' : ''}
                  type="text"
                  name="lastName2"
                  onChange={handleChange}
                  value={lastName2}
                  onBlur={this.handleBlur('lastName2')}
                />
              </label>
              <br />
              <label htmlFor="email2">
                Email:
                <input
                  className={shouldMarkError('email2') ? 'error' : ''}
                  type="text"
                  name="email2"
                  onChange={handleChange}
                  value={email2}
                  onBlur={this.handleBlur('email2')}
                />
              </label>
              <br />
              <label htmlFor="streetAddress_2">
                Address Line 1:
                <input
                  className={shouldMarkError('streetAddress_2') ? 'error' : ''}
                  type="text"
                  name="streetAddress_2"
                  onChange={handleChange}
                  value={streetAddress_2}
                  onBlur={this.handleBlur('streetAddress_2')}
                />
              </label>
              <br />
              <label htmlFor="streetAddress_2_2">
                Address Line 2:
                <input
                  type="text"
                  name="streetAddress_2_2"
                  onChange={handleChange}
                  value={streetAddress_2_2}
                />
              </label>
              <br />
              <label htmlFor="city2">
                City:
                <input
                  className={shouldMarkError('city2') ? 'error' : ''}
                  type="text"
                  name="city2"
                  onChange={handleChange}
                  value={city2}
                  onBlur={this.handleBlur('city2')}
                />
              </label>
              <br />
              <label htmlFor="state2">
                State:
                <input
                  className={shouldMarkError('state2') ? 'error' : ''}
                  type="text"
                  name="state2"
                  onChange={handleChange}
                  value={state2}
                  onBlur={this.handleBlur('state2')}
                />
              </label>
              <br />
              <label htmlFor="zipCode2">
                Zip Code:
                <input
                  className={shouldMarkError('zipCode2') ? 'error' : ''}
                  type="text"
                  name="zipCode2"
                  onChange={handleChange}
                  value={zipCode2}
                  onBlur={this.handleBlur('zipCode2')}
                />
              </label>
              <br />
            </div>
          </form>
        </div>
        <div>

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
    cart: state.cart,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatch)(Checkout)
