import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import checkout from '../store/cart'

export class Confirmation extends React.Component {
  // componentDidMount() {
  //     this.props.checkout()
  // }

  render() {
    // generate a fake order ID if not logged in
    const orderId = Math.floor(Math.random() * Math.floor(10000))
    // pull in order ID generated if user is logged in

    return (
      <div>
        <h3>Thank you for your order! Your order number is {orderId}</h3>
      </div>
    )
  }
}

// const mapState = state => {
//     return {
//       cart: state.cart
//     }
//   }

//   const mapDispatch = dispatch => ({
//     checkout: () => dispatch(checkout())
//   })

// export default connect(mapState, mapDispatch)(Confirmation)

export default Confirmation
