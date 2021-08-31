/** @format */

import React, { lazy, Suspense, Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { isMobile } from 'react-device-detect'
import axios from 'axios'
// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import config from './config'

import { userRedirect } from './utils/user_redirect'

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
import EmailSuccess from './views/EmailSuccess'
import ForgotPassword from './DesktopView/DesktopResetPassword'
import NewPassword from './DesktopView/DesktopNewPassword'
import Register from './views/Register'
import OrderHistory from './DesktopView/DesktopOrderHistory'
import ProductVerification from './DesktopView/DesktopProductVerification'
import EditProfile from './DesktopView/DesktopEditProfile'
import AgeVerificationPopup from './DesktopView/AgeVerficationPopup'
const Home = lazy(() => import('./views/Home'))
const DesktopProductDetail = lazy(() => import('./DesktopView/DesktopProductDetail'))

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stripeApiKey: '',
      openAgeModal: true,
      warningTextShow: false,
    }
  }

  componentDidMount() {
    axios
      .get(`${config.apiPath}/api/v1/stripeapi`)
      .then((res) => this.setState({ stripeApiKey: res.data.stripeApiKey }))
  }

  setAgeVerification = (value) => {
    if (value === 'yes') {
      this.setState({ openAgeModal: false })
      Cookies.set('ageVerification', true, {
        expires: 30,
      })
    } else {
      this.setState({ warningTextShow: true })
    }
  }
  render() {
    const { history } = this.props
    const { stripeApiKey, openAgeModal, warningTextShow } = this.state
    const token = Cookies.get('aaavape_user')
    const ageVerification = Cookies.get('ageVerification')
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

    return (
      <>
        {ageVerification === 'true' ? null : openAgeModal ? (
          <AgeVerificationPopup
            callBack={this.setAgeVerification}
            warningTextShow={warningTextShow}
          />
        ) : null}

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
                      path="/product-verification"
                      render={(props) => <ProductVerification {...props} />}
                    />
                    <Route path="/email-success" render={(props) => <EmailSuccess {...props} />} />
                    <Route
                      path="/forgot-password"
                      render={(props) => <ForgotPassword {...props} />}
                    />
                    <Route
                      path="/password/reset/:token"
                      render={(props) => <NewPassword {...props} />}
                    />
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
              {token !== undefined && history.location.pathname === '/login' ? (
                userRedirect(history)
              ) : (
                <Route exact path="/login" render={(props) => <Login {...props} />} />
              )}

              <Route path="/register" render={(props) => <Register {...props} />} />

              <SideBar>
                <PrivateRoute
                  exact
                  path="/dashboard"
                  currentUser={userRole || null}
                  roles={['super_admin', 'customer']}
                  component={Dashboard}
                />

                <PrivateRoute
                  exact
                  path="/edit-profile"
                  currentUser={userRole || null}
                  roles={['customer', 'super_admin']}
                  component={EditProfile}
                />

                <PrivateRoute
                  exact
                  path="/order-history"
                  currentUser={userRole || null}
                  roles={['customer']}
                  component={OrderHistory}
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
      </>
    )
  }
}

export default withRouter(App)
