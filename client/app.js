import React from 'react'
import {Navibar} from './components'
import {Footer} from './components/footer'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navibar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
