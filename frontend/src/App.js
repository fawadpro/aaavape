/** @format */

import React, { lazy, Suspense, Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { isMobile } from 'react-device-detect'
import axios from 'axios'
// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import config from './config'

import { SiteRoute } from './utils/siteRoute'
import AsyncLoader from './components/AsyncLoader'
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
import MainNav from './components/MainNav'
import MobileMainNav from './components/MobileMainNav'
import DesktopCart from './DesktopView/DesktopCart'
import Payment from './components/Payment'
import Login from './views/Login/index'
import Register from './views/Register'
const Home = lazy(() => import('./views/Home'))
const DesktopProductDetail = lazy(() => import('./DesktopView/DesktopProductDetail'))

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stripeApiKey: '',
    }
  }

  componentDidMount() {
    axios
      .get(`${config.apiPath}/api/v1/stripeapi`)
      .then((res) => this.setState({ stripeApiKey: res.data.stripeApiKey }))
  }
  render() {
    const token = Cookies.get('aaavape_user')
    const { stripeApiKey } = this.state
    const userDetail = token !== undefined && jwt_decode(token)
    const userRole = userDetail && userDetail.role

    if (userDetail) {
      axios.interceptors.request.use(
        (config) => {
          config.headers.authorization = `${token}`
          return config
        },

        (error) => {
          return Promise.reject(error)
        }
      )
    }

    console.log('@@ userDetail', stripeApiKey)

    return (
      <Switch>
        <Suspense
          fallback={
            <div className="loader-parent">
              <AsyncLoader />
            </div>
          }
        >
          <Route path={SiteRoute.publicRoute} exact>
            {isMobile ? (
              <MobileMainNav>
                <Route exact path="/" render={(props) => <Home {...props} />} />
              </MobileMainNav>
            ) : (
              <>
                <MainNav>
                  <Route exact path="/" render={(props) => <Home {...props} />} />

                  <Route
                    exact
                    path="/product-detail/:id"
                    render={(props) => <DesktopProductDetail {...props} />}
                  />
                  <Route exact path="/cart" render={(props) => <DesktopCart {...props} />} />
                  {stripeApiKey && (
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Route exact path="/payment" render={(props) => <Payment {...props} />} />
                    </Elements>
                  )}
                </MainNav>
              </>
            )}
          </Route>

          <Route path={[SiteRoute.privateRoute]}>
            <Route exact path="/login" render={(props) => <Login {...props} />} />
            <Route path="/register" render={(props) => <Register {...props} />} />
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
