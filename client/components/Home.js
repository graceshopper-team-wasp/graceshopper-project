import React from 'react'
import ReactDOM from 'react-dom'
const ReactRotatingText = require('react-rotating-text')
import {Link} from 'react-router-dom'

export const Home = () => {
  return (
    <div id="homePage">
      <div className="homePageText">
        {/* <p>  */}
        <div id="one">Come shop our </div>

        <div id="two">
          <ReactRotatingText
            items={[
              'fresh',
              'satisfying',
              'tasty',
              'hydrating',
              'refreshing',
              'yummy'
            ]}
          />{' '}
          <Link to="/products">seltzer.</Link>
        </div>
        {/* </p> */}
      </div>
    </div>
  )
}
