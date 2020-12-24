import React, { useEffect } from 'react'
import Home from './pages/Home'
import GameDetails from './components/GameDetails'
import Nav from './components/Nav'
import GlobalStyles from './components/GlobalStyle'
import { Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      <GlobalStyles />
      <Nav />
      <Route path={['/game/:id', '/']}>
        <Home />
      </Route>
    </div>
  )
}

export default App
