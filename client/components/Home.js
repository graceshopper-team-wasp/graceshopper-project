import React from 'react'
import ReactDOM from 'react-dom'
const ReactRotatingText = require('react-rotating-text')
import {Link} from 'react-router-dom'

export const Home = () => {
  return (
    <div id="homePage">
      <div id="background-wrap">
        <div className="bubble x1" />
        <div className="bubble x2" />
        <div className="bubble x3" />
        <div className="bubble x4" />
        <div className="bubble x5" />
        <div className="bubble x6" />
        <div className="bubble x7" />
        <div className="bubble x8" />
        <div className="bubble x9" />
        <div className="bubble x10" />
      </div>
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
