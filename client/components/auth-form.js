import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, getCart} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const signup = () => {
    if (name === 'signup') return true
    else return false
  }
  return (
    <div>
      <form id="signUp" onSubmit={handleSubmit} name={name}>
        <div>
          {signup() && (
            <div>
              <div>
                <label>
                  <small>First Name</small>
                  <br />
                  <input name="firstName" />
                </label>
              </div>
              <div>
                <label>
                  <small>Last Name</small>
                  <br />
                  <input name="lastName" />
                </label>
              </div>
            </div>
          )}
          <br />
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <br />
          <div>
            <button className="stylizedButton" type="submit">
              {displayName}
            </button>
          </div>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      if (evt.target.name === 'login') {
        evt.preventDefault()
        const formName = evt.target.name
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(auth(email, password, null, null, formName))
      }
      if (evt.target.name === 'signup') {
        console.log('hello')
        evt.preventDefault()
        const formName = evt.target.name
        const email = evt.target.email.value
        const password = evt.target.password.value
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        console.log('firstName', firstName)
        console.log('formName', formName)
        dispatch(auth(email, password, firstName, lastName, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
