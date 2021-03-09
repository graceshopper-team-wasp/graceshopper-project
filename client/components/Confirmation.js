import React from 'react'
import {connect} from 'react-redux'
import {getPrevOrders} from '../store/prevOrders'

export class Confirmation extends React.Component {
  componentDidMount() {
    this.props.getPrevOrders()
  }

  render() {
    // generate a fake order ID if not logged in
    const orderId = Math.floor(Math.random() * Math.floor(10000))

    return (
      <div>
        <h3>Thank you for your order! Your order number is {orderId}</h3>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  getPrevOrders: () => dispatch(getPrevOrders())
})

export default connect(null, mapDispatch)(Confirmation)
