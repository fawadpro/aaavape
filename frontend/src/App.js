/** @format */

import React, { lazy, Suspense, Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import 'font-awesome/css/font-awesome.min.css'
import './App.css'

// Routes
const Login = lazy(() => import('./views/Login'))
const Dashboard = lazy(() => import('./views/Dashboard'))
const SideBar = lazy(() => import('./components/SideBar'))
const Order = lazy(() => import('./views/Order'))

class App extends Component {
  render() {
    return (
      <Switch>
        <Suspense
          fallback={
            <div className="loader-parent">
              <Loader type="ThreeDots" color="#0f73ee" height="40" width="40" />{' '}
            </div>
          }
        >
          <Route exact path="/" render={(props) => <Login {...props} />} />
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          <SideBar>
            <Route exact path="/dashboard" render={(props) => <Dashboard {...props} />} />
            <Route exact path="/active-orders" render={(props) => <Order {...props} />} />
          </SideBar>
        </Suspense>
      </Switch>
    )
  }
}

export default App
