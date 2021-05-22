/** @format */

import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, currentUser, roles, ...rest }) => {
  let permission = roles && roles.includes(currentUser)
  return (
    <Route
      {...rest}
      render={(props) =>
        permission ? (
          <Component currentUser={currentUser} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
