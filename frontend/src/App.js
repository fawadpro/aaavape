import React, { lazy, Suspense, Component } from "react";
import { Switch, Route } from "react-router-dom";
import Loader from "react-loader-spinner";

import "font-awesome/css/font-awesome.min.css";
import "./App.css";

// Routes
const Login = lazy(() => import("./views/Login"));

class App extends Component {
  render() {
    return (
      <Switch>
        <Suspense
          fallback={
            <div className="loader-parent">
              <Loader type="ThreeDots" color="#0f73ee" height="40" width="40" />{" "}
            </div>
          }
        >
          <Route exact path="/" render={(props) => <Login {...props} />} />
        </Suspense>
      </Switch>
    );
  }
}

export default App;
