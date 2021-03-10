import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {checkout} from '../store/cart'

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

export class ShippingForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: props.user.firstName || '',
      lastName: props.user.lastName || '',
      email: props.user.email || '',
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
  ///this.state.email written twice
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

    return (
      <div>
        <div className="address-details">
          <form id="shipping" onSubmit={handleSubmit}>
            <div className="shipping">
              {' '}
              <p>Shipping Address: </p>
              <label htmlFor="firstName">
                First Name:
                <input
                  className={shouldMarkError('firstName') ? 'error' : ''}
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={firstName}
                  onBlur={this.handleBlur('firstName')}
                />
              </label>
              <br />
              <label htmlFor="lastName">
                Last Name:
                <input
                  className={shouldMarkError('lastName') ? 'error' : ''}
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={lastName}
                  onBlur={this.handleBlur('lastName')}
                />
              </label>
              <br />
              <label htmlFor="email">
                Email:
                <input
                  className={shouldMarkError('email') ? 'error' : ''}
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={email}
                  onBlur={this.handleBlur('email')}
                />
              </label>
              <br />
              <label htmlFor="streetAddress1">
                Address Line 1:
                <input
                  className={shouldMarkError('streetAddress1') ? 'error' : ''}
                  type="text"
                  name="streetAddress1"
                  onChange={handleChange}
                  value={streetAddress1}
                  onBlur={this.handleBlur('streetAddress1')}
                />
              </label>
              <br />
              <label htmlFor="streetAddress2">
                Address Line 2:
                <input
                  type="text"
                  name="streetAddress2"
                  onChange={handleChange}
                  value={streetAddress2}
                />
              </label>
              <br />
              <label htmlFor="city">
                City:
                <input
                  className={shouldMarkError('city') ? 'error' : ''}
                  type="text"
                  name="city"
                  onChange={handleChange}
                  value={city}
                  onBlur={this.handleBlur('city')}
                />
              </label>
              <br />
              <label htmlFor="state">
                State:
                <input
                  className={shouldMarkError('state') ? 'error' : ''}
                  type="text"
                  name="state"
                  onChange={handleChange}
                  value={state}
                  onBlur={this.handleBlur('state')}
                />
              </label>
              <br />
              <label htmlFor="zipCode">
                Zip Code:
                <input
                  className={shouldMarkError('zipCode') ? 'error' : ''}
                  type="text"
                  name="zipCode"
                  onChange={handleChange}
                  value={zipCode}
                  onBlur={this.handleBlur('zipCode')}
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
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  checkingOut: () => dispatch(checkout())
})

export default connect(mapStateToProps, mapDispatch)(ShippingForm)
