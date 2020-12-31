import React from 'react'
import Home from './pages/Home'
import GameDetails from './components/GameDetails'
import Nav from './components/Nav'
import GlobalStyles from './styles/GlobalStyle'
import { Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      <GlobalStyles />
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game/:id">
          <GameDetails />
        </Route>
      </Switch>
    </div>
  )
}

export default App
