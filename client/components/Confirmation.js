import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const Confirmation = () => {
  // generate a fake order ID if not logged in
  const orderId = Math.floor(Math.random() * Math.floor(10000))

  // pull in order ID generated if user is logged in

  return (
    <div>
      <h3>Thank you for your order! Your order number is {orderId}</h3>
    </div>
  )
}

export default Confirmation
