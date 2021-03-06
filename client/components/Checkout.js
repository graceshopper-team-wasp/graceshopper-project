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
    this.props.checkout(this.state)
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

    return (
      <form id="checkout-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">Student First Name: </label>
        <input
          type="text"
          name="firstName"
          onChange={handleChange}
          value={firstName}
        />
        <br />
        <label htmlFor="lastName">Student Last Name: </label>
        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          value={lastName}
        />
        <br />
        <label htmlFor="email">Student Email: </label>
        <input type="text" name="email" onChange={handleChange} value={email} />
        <br />
        <label htmlFor="gpa">Student GPA: </label>
        <input type="text" name="gpa" onChange={handleChange} value={gpa} />
        <br />
        <label htmlFor="campusId">Campus ID: </label>
        <input
          type="text"
          name="campusId"
          onChange={handleChange}
          value={campusId}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  checkout: () => dispatch(checkout())
})

export default connect(null, mapDispatch)(Checkout)
