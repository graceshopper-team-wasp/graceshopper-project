import React from 'react'
import ReactDOM from 'react-dom'
const ReactRotatingText = require('react-rotating-text')
import {Link} from 'react-router-dom'

export const Home = () => {
  return (
    <div>
      <div className="homePageText">
        <p>
          Come shop our{' '}
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
        </p>
      </div>
      {/* <div>
      <p id="homeTitle">come shop our seltzer</p>
      <div id="bubbles">
        <div className="bubble x1" />
        <div className="bubble x2" />
        <div className="bubble x3" />
        <div className="bubble x4" />
        <div className="bubble x5" />
      </div>
    </div> */}
    </div>
  )
}
