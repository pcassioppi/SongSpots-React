import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Header from './Header'
import SongList from './SongList'
import CreateSong from './CreateSong'
import Login from './Login'
import SignUp from './SignUp'


const App = () => (
  <div className="center w85">
    <Router>
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={SongList} />
          <Route exact path="/create" component={CreateSong} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />

        </Switch>
      </div>
    </Router>
  </div>
)

export default App