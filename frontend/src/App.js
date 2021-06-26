/** @format */

import React, { lazy, Suspense, Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

import { SiteRoute } from './utils/siteRoute'
import PrivateRoute from './components/Auth/privateRoute'
import 'font-awesome/css/font-awesome.min.css'
import './App.scss'

// Routes
import Dashboard from './views/Dashboard'
import SideBar from './components/SideBar'
import Order from './views/Order'
import Product from './views/Product'
import ProductForm from './components/Forms/ProductForm'
import PendingOrders from './views/PendingOrders'
import Home from './views/Home'
import MainNav from './components/MainNav'
const Login = lazy(() => import('./views/Login'))

class App extends Component {
  render() {
    const token = Cookies.get('aaavape_user')
    const userDetail = token !== undefined && jwt_decode(token)
    const userRole = userDetail && userDetail.role

    return (
      <Switch>
        <Suspense
          fallback={
            <div className="loader-parent">
              <Loader type="ThreeDots" color="#0f73ee" height="40" width="40" />{' '}
            </div>
          }
        >
          <Route path={SiteRoute.publicRoute} exact>
            <MainNav>
              <Route exact path="/" render={(props) => <Home {...props} />} />
            </MainNav>
          </Route>

          <Route path={[SiteRoute.privateRoute]}>
            <Route exact path="/login" render={(props) => <Login {...props} />} />
            <SideBar>
              <PrivateRoute
                exact
                path="/dashboard"
                currentUser={userRole || null}
                roles={['super_admin']}
                component={Dashboard}
              />

              <PrivateRoute
                exact
                path="/add-product"
                currentUser={userRole || null}
                roles={['super_admin']}
                component={ProductForm}
              />
              <PrivateRoute
                exact
                path="/update-product/:id"
                currentUser={userRole || null}
                roles={['super_admin']}
                component={ProductForm}
              />

              <PrivateRoute
                exact
                path="/pending-orders"
                currentUser={userRole || null}
                roles={['super_admin']}
                component={PendingOrders}
              />
              <Route exact path="/order" render={(props) => <Order {...props} />} />
              <Route exact path="/product" render={(props) => <Product {...props} />} />
            </SideBar>
          </Route>
        </Suspense>
      </Switch>
    )
  }
}

export default App
