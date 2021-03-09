import React from 'react'
import {connect} from 'react-redux'

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
      zipCode: ''
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

    // const isEnabled =
    //   firstName.length > 0 &&
    //   lastName.length > 0 &&
    //   email.length > 0 &&
    //   address.length > 0

    const {handleSubmit, handleChange} = this

    return (
      <div className="address-details">
        <form id="shipping" onSubmit={handleSubmit}>
          <div className="shipping">
            {' '}
            <p>Shipping Address: </p>
            <label htmlFor="firstName">
              First Name:
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={firstName}
              />
            </label>
            <br />
            <label htmlFor="lastName">
              Last Name:
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={lastName}
              />
            </label>
            <br />
            <label htmlFor="email">
              Email:
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={email}
              />
            </label>
            <br />
            <label htmlFor="streetAddress1">
              Address Line 1:
              <input
                type="text"
                name="streetAddress1"
                onChange={handleChange}
                value={streetAddress1}
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
                type="text"
                name="city"
                onChange={handleChange}
                value={city}
              />
            </label>
            <br />
            <label htmlFor="state">
              State:
              <input
                type="text"
                name="state"
                onChange={handleChange}
                value={state}
              />
            </label>
            <br />
            <label htmlFor="zipCode">
              Zip Code:
              <input
                type="text"
                name="zipCode"
                onChange={handleChange}
                value={zipCode}
              />
            </label>
            <br />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ShippingForm)
