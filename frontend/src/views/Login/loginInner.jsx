import React from "react";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import { renderFieldWithIcon } from "../../components/ReduxForm";

const LoginInner = () => {
  return (
    <div className="login-inner-container">
      <div className="field-space-between">
        <Field
          name="email"
          type="text"
          component={renderFieldWithIcon}
          label="Email Address"
          icon="fal fa-envelope"
        />
      </div>

      <div className="field-space-between">
        <Field
          name="password"
          type="password"
          component={renderFieldWithIcon}
          label="Password"
          icon="far fa-unlock-alt"
        />
      </div>

      <div className="mb-4">
        <button type="button" className="login-button">
          Log In
        </button>
      </div>

      <div className="login-footer-area">
        <div className="menu-color">Help</div>
        <div className="menu-color">Privacy</div>
        <div className="menu-color">Terms</div>
      </div>
    </div>
  );
};

export default withRouter(
  reduxForm({
    form: "loginForm",
  })(LoginInner)
);
