import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import './App.css'

import Home from './components/Home'
import Login from './components/Login'

import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
