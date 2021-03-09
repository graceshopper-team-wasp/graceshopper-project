import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

import {Login, Signup, UserHome, AllProducts} from './components'
import Cart from './components/Cart'
import SingleProduct from './components/SingleProduct'
import AllUsers from './components/AllUsers'
import {Home} from './components/Home'
import Checkout from './components/Checkout'
import PageNotFound from './components/PageNotFound'
import Confirmation from './components/Confirmation'

import EditUser from './components/EditUser'

import {me, getCart, getPrevOrders} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    if (!this.props.persisted) {
      this.props.loadCart()
      this.props.loadPrevOrders()
    }
  }

  render() {
    const {isLoggedIn, user} = this.props
    const isAdmin = user.isAdmin

    // console.log('isAdmin', isAdmin)

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/users" component={AllUsers} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/confirmation" component={Confirmation} />
        <Route path="/" component={PageNotFound} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route path="/home/edit" component={EditUser} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user,
    persisted: state._persist.rehydrated
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadCart() {
      dispatch(getCart())
    },
    loadPrevOrders() {
      dispatch(getPrevOrders())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
